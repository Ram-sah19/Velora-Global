#!/usr/bin/env node
/**
 * Keeps the JSON-LD block baked into public/index.html identical to the graph
 * the edge injects for the homepage.
 *
 * Cloudflare Pages always runs functions/_middleware.js, but build/index.html is
 * also served by `npx serve -s build` and any host that skips the functions
 * bundle. The static block is the fallback there, so it must never disagree with
 * the edge version.
 *
 *   node scripts/sync-embedded-graph.mjs          # rewrite index.html
 *   node scripts/sync-embedded-graph.mjs --check  # exit 1 when out of sync
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { ROUTE_SEO, applyRouteSeoToHtml } from "../functions/_shared/routeSeo.js";
import { buildRouteGraph } from "../functions/_shared/entity.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const target = join(root, "public", "index.html");

const BLOCK = /<script[^>]*\btype=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/;
const JSON_LD = /<script[^>]*\btype=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/;

const graph = buildRouteGraph(ROUTE_SEO["/"]);
const body = JSON.stringify(graph, null, 2)
  .split("\n")
  .map((line, index) => (index === 0 ? line : `    ${line}`))
  .join("\n");
const block = `<script type="application/ld+json">\n    ${body}\n  </script>`;

const html = readFileSync(target, "utf8");
const updated = html.replace(BLOCK, () => block);

if (!BLOCK.test(html)) {
  console.error("public/index.html has no JSON-LD block to sync.");
  process.exit(1);
}

// The edge must produce the same object from the same route, or the two copies
// of the homepage graph will drift apart silently.
const served = applyRouteSeoToHtml(block, ROUTE_SEO["/"]);
const servedGraph = JSON.parse(served.match(JSON_LD)[1].replace(/\\u003c/g, "<"));
if (JSON.stringify(servedGraph) !== JSON.stringify(graph)) {
  console.error("Edge graph does not round-trip through applyRouteSeoToHtml.");
  process.exit(1);
}

if (process.argv.includes("--check")) {
  const embedded = JSON.parse(html.match(JSON_LD)[1].replace(/\\u003c/g, "<"));
  if (JSON.stringify(embedded) === JSON.stringify(graph)) {
    console.log("index.html JSON-LD matches the edge homepage graph.");
    process.exit(0);
  }
  console.error("index.html JSON-LD is stale. Run: node scripts/sync-embedded-graph.mjs");
  process.exit(1);
}

if (updated === html) {
  console.log("index.html JSON-LD already current.");
} else {
  writeFileSync(target, updated, "utf8");
  console.log("Rewrote the JSON-LD block in public/index.html.");
}

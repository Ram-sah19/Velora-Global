/**
 * Cloudflare Pages Middleware for AI Agents & Emerging Standards
 * Implements:
 * 1. Markdown Content Negotiation (Accept: text/markdown)
 * 2. RFC 8288 Link Header Injection
 * 3. CORS & Accurate MIME types for Agent Discovery Specs
 * 4. Route-specific SEO metadata and JSON-LD graph rewriting in served HTML
 */

import { getRouteSeo, applyRouteSeoToHtml } from "./_shared/routeSeo.js";
import { routeMarkdown } from "./_shared/markdown.js";

/**
 * Only documents that the site actually serves are advertised. The mcp-server-card,
 * auth.md, oauth, oidc, jwks and acp entries removed from this header pointed at
 * endpoints no backend implements.
 */
const LINK_HEADER =
  '</.well-known/api-catalog>; rel="api-catalog", ' +
  '</.well-known/ai-catalog.json>; rel="ai-catalog", ' +
  '</.well-known/agent-skills/index.json>; rel="agent-skills", ' +
  '</openapi.json>; rel="service-desc"; type="application/openapi+json", ' +
  '</sitemap.xml>; rel="alternate"; type="application/xml"';

/**
 * A real 404 document. public/_redirects rewrites every unknown path onto the
 * SPA index, which answers 200 + homepage content: a soft 404 that search
 * engines can index as a duplicate of the homepage.
 */
const NOT_FOUND_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, follow" />
    <title>Page Not Found | Velora Global</title>
    <link rel="canonical" href="https://velora-global.online/" />
    <style>
      body { margin: 0; padding: 4rem 1.5rem; background: #f8fafc; color: #0b0f19; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      main { max-width: 640px; margin: 0 auto; text-align: center; }
      h1 { font-family: 'Outfit', sans-serif; font-size: 2rem; margin: 0 0 0.75rem; }
      p { font-size: 1rem; line-height: 1.65; color: #475569; margin: 0 0 2rem; }
      nav { display: flex; flex-wrap: wrap; gap: 0.6rem; justify-content: center; }
      a { display: inline-flex; padding: 0.6rem 1.25rem; border-radius: 9999px; background: #ffffff; border: 1px solid #e2e8f0; color: #0b0f19; font-size: 0.88rem; font-weight: 700; text-decoration: none; }
      a:first-child { background: #2563eb; border-color: #2563eb; color: #ffffff; }
    </style>
  </head>
  <body>
    <main>
      <h1>We could not find that page</h1>
      <p>The address you requested does not correspond to a Velora Global page. Here is where the site actually goes:</p>
      <nav aria-label="Site pages">
        <a href="/">Home</a>
        <a href="/services">Services</a>
        <a href="/internships">Internships</a>
        <a href="/training">Training</a>
        <a href="/about">About</a>
        <a href="/team">Team</a>
      </nav>
    </main>
  </body>
</html>
`;

// Two ways a request can be answered by the SPA fallback instead of a real page:
//  - an extension-less path that no route renders (/blog/post-1), and
//  - a path with an asset extension that is nevertheless served as HTML, which means
//    the file is absent and /* handed back index.html (/missing.png => 200 + HTML).
function isMissingDocument(pathname, contentType) {
  if (pathname.startsWith("/.well-known")) return false;
  const segments = pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1] || "";
  const dot = last.lastIndexOf(".");
  if (dot === -1) {
    return pathname !== "/" && getRouteSeo(pathname) === null;
  }
  const extension = last.slice(dot + 1).toLowerCase();
  return extension !== "html" && contentType.includes("text/html");
}

// The Render service that actually answers /api/health, /api/programs and
// /api/certificates/verify/{id}. Override with a VG_API_ORIGIN Pages env var.
const DEFAULT_API_ORIGIN = "https://velora-global.onrender.com";

async function proxyToApi(request, url, apiOrigin) {
  const method = request.method.toUpperCase();
  const headers = new Headers(request.headers);
  // Host belongs to the upstream. Keep the browser's Origin so the backend's CORS
  // check still sees the site, and drop accept-encoding so the body arrives plain —
  // Workers decode transparently, which would otherwise leave a stale header behind.
  headers.delete("host");
  headers.delete("accept-encoding");

  const upstream = await fetch(`${apiOrigin}${url.pathname}${url.search}`, {
    method,
    headers,
    body: method === "GET" || method === "HEAD" ? undefined : request.body,
    // Required when the body is a stream; ignored by the Workers runtime, but it is
    // what lets this proxy run under Node for testing.
    duplex: "half",
    redirect: "follow"
  });

  const responseHeaders = new Headers(upstream.headers);
  responseHeaders.delete("content-encoding");
  responseHeaders.delete("content-length");
  responseHeaders.delete("transfer-encoding");
  // Same-origin from the browser's point of view, so no CORS surface is advertised.
  responseHeaders.delete("access-control-allow-origin");

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders
  });
}

export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);
  const accept = request.headers.get("accept") || "";

  // 0. Same-origin API proxy.
  // public/_redirects used to rewrite /api/* onto the Render backend, but Cloudflare
  // Pages only accepts an external destination on 30x rules — a 200 rewrite to another
  // origin is ignored, so /api/* fell through to the SPA and answered homepage HTML with
  // status 200. auth.md, openapi.json and the agent skills all advertise /api/*.
  if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
    const method = request.method.toUpperCase();
    if (!["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"].includes(method)) {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", Allow: "GET, POST, PUT, PATCH, DELETE, HEAD" }
      });
    }
    const apiOrigin = context.env && context.env.VG_API_ORIGIN ? context.env.VG_API_ORIGIN : DEFAULT_API_ORIGIN;
    try {
      return await proxyToApi(request, url, apiOrigin);
    } catch (e) {
      console.error("API proxy failed for", request.method, url.pathname, e && e.message);
      return new Response(JSON.stringify({ error: "Upstream API unavailable" }), {
        status: 502,
        headers: { "Content-Type": "application/json" }
      });
    }
  }

  // 1. Markdown Content Negotiation for AI Agents: each real page answers with
  // its own summary and published questions, not one shared site blurb.
  if (
    (accept.includes("text/markdown") || accept.includes("text/x-markdown")) &&
    !url.pathname.includes(".well-known") &&
    !url.pathname.endsWith(".json") &&
    !url.pathname.endsWith(".xml") &&
    !url.pathname.endsWith(".jpg") &&
    !url.pathname.endsWith(".png") &&
    !url.pathname.endsWith(".svg")
  ) {
    const seo = getRouteSeo(url.pathname);
    if (seo && !seo.robots) {
      return new Response(routeMarkdown(seo), {
        status: 200,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
          "Access-Control-Allow-Origin": "*",
          Link: LINK_HEADER
        }
      });
    }
  }

  // 2. Fetch standard asset/response
  const response = await context.next();
  const newHeaders = new Headers(response.headers);

  // Advertise the agent documents on every HTML page.
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("text/html")) {
    newHeaders.set("Link", LINK_HEADER);
  }

  // Ensure CORS for .well-known and JSON specs
  if (url.pathname.includes(".well-known") || url.pathname.endsWith(".json") || url.pathname.endsWith(".md")) {
    newHeaders.set("Access-Control-Allow-Origin", "*");
  }

  // 3. Route-specific SEO: rewrite the shared SPA index.html <head> so the
  // served HTML (crawlers, social scrapers) matches the requested route.
  if (contentType.includes("text/html") && response.status === 200) {
    const seo = getRouteSeo(url.pathname);
    if (!seo && isMissingDocument(url.pathname, contentType)) {
      newHeaders.set("Content-Type", "text/html; charset=utf-8");
      newHeaders.set("X-Robots-Tag", "noindex, follow");
      newHeaders.delete("Content-Length");
      return new Response(NOT_FOUND_HTML, {
        status: 404,
        statusText: "Not Found",
        headers: newHeaders
      });
    }
    if (seo) {
      const html = await response.text();
      const rewritten = applyRouteSeoToHtml(html, seo);
      newHeaders.set("Content-Type", "text/html; charset=utf-8");
      if (seo.robots) newHeaders.set("X-Robots-Tag", seo.robots);
      newHeaders.delete("Content-Length");
      return new Response(rewritten, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
      });
    }
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}

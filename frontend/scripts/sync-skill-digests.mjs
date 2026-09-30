#!/usr/bin/env node
/**
 * Rewrites the sha256 digests in .well-known/agent-skills/index.json from the
 * SKILL.md files on disk, and fails in --check mode when they drift.
 *
 * A published digest that does not match the document it points at is a broken
 * integrity claim, so it is generated rather than hand-written.
 *
 * Usage: node scripts/sync-skill-digests.mjs [--check]
 */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';

const SKILLS_DIR = new URL('../public/.well-known/agent-skills/', import.meta.url);
const INDEX_PATH = new URL('index.json', SKILLS_DIR);
const ORIGIN = 'https://velora-global.online';
const checkOnly = process.argv.includes('--check');

const index = JSON.parse(readFileSync(INDEX_PATH, 'utf8'));
const changes = [];

for (const skill of index.skills) {
  const skillFile = new URL(skill.url.slice(ORIGIN.length), ORIGIN);
  const relative = decodeURIComponent(skillFile.pathname).replace(/^\/\.well-known\/agent-skills\//, '');
  if (!existsSync(new URL(relative, SKILLS_DIR))) {
    console.error(`MISSING ${skill.name}: ${relative} is advertised but not in public/.well-known/agent-skills/`);
    process.exitCode = 1;
    continue;
  }
  const digest = 'sha256:' + createHash('sha256')
    .update(readFileSync(new URL(relative, SKILLS_DIR)))
    .digest('hex');
  if (skill.digest !== digest) {
    changes.push(`${skill.name}: ${skill.digest} -> ${digest}`);
    skill.digest = digest;
  }
}

const extra = readdirSync(SKILLS_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => !index.skills.some((skill) => skill.name === name));
for (const name of extra) {
  console.error(`UNLISTED ${name}: directory present but missing from index.json`);
  process.exitCode = 1;
}

if (changes.length && !checkOnly) {
  writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2) + '\n');
}
changes.forEach((line) => console.log(`updated ${line}`));
if (checkOnly && changes.length) {
  changes.forEach((line) => console.log(`DRIFT ${line}`));
  process.exitCode = 1;
}
if (!process.exitCode) console.log(`skill digests ok (${index.skills.length} skills)`);

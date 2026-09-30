/**
 * Exercises the real edge middleware (functions/_middleware.js) against the
 * built index.html, so route metadata, noindex policy and the 404 behaviour are
 * tested the way Cloudflare Pages serves them — not the way the SPA renders.
 *
 * Usage: npm run build && node scripts/verify-route-seo.mjs
 */
import { readFileSync } from 'node:fs';
import { onRequest } from '../functions/_middleware.js';
import { getRouteSeo, ROUTE_SEO } from '../functions/_shared/routeSeo.js';
import {
  ORG,
  ORG_ID,
  WEB_ID,
  PEOPLE,
  personId,
  FAQS as EDGE_FAQS,
  GRADING_CRITERIA as EDGE_CRITERIA,
  INTERNSHIP_TIERS as EDGE_TIERS,
  INTERNSHIP_TRACKS as EDGE_INTERNSHIP_TRACKS,
  SERVICES_CATALOG as EDGE_SERVICES,
  TRAINING_PROGRAMS as EDGE_TRAINING
} from '../functions/_shared/entity.js';
import {
  ORG_FACTS,
  LEADERSHIP,
  FAQS as CLIENT_FAQS,
  GRADING_CRITERIA as CLIENT_CRITERIA,
  INTERNSHIP_TIERS as CLIENT_TIERS,
  SERVICES_CATALOG as CLIENT_SERVICES
} from '../src/content/siteFacts.js';
import { INTERNSHIP_PROGRAMS, TRAINING_PROGRAMS as CLIENT_TRAINING } from '../src/content/programs.js';
import {
  tabToPathMap,
  pathToTabMap,
  pageTitles,
  pageDescriptions
} from '../src/constants/navigation.js';

const ORIGIN = 'https://velora-global.online';
const html = readFileSync(new URL('../build/index.html', import.meta.url), 'utf8');

const decode = (s) => String(s).replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<');

function serve(pathname, accept = 'text/html,application/xhtml+xml', upstreamType = 'text/html; charset=utf-8') {
  const context = {
    request: new Request(ORIGIN + pathname, { headers: { accept } }),
    next: async () =>
      new Response(upstreamType.startsWith('text/html') ? html : '{"ok":true}',
        { status: 200, headers: { 'content-type': upstreamType } })
  };
  return onRequest(context);
}

let failures = 0;
function check(label, condition, detail = '') {
  if (condition) return true;
  failures++;
  console.log(`  FAIL ${label}${detail ? ' — ' + detail : ''}`);
  return false;
}

async function assertPage(pathname) {
  const seo = getRouteSeo(pathname);
  const res = await serve(pathname);
  const body = await res.text();
  const tag = pathname.padEnd(14);

  if (!check(`${tag} status 200`, res.status === 200, `got ${res.status}`)) return;

  const canonicals = [...body.matchAll(/<link\b[^>]*rel=["']canonical["'][^>]*>/g)];
  const title = decode(body.match(/<title>([\s\S]*?)<\/title>/)[1]);
  const desc = decode(body.match(/<meta\b[^>]*name=["']description["'][^>]*content="([^"]*)"/)[1]);
  const ogUrl = body.match(/<meta\b[^>]*property=["']og:url["'][^>]*content="([^"]*)"/)[1];
  const ogTitle = decode(body.match(/<meta\b[^>]*property=["']og:title["'][^>]*content="([^"]*)"/)[1]);
  const twUrl = body.match(/<meta\b[^>]*name=["']twitter:url["'][^>]*content="([^"]*)"/)[1];
  const robots = body.match(/<meta\b[^>]*name=["']robots["'][^>]*content="([^"]*)"/)[1];

  // Aliases consolidate onto their primary URL; that is the whole point of the map.
  const expected = seo.canonical;
  const noindex = /noindex/i.test(seo.robots || '');

  check(`${tag} one canonical only`, canonicals.length === 1, `found ${canonicals.length}`);
  check(`${tag} canonical`, canonicals[0][0].includes(expected));
  check(`${tag} og:url`, ogUrl === expected, ogUrl);
  check(`${tag} twitter:url`, twUrl === expected, twUrl);
  check(`${tag} title`, title === seo.title, title);
  check(`${tag} og:title`, ogTitle === seo.title, ogTitle);
  check(`${tag} description`, desc === seo.description, desc.slice(0, 70));
  check(
    `${tag} robots=${noindex ? 'noindex' : 'index'}`,
    noindex ? /noindex/i.test(robots) : !/noindex/i.test(robots),
    robots
  );
  check(
    `${tag} X-Robots-Tag matches meta`,
    (res.headers.get('x-robots-tag') || '') === (noindex ? seo.robots : ''),
    res.headers.get('x-robots-tag')
  );

  const graph = noindex ? null : parseGraph(body);
  if (noindex) {
    check(`${tag} no graph on a noindexed route`, !/application\/ld\+json/.test(body));
  } else if (graph) {
    check(`${tag} graph declares the page`, graph.ids.has(`${expected}#webpage`));
    const orgNode = graph.nodes.find((node) => node['@type'] === 'Organization');
    check(`${tag} organization carries the founding year`, orgNode && orgNode.foundingDate === ORG.founded, orgNode && orgNode.foundingDate);
    check(
      `${tag} publishes no breadcrumb schema`,
      !graph.nodes.some((node) => node['@type'] === 'BreadcrumbList'),
      'the site shows no visible trail, so none may be claimed'
    );
    for (const dangling of graph.dangling) {
      check(`${tag} @id ${dangling} resolves`, false, 'no node in this graph declares it');
    }
    for (const question of graph.faqQuestions) {
      check(`${tag} FAQ schema is visible text`, clientFaqQuestions(seo).includes(question), question.slice(0, 48));
    }
  } else {
    check(`${tag} publishes a JSON-LD graph`, false, 'no parsable ld+json block');
  }

  console.log(`  ok   ${tag} ${res.status} ${noindex ? '[noindex] ' : ''}${title}`);
}

function parseGraph(body) {
  const blocks = [...body.matchAll(/<script[^>]*\btype=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g)];
  if (!blocks.length) return null;
  const graph = JSON.parse(blocks[0][1]);
  const nodes = graph['@graph'] || [];

  /*
   * An object carrying only `@id` points at a node; an object carrying `@id`
   * alongside properties declares one. A pointer is dangling when nothing in
   * this graph — top level or nested — declares it. Person nodes are the
   * deliberate exception: they are published on the routes that show the person.
   */
  const declarations = new Set(nodes.map((node) => node['@id']));
  const collect = (value) => {
    if (Array.isArray(value)) return value.forEach(collect);
    if (!value || typeof value !== 'object') return;
    const keys = Object.keys(value);
    if (typeof value['@id'] === 'string' && keys.length > 1) declarations.add(value['@id']);
    keys.forEach((key) => collect(value[key]));
  };
  collect(nodes);
  const known = new Set([
    ...declarations,
    ORG_ID,
    WEB_ID,
    ...PEOPLE.map((person) => personId(person.slug))
  ]);

  const dangling = [];
  const walk = (value) => {
    if (Array.isArray(value)) return value.forEach(walk);
    if (!value || typeof value !== 'object') return;
    const keys = Object.keys(value);
    if (keys.length === 1 && typeof value['@id'] === 'string') {
      if (!known.has(value['@id'])) dangling.push(value['@id']);
      return;
    }
    keys.forEach((key) => walk(value[key]));
  };
  walk(nodes);
  const faqQuestions = nodes
    .filter((node) => node['@type'] === 'FAQPage')
    .flatMap((node) => (node.mainEntity || []).map((entry) => entry.name));
  return { ids: declarations, dangling, faqQuestions, nodes };
}

// The schema may only restate answers the visitor can read on the page.
function clientFaqQuestions(seo) {
  const path = seo.canonical.replace(/^https?:\/\/velora-global\.online/, '') || '/';
  const key = pathToTabMap[path];
  return ((CLIENT_FAQS[key] || []).map((faq) => faq.question));
}

const INDEXABLE = ['/', '/home', '/verify', '/services', '/contact', '/internships', '/student', '/training', '/team', '/about', '/privacy-policy', '/terms'];
const PROTECTED = ['/client', '/admin', '/workspace'];

console.log('\nIndexable routes');
for (const path of INDEXABLE) await assertPage(path);

console.log('\nApp-protected routes (must not be indexed)');
for (const path of PROTECTED) await assertPage(path);

console.log('\nUnknown routes must be a real 404, not a copy of the homepage');
for (const path of ['/some-unknown-path', '/internsships', '/blog/post-1']) {
  const res = await serve(path);
  const body = await res.text();
  check(`${path} status 404`, res.status === 404, `got ${res.status}`);
  check(`${path} no homepage title`, !/Technology Training, Internships & Enterprise Solutions/.test(body));
  check(`${path} noindex header`, /noindex/i.test(res.headers.get('x-robots-tag') || ''));
  check(`${path} links still crawlable`, /href="\/internships"/.test(body));
  console.log(`  ok   ${path.padEnd(14)} ${res.status}`);
}

console.log('\nAssets and agent documents must keep resolving');
const DOCUMENT_TYPES = {
  '/robots.txt': 'text/plain; charset=utf-8',
  '/sitemap.xml': 'application/xml; charset=utf-8',
  '/openapi.json': 'application/openapi+json; charset=utf-8',
  '/.well-known/api-catalog': 'application/linkset+json; charset=utf-8',
  '/.well-known/ai-catalog.json': 'application/json; charset=utf-8',
  '/images/background.webp': 'image/webp'
};
for (const [path, type] of Object.entries(DOCUMENT_TYPES)) {
  const res = await serve(path, 'text/html', type);
  check(`${path} not 404`, res.status !== 404, `got ${res.status}`);
  console.log(`  ok   ${path.padEnd(32)} ${res.status} ${type}`);
}

console.log('\nA missing asset must not masquerade as a page');
// Cloudflare's /* -> /index.html 200 fallback answers absent files with the SPA
// document, which is how an un-deployed image looks healthy to a crawler.
const missingImage = await serve('/images/not-there.webp');
check('missing .webp is 404', missingImage.status === 404, `got ${missingImage.status}`);
const missingJson = await serve('/.well-known/not-there.json');
check('missing .well-known doc stays 200 (not our call to make)', missingJson.status === 200, `got ${missingJson.status}`);
const htmlAlias = await serve('/services.html');
check('/services.html alias still resolves', htmlAlias.status === 200, `got ${htmlAlias.status}`);

const markdown = await serve('/', 'text/markdown');
check('markdown negotiation works', /text\/markdown/.test(markdown.headers.get('content-type') || ''));
const unknownMarkdown = await serve('/some-unknown-path', 'text/markdown');
check('unknown path is 404 for agents too', unknownMarkdown.status === 404, `got ${unknownMarkdown.status}`);

console.log('\nLink header must only advertise documents that exist');
const link = (await serve('/services')).headers.get('link') || '';
check('no /docs/api advertisement', !link.includes('/docs/api'), link);
for (const rel of ['/openapi.json', '/.well-known/api-catalog']) {
  check(`link includes ${rel}`, link.includes(rel), rel);
}
for (const rel of ['/auth.md', '/.well-known/mcp', '/.well-known/acp.json', '/.well-known/ucp', '/.well-known/jwks.json']) {
  check(`link no longer advertises ${rel}`, !link.includes(rel), rel);
}

console.log('\nSocial card must match its declared dimensions');
const png = readFileSync(new URL('../build/og-image.png', import.meta.url));
const card = { width: png.readUInt32BE(16), height: png.readUInt32BE(20) };
const image = decode(html.match(/<meta property="og:image" content="([^"]*)"/)[1]);
const w = html.match(/<meta property="og:image:width" content="(\d+)"/)[1];
const h = html.match(/<meta property="og:image:height" content="(\d+)"/)[1];
check('og:image points at the card', /og-image\.png$/.test(image), image);
check(`card is ${w}x${h} like the tag`, card.width === Number(w) && card.height === Number(h), `actual ${card.width}x${card.height}`);
check('twitter:image matches og:image', /og-image\.png/.test(html.match(/<meta name="twitter:image" content="([^"]*)"/)[1]));

console.log('\nEdge entity facts must match the facts the client renders');
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
check('organization identity', same(
  { name: ORG_FACTS.name, url: ORG_FACTS.url, email: ORG_FACTS.email, telephone: ORG_FACTS.telephone, founded: ORG_FACTS.founded, description: ORG_FACTS.description },
  { name: ORG.name, url: ORG.url, email: ORG.email, telephone: ORG.telephone, founded: ORG.founded, description: ORG.description }
));
check('published people', same(
  LEADERSHIP.map((person) => `${person.name} / ${person.jobTitle}`),
  PEOPLE.filter((person) => person.slug !== 'ram-sah').map((person) => `${person.name} / ${person.jobTitle}`)
));
check('grading criteria', same(EDGE_CRITERIA, CLIENT_CRITERIA));
check('internship fee tiers', same(EDGE_TIERS, CLIENT_TIERS));
check('service catalog', same(EDGE_SERVICES, CLIENT_SERVICES));
check('internship track titles', same(
  EDGE_INTERNSHIP_TRACKS,
  INTERNSHIP_PROGRAMS.map((program) => program.title)
));
check('training program fees', same(
  EDGE_TRAINING.filter((program) => program.fee).map((program) => `${program.title} / ${program.fee}`),
  CLIENT_TRAINING.filter((program) => program.fee).map((program) => `${program.title} / ${program.fee}`)
));
for (const key of Object.keys(EDGE_FAQS)) {
  check(`FAQ copy mirrored for /${key}`, same(EDGE_FAQS[key], CLIENT_FAQS[key]), `${EDGE_FAQS[key].length} vs ${(CLIENT_FAQS[key] || []).length} entries`);
}

console.log('\nClient tab metadata must match the edge route metadata');
for (const [path, seo] of Object.entries(ROUTE_SEO)) {
  const tab = pathToTabMap[path];
  if (!tab || seo.robots) continue;
  if (tabToPathMap[tab] !== path) continue;
  check(`${path} title matches client`, pageTitles[tab] === seo.title, pageTitles[tab]);
  check(`${path} description matches client`, pageDescriptions[tab] === seo.description, (pageDescriptions[tab] || '').slice(0, 60));
}

console.log('\nSchema must not claim ratings, reviews, awards or unverified business data');
const FORBIDDEN = [
  ['AggregateRating', /AggregateRating/],
  ['ratingValue', /"ratingValue"/],
  ['reviewCount', /"reviewCount"/],
  ['Review entity', /"@type":\s*"Review"/],
  ['Product entity', /"@type":\s*"Product"/],
  ['LocalBusiness entity', /"@type":\s*"LocalBusiness"/],
  ['postal address', /"postalAddress"|"streetAddress"/],
  ['geo coordinates', /"geo"|"geoCoordinates"/],
  ['opening hours', /"openingHours"/],
  ['price range', /"priceRange"/],
  ['payment methods', /"paymentAccepted"/],
  ['award claims', /"awards"\s*:|\bNo\.1\b|award-winning/i],
  ['tamper-proof claims', /tamper[- ]proof|cryptographically (?:secured|signed)|blockchain/i],
  ['invented statistics', /\btrusted by \d[\d,]*\+|\d+\+ (?:placed|hired|clients|engineers)\b/i]
];
for (const path of INDEXABLE) {
  const body = await (await serve(path)).text();
  for (const [label, pattern] of FORBIDDEN) {
    check(`${path.padEnd(14)} free of ${label}`, !pattern.test(body), pattern.source);
  }
}

console.log(`\n${failures ? `${failures} FAILURE(S)` : 'All route SEO checks passed.'}`);
process.exit(failures ? 1 : 0);

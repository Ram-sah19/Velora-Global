import { readFileSync } from 'node:fs';
import { getRouteSeo, applyRouteSeoToHtml } from '../functions/_shared/routeSeo.js';

const html = readFileSync(new URL('../build/index.html', import.meta.url), 'utf8');

const routes = ['/', '/home', '/verify', '/services', '/contact', '/internships', '/student', '/training', '/team', '/about', '/client', '/some-unknown-path'];

let failures = 0;
for (const path of routes) {
  const seo = getRouteSeo(path);
  const out = seo ? applyRouteSeoToHtml(html, seo) : html;

  const canonicals = [...out.matchAll(/<link\b[^>]*rel=["']canonical["'][^>]*>/g)];
  const title = out.match(/<title>([\s\S]*?)<\/title>/)[1];
  const desc = out.match(/<meta\b[^>]*name=["']description["'][^>]*content="([^"]*)"/);
  const ogUrl = out.match(/<meta\b[^>]*property=["']og:url["'][^>]*content="([^"]*)"/)[1];
  const ogTitle = out.match(/<meta\b[^>]*property=["']og:title["'][^>]*content="([^"]*)"/)[1];
  const twUrl = out.match(/<meta\b[^>]*name=["']twitter:url["'][^>]*content="([^"]*)"/)[1];
  const robots = out.match(/<meta\b[^>]*name=["']robots["'][^>]*content="([^"]*)"/)[1];

  const expected = seo ? seo.canonical : 'https://velora-global.online/';
  const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<');
  const ok =
    canonicals.length === 1 &&
    canonicals[0][0].includes(expected) &&
    ogUrl === expected &&
    twUrl === expected &&
    (seo ? title === seo.title : true) &&
    (seo ? decode(ogTitle) === seo.title : true) &&
    !/noindex/i.test(robots);

  if (!ok) failures++;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${path.padEnd(20)} canonical=${canonicals.length}x ${expected}`);
  console.log(`     title: ${title}`);
  if (desc) console.log(`     desc : ${desc[1].slice(0, 90)}...`);
}

// Homepage must be untouched defaults (middleware rewrites only configured routes)
const home = applyRouteSeoToHtml(html, getRouteSeo('/'));
console.log('\nHomepage canonical:', home.match(/rel="canonical" href="([^"]*)"/)[1]);
console.log('JSON-LD blocks preserved:', (home.match(/application\/ld\+json/g) || []).length);

process.exit(failures ? 1 : 0);

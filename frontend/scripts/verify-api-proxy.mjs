/**
 * Exercises the middleware's same-origin /api proxy against a local stub upstream,
 * because the Cloudflare Pages /api rewrite in public/_redirects silently never
 * applied (external destinations require 30x, not 200).
 *
 * Usage: node scripts/verify-api-proxy.mjs
 */
import { createServer } from 'node:http';
import { onRequest } from '../functions/_middleware.js';

const seen = [];

const upstream = createServer((req, res) => {
  let body = '';
  req.on('data', (chunk) => { body += chunk; });
  req.on('end', () => {
    seen.push({ method: req.method, url: req.url, origin: req.headers.origin, body, cookie: req.headers.cookie });
    if (req.url.startsWith('/api/certificates/verify/')) {
      res.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': 'https://example-spoof.test' });
      return res.end(JSON.stringify({ success: true, verified: true, certificateId: 'VG-2026-88491' }));
    }
    if (req.url.startsWith('/api/client-inquiries')) {
      res.writeHead(401, { 'content-type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ error: 'Authentication required' }));
    }
    if (req.url.startsWith('/api/nope')) {
      res.writeHead(404, { 'content-type': 'text/plain' });
      return res.end('not found');
    }
    res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: true, url: req.url }));
  });
});

await new Promise((resolve) => upstream.listen(0, '127.0.0.1', resolve));
const API_ORIGIN = `http://127.0.0.1:${upstream.address().port}`;

let failures = 0;
function check(label, condition, detail = '') {
  if (condition) return console.log(`  ok   ${label}`);
  failures++;
  console.log(`  FAIL ${label}${detail ? ' — ' + detail : ''}`);
}

async function call(pathname, init = {}) {
  const request = new Request('https://velora-global.online' + pathname, {
    ...init,
    headers: { origin: 'https://velora-global.online', cookie: 'session=abc', ...(init.headers || {}) }
  });
  return onRequest({
    request,
    env: { VG_API_ORIGIN: API_ORIGIN },
    next: async () => new Response('<html>SPA</html>', { headers: { 'content-type': 'text/html' } })
  });
}

console.log('\nGET is proxied with method, path, query and cookies intact');
const health = await call('/api/health');
check('status 200', health.status === 200, `got ${health.status}`);
check('json passthrough', /application\/json/.test(health.headers.get('content-type') || ''));
check('upstream saw GET /api/health', seen.at(-1)?.method === 'GET' && seen.at(-1)?.url === '/api/health');
check('cookie forwarded', seen.at(-1)?.cookie === 'session=abc');
check('client origin forwarded', seen.at(-1)?.origin === 'https://velora-global.online');

const query = await call('/api/programs?domain=ai&search=ml');
check('query string preserved', seen.at(-1)?.url === '/api/programs?domain=ai&search=ml', seen.at(-1)?.url);

console.log('\nUpstream status codes are not swallowed by the SPA fallback');
check('401 passes through', (await call('/api/client-inquiries')).status === 401);
check('404 passes through', (await call('/api/nope')).status === 404);
check('unknown /api path is not HTML', !/<html>SPA/.test(await (await call('/api/nope')).text()));

console.log('\nPOST bodies reach the backend');
const posted = await call('/api/echo', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ name: 'Test' })
});
check('POST status 200', posted.status === 200, `got ${posted.status}`);
check('body forwarded', seen.at(-1)?.body === JSON.stringify({ name: 'Test' }), seen.at(-1)?.body);
check('method forwarded', seen.at(-1)?.method === 'POST');

console.log('\nProxy must not widen the CORS surface');
const verified = await call('/api/certificates/verify/VG-2026-88491');
const payload = await verified.json();
check('certificate verifies through proxy', payload.verified === true, JSON.stringify(payload));
check('upstream ACAO not re-advertised', !verified.headers.get('access-control-allow-origin'), verified.headers.get('access-control-allow-origin'));
check('content-length recomputed away', !verified.headers.get('content-length'));
check('no stale content-encoding', !verified.headers.get('content-encoding'));

console.log('\nOnly real HTTP methods are proxied');
const options = await call('/api/health', { method: 'OPTIONS' });
check('OPTIONS rejected with 405', options.status === 405, `got ${options.status}`);
check('Allow header present', /GET/.test(options.headers.get('allow') || ''), options.headers.get('allow'));

console.log('\nNon-API routes must not touch the proxy');
const page = await call('/services');
check('/services served by SPA', page.status === 200 && /<html>SPA/.test(await page.text()));
check('no extra upstream call', seen.every((s) => s.url.startsWith('/api/')));

// Keep-alive sockets from the proxy would otherwise still be open when the
// process exits, which aborts on Windows instead of returning the exit code.
upstream.closeAllConnections();
upstream.close();
console.log(`\n${failures ? `${failures} FAILURE(S)` : 'All API proxy checks passed.'}`);
process.exit(failures ? 1 : 0);

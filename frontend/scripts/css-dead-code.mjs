import fs from 'fs';
import path from 'path';

// Reports index.css rules nothing renders any more. Deliberately conservative: a
// name that only ever appears inside a template literal counts as used, because a
// false "dead" here deletes live styles. Run: node scripts/css-dead-code.mjs
const ROOT = process.cwd();
const css = fs.readFileSync(path.join(ROOT, 'src/index.css'), 'utf8');
const cssClean = css.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));

const files = [];
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === 'build' || e.name === '.git') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(js|jsx|html)$/i.test(e.name)) files.push(p);
  }
};
['src', 'public', 'functions', 'backend'].map((d) => path.join(ROOT, d)).filter(fs.existsSync).forEach(walk);
const hay = files.map((f) => fs.readFileSync(f, 'utf8')).join('\n');

// `svc-select__panel--${side}` renders svc-select__panel--down, so the stem of a
// modifier counts as a use of every modifier under it.
const used = (name) => {
  if (hay.includes(name)) return true;
  const cut = Math.max(name.lastIndexOf('__'), name.lastIndexOf('--'));
  return cut > 0 && hay.includes(name.slice(0, cut));
};

const classes = new Set();
for (const m of cssClean.matchAll(/\.(-?[A-Za-z_][\w-]*)/g)) {
  // `.w3` and `.org` inside url("http://www.w3.org/2000/svg") are not selectors.
  if (cssClean.slice(Math.max(0, m.index - 40), m.index).includes('url(')) continue;
  classes.add(m[1]);
}

const keyframes = new Set();
for (const m of cssClean.matchAll(/@keyframes\s+([\w-]+)/g)) keyframes.add(m[1]);

// Only `--x:` opening a declaration is a definition; `.svc-btn--blue:` is not one.
const vars = new Set();
for (const m of cssClean.matchAll(/^\s*(--[\w-]+)\s*:/gm)) vars.add(m[1]);

console.log(JSON.stringify({
  cssLines: css.split('\n').length,
  selectors: classes.size,
  unusedClasses: [...classes].filter((c) => !used(c)).sort(),
  // A keyframe is live if any rule animates it or any component names it inline.
  unusedKeyframes: [...keyframes].filter((n) => !new RegExp('animation[^;}]*\\b' + n + '\\b').test(cssClean) && !hay.includes(n)),
  unusedVars: [...vars].filter((v) => !hay.includes(`var(${v}`) && !cssClean.includes(`var(${v}`)),
  scanned: files.length
}, null, 2));

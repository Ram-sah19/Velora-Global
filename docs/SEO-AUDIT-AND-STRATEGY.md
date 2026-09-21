# Velora Global — SEO Audit & International + Nepal Strategy

Site: https://velora-global.online
Audit date: 2026-09-21
Scope: live production site (HTTP probes, served HTML, robots.txt, sitemap.xml, redirects) + frontend/backend source code.
Ground rules applied: no ranking guarantees, white-hat only, no fabricated locations/clients/reviews/awards, no keyword stuffing, one primary intent per page.

---

## Part A — Audit Findings

### 1. Current SEO issues (content & on-page)

| # | Finding | Evidence | Impact |
|---|---------|----------|--------|
| A1 | Client-rendered SPA: served HTML body is an empty `<div id="root">` | `curl https://velora-global.online/` — 17.7 KB shell, zero text content | Google can render JS, but indexing is delayed/partial. Bing, most AI crawlers (Perplexity, Claude-Web, CCBot — all explicitly allowed in your robots.txt) get **no content at all**. This is the single biggest limitation on the site. |
| A2 | No H1 on Services, Internships, Training pages | `grep <h1` — only `HeroSection.js` and `TeamPage.js` have one | Weakest on-page relevance signal for `/services`, `/internships`, `/training`. |
| A3 | Thin, single-page-per-topic architecture | Each tab is one page; no `/services/web-development`, no blog, no case studies | Can't rank for mid-tail intent ("MERN stack development services", "full stack internship Nepal") without dedicated, genuinely useful pages. |
| A4 | Founder-name inconsistency across metadata | Shipped `index.html`: "Led by Ram Sah". `constants/navigation.js`: "Founded in 2024 by Abhishek Sah". Files exist for ram_sah, abhishek_sah, rambilas_sah | E-E-A-T and entity-consistency problem. **Needs your decision on the one canonical public name/bio** before any schema or About content is finalized. |
| A5 | `meta keywords` present, homepage title is generic-length | Shipped head | Keywords tag is ignored by Google (harmless); title/description are decent but Nepal-heavy for a "global" positioning goal (see §13). |
| A6 | Almost no indexable imagery | Only 4 `<img>` tags in `src/`; hero and section visuals are CSS backgrounds; no `loading="lazy"`, no WebP/AVIF | Missed image-search traffic + accessibility (alt) + page-weight signal. |

### 2. Technical SEO issues

| # | Finding | Evidence | Impact |
|---|---------|----------|--------|
| T1 | **Every route ships identical HTML with `canonical → https://velora-global.online` (the homepage)** | `/services`, `/internships`, `/training` all return the same title and the same homepage canonical; `App.js:77+` fixes title/canonical only client-side | Crawlers that don't execute JS see all 9 sitemap URLs as duplicates of the homepage. Even for Googlebot, pre-render canonical conflicts with post-render canonical → consolidation risk. This undermines the entire sitemap. |
| T2 | Soft 404s: `/* → /index.html 200` for every unknown path | `/nonexistent-page-xyz` → HTTP 200 | Crawl-budget waste, bloated index, poor UX signal. No `404.html` exists in `public/`. |
| T3 | Duplicate URL aliases resolve live with 200: `/about`→team, `/contact`→services, `/student`→internships, `/home`, trailing slash `/services/` | `pathToTabMap` + curl | Multiple URLs, one page, no server-level 301 → duplicate-content sprawl. |
| T4 | `www.velora-global.online` does not resolve at all | curl → connection failure (000) | Lost direct-type traffic from www users; CSP already references the www host. Add DNS + 301 → apex. |
| T5 | Heavy unoptimized images | `hero_mountain.png/jpg` 724 KB (duplicated in `/media` and `/images`), `shivshankar_sah.jpg` 488 KB, `puja_rouniyar.jpg` 384 KB | LCP risk on mobile/Nepal networks; CWV affects rankings indirectly. |
| T6 | Main JS bundle 292 KB (pre-gzip) + lazy chunks; `VeloraIntro` splash gates first paint | `build/static/js/main*.js`; `introReady` state | Render delay → slower indexing signal and worse perceived CWV. |
| T7 | HTTP→HTTPS 301 works; HSTS, CSP, security headers present and good | `_headers`, curl | ✅ No action (minor: CSP `frame-ancestors 'none'` + `X-Frame-Options: SAMEORIGIN` are redundant but fine). |

### 3. Indexing / crawlability issues (summary)

- Google likely indexes **the homepage well** and the other 8 routes inconsistently (render-dependent, canonical-conflicted).
- Non-Google engines and AI crawlers effectively index **only the empty shell** → the `ai-train=yes` content signal in robots.txt promises content those agents cannot read.
- `google-site-verification` meta present ✅ — Search Console is set up (or at least verified); see §25 for property strategy.
- `/client` and `/admin` are workspace/log-in pages. `/admin` is Disallowed ✅; `/client` is **not** blocked and **is** in the sitemap → should be removed from sitemap and noindex'd.

### 4. Current sitemap issues

`public/sitemap.xml` (9 URLs):
- Contains non-indexable-intent URLs: `/client` (private workspace), `/verify` (utility), `/student` (alias of internships).
- Missing the aliases that actually exist (`/about`, `/contact`) — decide canonical form and 301 the rest rather than listing both.
- All `lastmod` dates are stale (2026-08-23/30) and hand-maintained; `changefreq`/`priority` are ignored by Google — keep them or drop them, but fix `lastmod` to real content-change dates (a build script can stamp them).
- As new pages are built (Part B), the sitemap must be regenerated per deploy, not edited by hand.

### 5. Current robots.txt issues

Mostly healthy: `Allow: /`, `Disallow: /admin`, sitemap referenced, AI-bot blocks present, Content-Signal set.
- Add `Disallow: /client` and `Disallow: /workspace` (private areas).
- The `Agentmap:` directive is non-standard (harmless, ignored).
- Consider removing the per-AI-bot `User-agent` blocks — `User-agent: * Allow: /` already covers them; the block list is maintenance noise (optional).

---

## Part B — Strategy

### 6. Recommended website architecture

Target structure (only build a page when it will hold genuinely unique, useful content — the phased plan in §26 enforces this):

```
/                                  Homepage (global positioning)
/services/                         Services hub
  /services/software-development
  /services/web-development
  /services/mobile-app-development
  /services/ai-ml-development
  /services/saas-mvp-development
  /services/technology-consulting
/solutions/                        Audience hub (optional, phase 3)
  /solutions/startups  /solutions/businesses  /solutions/education
/training/                         Training hub
  /training/full-stack-development
  /training/ai-ml-python
  /training/frontend-development
  /training/backend-development
/internships/                      Internship hub
  /internships/full-stack
  /internships/ai-ml
  /internships/frontend
  /internships/backend
/projects/                         Real delivered work (list)
/case-studies/<slug>/              One per real project worth telling
/about/                            Company story, registration, mission
/team/                             Leadership (real people, real bios)
/contact/                          Canonical contact page (currently an alias of /services)
/nepal/                            Nepal hub
  /nepal/software-development
  /nepal/software-training
  /nepal/internships
/insights/<slug>/                  Articles (content calendar, §21)
/verify/                           Certificate verifier — keep, noindex (utility)
/client/ /admin/                   App areas — robots Disallow + noindex, never in sitemap
```

Rules baked into this design:
- `/about` and `/team` become **separate real pages** (currently aliases). Until then, 301 `/about → /team`, `/contact → /services` server-side (`_redirects` supports 301 before the SPA fallback).
- One canonical form: no trailing slash, lowercase, hyphens. 301 every alias.
- **No doorway city pages.** `/nepal/<page>` targets national intent; Kathmandu/Pokhara etc. appear only inside genuinely written content where Velora actually operates. If a real physical office exists, it goes in NAP + LocalBusiness schema (§19/§20); no fake offices.

### 7. Global keyword strategy (commercial, non-Nepal)

Grouped by intent — one page per group, no per-variation pages:

| Cluster | Representative queries | Target page | Priority |
|---|---|---|---|
| Core dev services | software development company / services, custom software development, software development agency, software development partner | `/services/software-development` | High |
| Outsourcing/dedicated team | software outsourcing company, dedicated development team | `/services/technology-consulting` (engagement-model section) | Medium |
| Web/stack-specific | React development company, Next.js development company, Node.js development company, full stack development company | `/services/web-development` | High |
| Mobile | mobile app development company/services | `/services/mobile-app-development` | High |
| AI/ML | AI development company/services, machine learning development, AI integration services, AI automation services | `/services/ai-ml-development` | High |
| SaaS/MVP | SaaS development company, MVP development company, startup software development | `/services/saas-mvp-development` | High |
| Consulting | software consulting, technology consulting, digital transformation services, business automation services | `/services/technology-consulting` | Medium |

Honest limitation: competing for head terms ("software development company") against global agencies is a decade-long game. Realistic global wins come from **long-tail + stack-specific + "outsourcing to Nepal/South Asia" hybrid queries**, which is exactly why the `/nepal/` section (§10) doubles as a global-cost-advantage asset.

### 8. Nepal keyword strategy (commercial)

| Cluster | Representative queries | Target page | Priority |
|---|---|---|---|
| Company terms | software company in Nepal, software development company in Nepal, IT company in Nepal, technology company in Nepal | `/nepal/software-development` | High |
| Capital terms | software company Kathmandu, IT company Kathmandu (only where Kathmandu is factual — confirm service area) | same page, natural mentions | High |
| Service-in-Nepal | web development company Nepal, custom software development Nepal, AI development company Nepal, software solutions Nepal, IT solutions Nepal | `/nepal/software-development` sections | High |
| Brand | Velora Global, Velora Nepal, velora global online | homepage + About | automatic |

### 9. Training keyword strategy

| Cluster | Representative queries | Target page |
|---|---|---|
| Generic Nepal | software training in Nepal, IT training in Nepal, programming training Nepal, coding training Nepal | `/training/` hub + `/nepal/software-training` |
| Stack-specific | full stack development training Nepal, MERN stack training Nepal, frontend/backend development training Nepal | `/training/full-stack-development`, `/training/frontend-development`, `/training/backend-development` |
| AI/Python | AI/ML training Nepal, artificial intelligence training Nepal, machine learning training Nepal, Python training Nepal, JavaScript training Nepal | `/training/ai-ml-python` |
| Course-intent | software development course Nepal, full stack developer course Nepal, AI course Nepal | same pages (course ≈ program here; do NOT build parallel "course" doorway pages) |

### 10. Internship keyword strategy

| Cluster | Representative queries | Target page |
|---|---|---|
| Generic | software internship Nepal, IT internship Nepal, developer internship Nepal, software engineer internship Nepal | `/internships/` hub |
| Track-specific | full stack internship Nepal, MERN internship Nepal, frontend/backend internship Nepal, AI/ML internship Nepal, machine learning internship Nepal, Python internship Nepal | `/internships/<track>` |
| Student | internship for computer science students Nepal, IT internship for students Nepal | `/internships/` hub + insights article |

Never claim guaranteed jobs, salary, or placement. Eligibility, duration, remote/onsite facts, mentorship model, and a real application flow are the ranking content.

### 11. Software-development keyword strategy (global informational)

Targeted via `/insights/` articles, each linking to `/services/software-development`:
"How to choose a software development company", "Custom software vs off-the-shelf", "How much does software development cost" (publish a real methodology/range, not a bait page), "How to hire a dedicated development team", "React vs Next.js", "Node.js vs Python for backend".

### 12. AI/ML keyword strategy

- Commercial: `/services/ai-ml-development` (AI development company/services, ML solutions, AI integration, AI automation, chatbot integration in web apps — this one you already sell, per the navbar).
- Informational: "How AI can automate business processes", "AI integration for small business", "Chatbot for a web app: what it costs and takes".
- Nepal: "AI development company Nepal", "AI/ML career opportunities in Nepal" (article).

### 13. Homepage SEO title

Current: `Velora Global | Technology Training, Internships & Enterprise Solutions` — acceptable, but Nepal-first framing undercuts the global goal.

Recommended (≤ 60 chars, brand-first, humans first):
**`Velora Global — Software Development, AI Solutions, Training & Internships`**

### 14. Homepage meta description

Recommended (≤ 155 chars, matches actual page content — services, AI, training, internships, Nepal HQ, global delivery):
**"Velora Global builds custom software, web and mobile apps, and AI solutions for businesses worldwide — and trains the next generation through internships and programs in Nepal."**

### 15–17. Page-by-page titles, descriptions, H1/H2 recommendations

(For pages that don't exist yet, these activate when built. All differ from current client-side `pageTitles` — replace the constants in `frontend/src/constants/navigation.js` with these once Part C ships.)

| Page | Title | Meta description | H1 | Key H2s |
|---|---|---|---|---|
| `/` | (see §13/§14) | (see §13/§14) | Existing hero H1 (LOCKED — do not touch) | What we build → Who we train → Where we deliver → Proof of work |
| `/services/` | `Software Development Services | Web, Mobile & AI | Velora Global` | `Custom software, web, mobile and AI development for startups and enterprises. See how we scope, build and ship.` | `Software development services that ship to production` | per-service cards → process → engagement models → FAQ |
| `/services/web-development` | `Web & Full-Stack Development Services (React, Node.js) | Velora Global` | `React, Next.js and Node.js web development for products that need to scale.` | `Full-stack web development` | stack → process → case studies → pricing engagement |
| `/services/ai-ml-development` | `AI & Machine Learning Development Services | Velora Global` | `AI chatbots, automation and ML integration for web and mobile products — built and maintained by Velora Global.` | `AI development services for real business workflows` | use cases → approach → chatbot integration → FAQ |
| `/services/mobile-app-development` | `Mobile App Development Services (iOS & Android) | Velora Global` | `Cross-platform mobile apps with React Native and Flutter, from MVP to app-store release and maintenance.` | `Mobile app development, end to end` | capabilities → case studies → process |
| `/services/saas-mvp-development` | `SaaS & MVP Development for Startups | Velora Global` | `Launch your SaaS product faster: MVP scoping, architecture, and iterative delivery by a senior product team.` | `SaaS and MVP development for startups` | what's included → roadmap method → pricing models |
| `/services/technology-consulting` | `Technology Consulting & Software Outsourcing | Velora Global` | `Architecture reviews, digital transformation and dedicated development teams — a reliable outsourcing partner.` | `Technology consulting & dedicated teams` | services → engagement models → timezone/cost rationale |
| `/training/` | `Software Development Training Programs | Velora Global` | `Practical, project-based training in full-stack, AI/ML and Python — from one-week intensives to two-month tracks.` | `Software training built around real projects` | tracks → format → mentorship → apply |
| `/training/full-stack-development` | `Full-Stack (MERN) Development Training | Velora Global` | `Learn and build production MERN applications: React, Node.js, databases, deployment — with code reviews and mentorship.` | `Full-stack development training` | curriculum → projects → outcomes → FAQ |
| `/training/ai-ml-python` | `Python, AI & Machine Learning Training | Velora Global` | `Hands-on Python and AI/ML training: models, APIs and real integrations, mentored by working engineers.` | `AI/ML and Python training` | curriculum → projects → who it's for |
| `/internships/` | `Software Development Internships in Nepal | Velora Global` | `Project-driven internships across full-stack, AI/ML, frontend and backend — production code reviews and mentorship.` | `Technology internships that ship real software` | tracks → what interns do → eligibility → apply |
| `/internships/full-stack` etc. | `<Track> Internship | Velora Global` | Track-specific: responsibilities, tech, duration, mentorship, application. | `Full-stack development internship` | description → stack → responsibilities → FAQ |
| `/nepal/` | `Velora Global in Nepal — Software, Training & Internships` | `Our Nepal base: software development services, technology training and internship programs delivered from Kathmandu.` | `Software, training and internships from Nepal` | services → programs → location facts |
| `/nepal/software-development` | `Software Development Company in Nepal | Velora Global` | `Custom software, web, mobile and AI development from a Nepal-based engineering team serving global clients.` | `A software development company built in Nepal` | services → why Nepal → process → contact |
| `/nepal/software-training` | `Software & IT Training in Nepal | Velora Global` | `Full-stack, Python and AI/ML training in Nepal with mentorship, projects and verified certificates.` | `Technology training in Nepal` | programs → format → outcomes |
| `/nepal/internships` | `IT & Software Internships in Nepal | Velora Global` | `Internships for CS students and early developers in Nepal — real projects, code reviews, industry mentorship.` | `Software internships in Nepal` | tracks → eligibility → apply |
| `/about/` | `About Velora Global — Company, Mission & Facts` | `Who we are: founded 2024, registered, remote-first, serving clients worldwide from Nepal.` | `About Velora Global` | story → values → registration/facts → leadership link |
| `/team/` | `Leadership & Engineering Team | Velora Global` | `Meet the team behind Velora Global — engineers and mentors shipping client software and training programs.` | (existing H1 — keep) | bios (real, verified) |
| `/contact/` | `Contact Velora Global — Start a Project or Apply` | `Talk to us about software projects, training programs or internships. Response within one business day.` | `Get in touch` | form → emails → hours |
| `/projects/`, `/case-studies/<slug>` | `Projects / <Result-focused title>` | real summaries | `Selected work` / per-case H1 | context→problem→solution→stack→result |

H1/H2 rules: exactly one H1 per page (visible, in content — Services/Internships/Training fixes are safe because the hero is untouched); H2s map to the actual intent facets in §7–§12; no keyword-stuffed headings.

### 18. Internal linking strategy

- Every hub links down to all its children (services hub → 6 service pages; training hub → tracks; internships hub → tracks) with natural anchor text ("custom software development", not "click software development company services cheap").
- Every service page links to: 1 relevant case study, the contact/CTA, and its Nepal counterpart (`/nepal/software-development ↔ /services/software-development`).
- Articles link to exactly one commercial page each (avoids cannibalization); commercial pages don't link to articles except a "learn more" contextual link.
- Footer: keep company info; add a compact sitemap column (Services / Training / Internships / Nepal / About) once pages exist.
- Breadcrumbs on all pages below hubs (matches BreadcrumbList schema, §19).
- Current gap to fix now: navbar dropdown items are buttons that switch tabs — convert to real `<a href="/services/web-development">` links when pages exist so crawlers can follow the structure.

### 19. Structured-data strategy

Keep existing `@graph` (Organization as `EducationalOrganization,ProfessionalService,LocalBusiness` + WebSite + FAQPage + ItemList) but only where truthful:
- `LocalBusiness` — **only if there is a real, verifiable physical address/service area**; otherwise drop it and keep `ProfessionalService`. Do not claim an office that doesn't exist.
- `Organization`: add `founder` (the canonical name once you confirm A4), `foundingDate: 2024`, `sameAs` (LinkedIn, Instagram, Facebook, GitHub — all real, already linked in Contact/Footer), `email`, `telephone` if public.
- Per-page additions:
  - Service pages → `Service` (+ provider = Organization, areaServed honest).
  - Training pages → `Course` (name, description, provider, educationalLevel, isAccessibleForFree if true — never fake `aggregateRating`).
  - Internship pages → `JobPosting` only if you maintain real openings with valid dates; otherwise plain article-style content.
  - All deep pages → `BreadcrumbList`.
  - Articles → `Article` (author = real person, datePublished/dateModified accurate).
  - FAQPage only on pages where the FAQ is actually visible (current homepage one is fine).
- Validate with Rich Results Test after every change; one JSON-LD block per page, injected per rendered route (see Part C).

### 20. Local SEO strategy (Nepal)

Eligibility-gated — do only what's true:
1. **NAP consistency**: one canonical name, address (or "service area: Kathmandu Valley"), phone, email across site, schema, and any real profiles (LinkedIn company page exists — complete it fully; Google Business Profile only if a real, staffed location exists and you can receive verification postcard/phone. No fake GBP).
2. If a real office exists: GBP category "Software company" + "Coding school" (if training happens on-site), real photos, service areas = districts actually served.
3. Citations only on genuine directories: Nepalese tech directories, Common Sense, Machh, Job websites listing the company (as employer), Google/Bing places. No bulk citation builders.
4. `/nepal/software-development` becomes the local landing asset; link it from GBP website field.
5. Reviews: only real client/student reviews, collected honestly (GBP review link, LinkedIn recommendations). Never purchased.

### 21. Content calendar (first 6 months, ~2 pieces/month — quality over volume)

| Month | Global article | Nepal article |
|---|---|---|
| M1 | How to choose a software development company (honest buyer's guide) | How to start a software career in Nepal |
| M2 | Custom software vs off-the-shelf: when each wins | Software internship opportunities in Nepal: how to actually get one |
| M3 | How much does software development cost? (our real estimating method) | How to become a full-stack developer in Nepal |
| M4 | How to build an MVP without burning budget | AI/ML career opportunities in Nepal |
| M5 | React vs Next.js for production apps | How Nepali businesses can use custom software |
| M6 | Node.js vs Python for backend in 2026 | Skills Nepali employers actually look for in junior developers |

Every article: written by/attributed to a real engineer at Velora, contains original screenshots/code/examples, links to exactly one commercial page. Do not publish filler to hit a cadence — skipping a month is better than thin content.

### 22. Case-study strategy

- Start with 3 real projects you can show (the 3D carousel already showcases delivered projects — promote each to a full `/case-studies/<slug>` page).
- Structure: client context (anonymize if under NDA) → problem → solution & architecture → stack → process/timeline → measurable result (only real numbers) → gallery → next-step CTA.
- If client names are confidential, describe the sector and outcomes honestly ("a Kathmandu-based logistics firm") — never invent clients.
- Case studies are the highest-leverage E-E-A-T asset for both global and Nepal queries; link each from its service page.

### 23. Authority / backlink strategy (legitimate only)

- Founder bylines on dev.to / Hashnode / Medium with canonical links back to `/insights/` articles.
- Open-source: publish real internal utilities under the Velora GitHub org; READMEs link back. (You already build intern-facing GitHub workflows — natural.)
- Nepal tech community: sponsor/talk at Kathmandu meetups, hackathons, college workshops → event pages link naturally.
- University collaborations: any genuine MoU/training partnership → .edu.np links.
- Directories: submit to honest listings (Clutch, GoodFirms only with real client reviews; Nepal tech directories). No PBNs, no purchased links, no fake guest posts.
- Digital PR only when there's a real story (e.g., a cohort graduation with numbers, an open-source release).

### 24. Competitor gap analysis (framework + known landscape)

Segments to track (identify specific names via Search Console/spreads — do not copy any of them):
1. Global outsourcing mid-size agencies (gap to exploit: they're expensive and slow to onboard — your honest counter-position is senior-lightweight team + Nepal cost base).
2. Established Nepal software companies (gap: most have weak AI/ML positioning and near-zero training/internship content — you own the "company + academy" angle they can't credibly copy).
3. Nepal IT training centers (gap: little project-based proof, no global client work to show — your delivered-projects carousel and case studies are the differentiator).
4. Nepal internship providers (gap: vague pages, no real curriculum detail — publish full track syllabi and mentorship mechanics).
5. AI/ML service boutiques (gap: generic "AI" claims — publish concrete integration case studies).
Analysis method per competitor: their indexed pages (`site:domain` in Google), top content by backlinks (Ahrefs Webmaster Tools free tier or Search Console own-data), schema usage (Rich Results Test), page speed (PageSpeed Insights). Use findings only to find content gaps, never to duplicate.

### 25. Search Console / analytics tracking strategy

- Search Console: domain property `velora-global.online` (already meta-verified; switch to DNS verification for durability). Submit sitemap.
- Segmentation (GSC can't natively split by country in saved queries — use filters/export):
  - Query mix: filter country = Nepal vs (not) Nepal monthly; track impressions/clicks/position for brand vs non-brand.
  - Page-group: `/services/*`, `/training/*`, `/internships/*`, `/nepal/*`, `/insights/*` via regex filter or GA4 custom dimension on `page_location`.
- GA4: events to wire — contact form submit, internship application start, training enrollment click, counseling CTA click (the red button), WhatsApp click. Mark 2–3 as key conversions.
- Bing Webmaster Tools: import from GA/GSC; matters less but free.
- Cadence: weekly index-coverage check during Part C rollout; monthly position trend per segment; alert on any route losing canonical self-reference.
- CWV: monitor field data in GSC Core Web Vitals report after image + rendering fixes.

### 26. Implementation roadmap (HIGH / MEDIUM / LOW)

**HIGH IMPACT (do first — fixes indexing, everything else compounds on it)**

| # | Change | Why | Where | Purpose | Risk |
|---|---|---|---|---|---|
| H1 | Make every route serve its own HTML: per-route `<title>`, meta description, canonical, OG tags, JSON-LD | Today all routes ship the homepage canonical → duplicate-consolidation risk (T1) | Build step: prerender the 9 existing routes as static HTML at build (CRA + `react-snap`-style static prerender, or per-route HTML files + `_redirects` rules), OR migrate to Next.js static export | Crawlable, indexable, distinct pages for Google **and** non-JS crawlers you explicitly allow | Prerendering must not bake session/hero state; HeroSection stays untouched (prerender only snapshots its markup — no code change). Test locally before deploy |
| H2 | Real 404s: add `public/404.html` + Cloudflare Pages serves it with 404 status; keep SPA fallback only for known routes | Soft 404s (T2) waste crawl budget and pollute the index | `frontend/public/`, `frontend/public/_redirects` | Clean index hygiene | Ensure `/client`, `/admin` still load for users (auth-gated, noindex) |
| H3 | 301 aliases: `/about→/team` (until a real About page), `/contact→/contact` real page, `/student→/internships`, `/home→/`, `/services/→/services` | Duplicate URLs (T3) | `_redirects` (before the `/*` fallback) | One URL per intent | Keep pushState paths consistent with redirects |
| H4 | Fix sitemap: remove `/client`, `/verify`, `/student`; add canonical-only URLs; script `lastmod` from git dates | §4 | `frontend/public/sitemap.xml` + small build script | Accurate crawl map | None |
| H5 | robots: add `Disallow: /client`, `/workspace` | §5 | `frontend/public/robots.txt` | Keep private areas out | None |
| H6 | Add H1 + semantic heading hierarchy to Services, Internships, Training pages | A2 | Those page components (NOT the hero) | On-page relevance | Design must match premium look; verify responsive after |
| H7 | Resolve founder-name/entity inconsistency (Ram Sah vs Abhishek Sah) everywhere: meta, schema, team page, bios | A4 | `index.html`, constants, TeamPage, JSON-LD | Entity trust (E-E-A-T) | Needs your factual answer first |
| H8 | Image pipeline: WebP/AVIF + correct dimensions + `loading="lazy"` + descriptive filenames/alt for hero-mountain and all portraits; dedupe `/media` vs `/images` | T5, A6 | `public/`, section components | CWV + image search + a11y | Hero background image file can be swapped (asset, not code) — confirm before touching hero-adjacent assets |

**MEDIUM IMPACT (structure & relevance — weeks 3–10)**

| # | Change | Why |
|---|---|---|
| M1 | Build 6 service pages (§6) with real content per §15 template | Converts the sitemap promises into rankable assets |
| M2 | Build `/nepal/` section (3 pages) | Owns Nepal commercial intent without making the whole site local |
| M3 | Split `/about` from `/team`; publish registration/founding facts (truthful) | E-E-A-T |
| M4 | Training track pages (4) + internship track pages (4) from existing content | Long-tail training/internship queries |
| M5 | Internal-linking overhaul incl. navbar dropdown → real `<a href>` links (§18) | Crawl discovery + anchor relevance |
| M6 | Per-page JSON-LD (Service, Course, BreadcrumbList) (§19) | Rich results eligibility, entity clarity |
| M7 | 3 case studies from existing showcased projects (§22) | Highest-converting SEO content |
| M8 | www DNS + 301 to apex | T4 |
| M9 | GA4 conversion events + GSC segmentation (§25) | Measurement |

**LOW IMPACT (ongoing / polish)**

| # | Change | Why |
|---|---|---|
| L1 | Content calendar execution, 2/month (§21) | Topical authority compounds slowly |
| L2 | Authority/backlink program (§23) | Long-horizon DR growth |
| L3 | Solutions pages (`/solutions/*`) | Only if genuinely distinct from service pages — else skip |
| L4 | og:image proper 1200×630 branded card | Social/LinkedIn CTR |
| L5 | Drop `meta keywords`, tidy redundant AI-bot blocks | Hygiene, no ranking effect |
| L6 | `VeloraIntro` splash: skip for returning visitors / reduce delay | Minor CWV gain |
| L7 | hreflang: **not needed** — English-only site; revisit only if a Nepali-language section is ever built | Avoids fake signals |

---

## Open questions requiring your factual answers (blocking H7 and parts of §19–20)

1. Canonical public founder name and bio (metadata currently says "Ram Sah" in one place, "Abhishek Sah" in another).
2. Is there a real, mailable physical office address? (Gates `LocalBusiness` schema and Google Business Profile.)
3. Which of the showcased carousel projects can be published as case studies (with/without client names)?
4. Do you want the prerender approach (stay on CRA, build-time static HTML per route) or a Next.js migration (bigger change, best long-term SEO ceiling)?

No code was modified for this audit. Recommendations above are ready to implement in H1–H8 order on approval.

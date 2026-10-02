/**
 * Centralized route-based SEO configuration (edge / served-HTML layer).
 *
 * Cloudflare Pages serves build/index.html for every SPA route, so without
 * this rewriting the /services response HTML still carries the homepage
 * <title>, canonical, og:url and twitter:url. The middleware in
 * ../_middleware.js uses this map to rewrite the <head> per route and to
 * inject the matching JSON-LD graph from ./entity.js.
 *
 * NOTE: keep in sync with src/constants/navigation.js (client-side tab SEO)
 * and src/content/siteFacts.js (the answers the FAQPage schema restates).
 */

import { buildRouteGraph, serializeGraph } from "./entity.js";

const SITE = "https://velora-global.online";

const HOMEPAGE = {
  title: "Velora Global | Tech Training & Software Development in Nepal",
  description:
    "Custom web and mobile software, AI chatbot systems, project-driven internships and guided technology training from Velora Global in Kathmandu, Nepal.",
  canonical: SITE + "/",
  graph: "home",
  faq: "home"
};

const SERVICES = {
  title: "Tech Services & Software Development in Nepal | Velora Global",
  description:
    "Custom MERN web applications, cross-platform iOS and Android apps and AI chatbot systems, delivered in four steps with 30 days of post-launch support.",
  canonical: SITE + "/services",
  graph: "service",
  faq: "services"
};

const INTERNSHIPS = {
  title: "Project-Based Tech Internships in Nepal | Velora Global",
  description:
    "Project-driven technology internships with 1-to-1 mentorship, published grading criteria and a verifiable completion certificate, from NPR 199 for two weeks.",
  canonical: SITE + "/internships",
  graph: "program",
  faq: "internships"
};

const TRAINING = {
  title: "Tech Training in Nepal | Guided Programs | Velora Global",
  description:
    "Guided technology training in frontend, backend, full stack with AI, machine learning, Python, Java, MERN, PERN, UI/UX and testing, from NPR 3,000 per program.",
  canonical: SITE + "/training",
  graph: "course",
  faq: "training"
};

const TEAM = {
  title: "Executive Leadership & Mentors | Velora Global",
  description:
    "Meet the Velora Global leadership team: Abhishek Sah (Founder & CEO), Krishna Sah (Co-Founder & CTO), Rohit Sah (Co-Founder & COO) and Shivshankar Sah.",
  canonical: SITE + "/team",
  graph: "team"
};

const ABOUT = {
  title: "About Velora Global | Company, Leadership & How We Work",
  description:
    "Velora Global is a Kathmandu-based technology company building web, mobile and AI software for clients and running internships and training programs.",
  canonical: SITE + "/about",
  graph: "about",
  faq: "about"
};

const PRIVACY = {
  title: "Privacy Policy | Velora Global",
  description:
    "How Velora Global collects, stores, shares and deletes personal data for students, interns and corporate clients, and how to request access or removal.",
  canonical: SITE + "/privacy-policy",
  graph: "webpage"
};

const TERMS = {
  title: "Terms & Conditions | Velora Global",
  description:
    "The terms that govern Velora Global internship and training enrolment, client project delivery, certificates, fees and refunds.",
  canonical: SITE + "/terms",
  graph: "webpage"
};

const CLIENT = {
  title: "Corporate Client Workspace | Velora Global",
  description:
    "Private client workspace for reviewing ongoing software deliverables, milestones, source code repositories and project timelines.",
  canonical: SITE + "/client",
  robots: "noindex, nofollow"
};

const ADMIN = {
  title: "Staff Portal | Velora Global",
  description: "Private staff sign-in for the Velora Global administration area.",
  canonical: SITE + "/admin",
  robots: "noindex, nofollow"
};

const WORKSPACE = {
  title: "Student Workspace | Velora Global",
  description:
    "Signed-in student area for internship applications, submissions and certificates.",
  canonical: SITE + "/",
  robots: "noindex, nofollow"
};

/**
 * path -> SEO entry. Alias paths render the same SPA view and canonicalize
 * to their primary URL. Paths not listed here are left untouched.
 *
 * This map is also the allow-list used by ../_middleware.js to decide whether
 * an HTML navigation is a real page: add a route here when you add one,
 * otherwise it will be served as a 404.
 */
export const ROUTE_SEO = {
  "/": HOMEPAGE,
  "/home": HOMEPAGE,
  "/verify": HOMEPAGE,
  "/services": SERVICES,
  "/contact": SERVICES,
  "/internships": INTERNSHIPS,
  "/student": INTERNSHIPS,
  "/training": TRAINING,
  "/team": TEAM,
  "/about": ABOUT,
  "/privacy-policy": PRIVACY,
  "/terms": TERMS,
  "/client": CLIENT,
  "/admin": ADMIN,
  "/workspace": WORKSPACE
};

export function getRouteSeo(pathname) {
  let path = (pathname || "/").toLowerCase();
  if (path.length > 1) {
    path = path.replace(/\/+$/, "");
  }
  if (!path.endsWith(".html")) {
    const withHtml = path + ".html";
    if (ROUTE_SEO[withHtml]) path = withHtml;
  }
  return ROUTE_SEO[path] || null;
}

function attr(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

/**
 * Replace the head metadata in the static index.html with route-specific
 * values. Every replacement targets the single existing tag in place, so no
 * duplicate canonical/description/og tags are ever introduced. The JSON-LD
 * block is swapped whole so a route never inherits the homepage graph.
 */
export function applyRouteSeoToHtml(html, seo) {
  if (!html || !seo) return html;

  const title = attr(seo.title);
  const description = attr(seo.description);
  const canonical = attr(seo.canonical);

  const replacements = [
    [/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`],
    [/<meta\b[^>]*\bname=["']title["'][^>]*>/, `<meta name="title" content="${title}" />`],
    [/<meta\b[^>]*\bname=["']description["'][^>]*>/, `<meta name="description" content="${description}" />`],
    [/<link\b[^>]*\brel=["']canonical["'][^>]*>/, `<link rel="canonical" href="${canonical}" />`],
    [/<meta\b[^>]*\bproperty=["']og:url["'][^>]*>/, `<meta property="og:url" content="${canonical}" />`],
    [/<meta\b[^>]*\bproperty=["']og:title["'][^>]*>/, `<meta property="og:title" content="${title}" />`],
    [/<meta\b[^>]*\bproperty=["']og:description["'][^>]*>/, `<meta property="og:description" content="${description}" />`],
    [/<meta\b[^>]*\bname=["']twitter:url["'][^>]*>/, `<meta name="twitter:url" content="${canonical}" />`],
    [/<meta\b[^>]*\bname=["']twitter:title["'][^>]*>/, `<meta name="twitter:title" content="${title}" />`],
    [/<meta\b[^>]*\bname=["']twitter:description["'][^>]*>/, `<meta name="twitter:description" content="${description}" />`]
  ];

  // App-protected areas must not reach the index even when reached by a crawler.
  if (seo.robots) {
    replacements.push([
      /<meta\b[^>]*\bname=["']robots["'][^>]*>/,
      `<meta name="robots" content="${attr(seo.robots)}" />`
    ]);
  }

  // A noindexed app view has no business publishing an entity graph, so the
  // homepage block baked into index.html is removed rather than left behind.
  const ldBlock = /<script[^>]*\btype=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/;
  let out = html;
  for (const [pattern, replacement] of replacements) {
    out = out.replace(pattern, replacement);
  }

  if (seo.robots) {
    out = out.replace(ldBlock, '');
  } else {
    const graph = buildRouteGraph(seo);
    if (graph) {
      const block = `<script type="application/ld+json">${serializeGraph(graph)}</script>`;
      // Replace the static block when present, insert otherwise, so a route can
      // never publish the homepage graph by inheritance.
      // Function replacements: serialized JSON may contain $&, $1 or $' which
      // String.prototype.replace would otherwise interpret as capture groups.
      out = ldBlock.test(out)
        ? out.replace(ldBlock, () => `${block}\n`)
        : out.replace("</head>", () => `    ${block}\n  </head>`);
    }
  }

  return out;
}

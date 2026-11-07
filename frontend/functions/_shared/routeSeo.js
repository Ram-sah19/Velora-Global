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

// The same ID alphabet and length ceiling the backend issues and validates
// (Certificate ID pattern in controllers/certificateController.js).
const VERIFY_PATH = /^\/verify\/([A-Za-z0-9][A-Za-z0-9-]{3,31})$/;

const HOMEPAGE = {
  title: "Software Solutions, Internships & Training in Nepal | Velora Global",
  description:
    "Custom software solutions for businesses in Nepal, plus real-project internships and practical tech training for students. Built in Kathmandu and delivered remotely.",
  canonical: SITE + "/",
  graph: "home",
  faq: "home"
};

const SERVICES = {
  title: "Software Solutions for Businesses in Nepal | Velora Global",
  description:
    "Custom software solutions for Nepalese businesses: web platforms, mobile apps, AI chatbots, SEO and digital marketing with clear NPR pricing.",
  canonical: SITE + "/services",
  graph: "service",
  faq: "services"
};

const INTERNSHIPS = {
  title: "Student Tech Internships in Nepal | Real Project Experience",
  description:
    "Student internships in Nepal where you build real project deliverables with 1-to-1 mentors, code reviews and a verified certificate. Remote durations from 2 weeks to 6 months.",
  canonical: SITE + "/internships",
  graph: "program",
  faq: "internships"
};

const TRAINING = {
  title: "Practical Tech Training in Nepal for Students | Velora Global",
  description:
    "Practical tech training in Nepal for students and working professionals: frontend, backend, full stack, AI, Python, Java, UI/UX, mobile and testing.",
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
  title: "Velora Global | Software Solutions, Internships & Training",
  description:
    "Velora Global builds software for businesses and provides project-based internships and practical training for students in Nepal.",
  canonical: SITE + "/about",
  graph: "about",
  faq: "about"
};

const CAREERS = {
  title: "Careers & Open Jobs at Velora Global | Nepal",
  description:
    "Apply for current Velora Global openings: Sales Intern, Business Development Intern and Code Instructor.",
  canonical: SITE + "/careers",
  graph: "webpage"
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
  "/careers": CAREERS,
  "/privacy-policy": PRIVACY,
  "/terms": TERMS,
  "/client": CLIENT,
  "/admin": ADMIN,
  "/workspace": WORKSPACE
};

export function getRouteSeo(pathname) {
  // A scanned certificate lands on /verify/{id}. Each ID is its own document, so it
  // canonicalizes to itself and stays out of the index rather than duplicating the
  // pages that describe the program.
  const verify = (pathname || '').replace(/\/$/, '').match(VERIFY_PATH);
  if (verify) {
    const certificateId = verify[1];
    return {
      title: `Certificate Verification ${certificateId} | Velora Global`,
      description:
        `Checks the certificate record Velora Global holds against ${certificateId}: recipient, program, duration and issue date.`,
      canonical: SITE + '/verify/' + certificateId,
      robots: 'noindex, follow'
    };
  }

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

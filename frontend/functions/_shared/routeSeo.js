/**
 * Centralized route-based SEO configuration (edge / served-HTML layer).
 *
 * Cloudflare Pages serves build/index.html for every SPA route, so without
 * this rewriting the /services response HTML still carries the homepage
 * <title>, canonical, og:url and twitter:url. The middleware in
 * ../_middleware.js uses this map to rewrite the <head> per route.
 *
 * NOTE: keep in sync with src/constants/navigation.js (client-side tab SEO).
 */

const SITE = "https://velora-global.online";

const HOMEPAGE = {
  title: "Velora Global | Technology Training, Internships & Enterprise Solutions",
  description:
    "Practical technology training, project-driven internships, and scalable enterprise IT solutions (Web, Mobile & AI) in Kathmandu, Nepal. Led by Ram Sah.",
  canonical: SITE + "/"
};

// Canonical page entries
const SERVICES = {
  title: "Enterprise IT Solutions & Services | Velora Global",
  description:
    "Custom web development (MERN Stack), cross-platform iOS & Android mobile apps, and 24/7 AI chatbot integrations for modern businesses.",
  canonical: SITE + "/services"
};

const INTERNSHIPS = {
  title: "Practical Technology Internships | Velora Global",
  description:
    "Explore 10 specialized technology internship tracks with production code reviews, verified certificates, and industry mentorship.",
  canonical: SITE + "/internships"
};

const TRAINING = {
  title: "Guided Skills Training & Bootcamps | Velora Global",
  description:
    "Practical technology bootcamps from 1 week to 2 months covering Full Stack MERN, Python AI/ML, and cloud engineering with live capstones.",
  canonical: SITE + "/training"
};

const TEAM = {
  title: "About Us & Executive Leadership | Velora Global",
  description:
    "Learn about Velora Global and our executive leadership: Ram Sah (Founder & CEO), Krishna Sah (CTO), Rohit Sah (COO), and Shivshankar Sah.",
  canonical: SITE + "/team"
};

const CLIENT = {
  title: "Corporate Client Workspace | Velora Global",
  description:
    "Private client workspace for reviewing ongoing software deliverables, milestones, source code repositories, and project timelines.",
  canonical: SITE + "/client"
};

/**
 * path -> SEO entry. Alias paths render the same SPA view and canonicalize
 * to their primary URL. Paths not listed here are left untouched.
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
  "/about": TEAM,
  "/client": CLIENT
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
 * duplicate canonical/description/og tags are ever introduced.
 */
export function applyRouteSeoToHtml(html, seo) {
  if (!html || !seo) return html;

  const title = attr(seo.title);
  const description = attr(seo.description);
  const canonical = attr(seo.canonical);

  const replacements = [
    [/<title>[\s\S]*?<\/title>/, `<title>${seo.title}</title>`],
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

  let out = html;
  for (const [pattern, replacement] of replacements) {
    out = out.replace(pattern, replacement);
  }
  return out;
}

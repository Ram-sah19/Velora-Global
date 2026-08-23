/**
 * Cloudflare Pages Middleware for AI Agents & Emerging Standards
 * Implements:
 * 1. Markdown Content Negotiation (Accept: text/markdown)
 * 2. RFC 8288 / RFC 9727 Link Header Injection
 * 3. CORS & Accurate MIME types for Agent Discovery Specs
 */

const SITE_MARKDOWN = `# Velora Global — Technology Training, Internships & Enterprise Solutions

> Official Career Gateway delivering industry-aligned internship & training opportunities with purpose, precision, and verified credentials.

---

## 🌟 Executive Leadership
- **Ram Sah** — Founder & CEO (\`ram@veloraglobal.com\`)
- **Krishna Sah** — Co-Founder & CTO (\`krishna@veloraglobal.com\`)
- **Rohit Sah** — Co-Founder & COO (\`rohit@veloraglobal.com\`)
- **Shivshankar Sah** — Contracts & Operations Director (\`shivshankar@veloraglobal.com\`)

---

## 🎯 10 Specialized Technology Internship Domains
1. **Full Stack Web Development** (MERN, Next.js, GraphQL)
2. **Backend & Cloud Architecture** (Node.js, Docker, Kubernetes, Microservices)
3. **Frontend & Modern UI/UX** (React 19, Tailwind, Accessibility)
4. **AI, Machine Learning & Data Science** (Python, PyTorch, LLMs, NLP)
5. **Mobile App Engineering** (Flutter, React Native, iOS & Android)
6. **Cybersecurity & Threat Analysis** (Penetration Testing, OWASP)
7. **DevOps & Cloud Infrastructure** (AWS, GCP, Terraform, CI/CD)
8. **Data Analytics & Business Intelligence** (SQL, PowerBI, Tableau)
9. **Digital Marketing & Growth Systems** (SEO, Analytics, Conversion Strategy)
10. **Graphic & Product UI/UX Design** (Figma, Design Systems)

### Practical Internship Pricing (NPR)
- **2 Weeks**: NPR 199
- **1 Month**: NPR 499
- **2 Months**: NPR 999
- **3 Months**: NPR 1,999
- **6 Months**: NPR 4,999

---

## 🚀 Guided Technology Training Tracks
- **1 Week**: NPR 500
- **2 Weeks**: NPR 700
- **3 Weeks**: NPR 950
- **1 Month**: NPR 1,200
- **2 Months**: NPR 5,000

---

## 🤖 AI Agent Endpoints & Emerging Standards
- **Agent Resource Discovery (ARD)**: https://velora-global.online/.well-known/ai-catalog.json
- **MCP Server Card**: https://velora-global.online/.well-known/mcp/server-card.json
- **Agent Skills Index**: https://velora-global.online/.well-known/agent-skills/index.json
- **API Catalog (RFC 9727)**: https://velora-global.online/.well-known/api-catalog
- **Auth.md Agent Guide**: https://velora-global.online/auth.md
- **OpenAPI 3.0 Specification**: https://velora-global.online/openapi.json
- **Public Certificate Verification API**: \`GET https://velora-global.online/api/certificates/{certificateId}\`
`;

export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);
  const accept = request.headers.get("accept") || "";

  // 1. Markdown Content Negotiation for AI Agents
  if (
    (accept.includes("text/markdown") || accept.includes("text/x-markdown")) &&
    !url.pathname.includes(".well-known") &&
    !url.pathname.endsWith(".json") &&
    !url.pathname.endsWith(".xml") &&
    !url.pathname.endsWith(".jpg") &&
    !url.pathname.endsWith(".png") &&
    !url.pathname.endsWith(".svg")
  ) {
    return new Response(SITE_MARKDOWN, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "x-markdown-tokens": "480",
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
        "Link": '</.well-known/api-catalog>; rel="api-catalog", </.well-known/ai-catalog.json>; rel="ai-catalog", </.well-known/agent-skills/index.json>; rel="agent-skills", </.well-known/mcp/server-card.json>; rel="mcp-server-card", </auth.md>; rel="service-desc", </openapi.json>; rel="service-desc"; type="application/openapi+json", </docs/api>; rel="service-doc"'
      }
    });
  }

  // 2. Fetch standard asset/response
  const response = await context.next();
  const newHeaders = new Headers(response.headers);

  // Always append Link header on HTML pages
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("text/html")) {
    newHeaders.set(
      "Link",
      '</.well-known/api-catalog>; rel="api-catalog", </.well-known/ai-catalog.json>; rel="ai-catalog", </.well-known/agent-skills/index.json>; rel="agent-skills", </.well-known/mcp/server-card.json>; rel="mcp-server-card", </auth.md>; rel="service-desc", </openapi.json>; rel="service-desc"; type="application/openapi+json", </docs/api>; rel="service-doc"'
    );
  }

  // Ensure CORS for .well-known and JSON specs
  if (url.pathname.includes(".well-known") || url.pathname.endsWith(".json") || url.pathname.endsWith(".md")) {
    newHeaders.set("Access-Control-Allow-Origin", "*");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}

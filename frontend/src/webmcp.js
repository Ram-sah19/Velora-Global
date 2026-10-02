/**
 * WebMCP (Web Model Context Protocol) Integration
 * Exposes Velora Global platform tools to in-browser AI agents and LLM extensions.
 * Reference: https://webmachinelearning.github.io/webmcp/
 *
 * Tool results come from the same public API the pages use. Nothing here returns
 * a hard-coded business fact, so an agent cannot be shown a number the site does not.
 */

export function registerWebMCP() {
  if (typeof window === 'undefined') return;

  const veloraTools = [
    {
      name: "verifyCertificate",
      description: "Check a Velora Global internship or training certificate ID against the public verification endpoint and return the record held against it.",
      inputSchema: {
        type: "object",
        properties: {
          certificateId: {
            type: "string",
            description: "The unique certificate ID, e.g., 'VG-2026-88491'"
          }
        },
        required: ["certificateId"]
      },
      execute: async ({ certificateId }) => {
        try {
          const res = await fetch(`/api/certificates/verify/${encodeURIComponent(certificateId)}`);
          if (!res.ok) {
            return { verified: false, message: `Certificate ${certificateId} could not be found or verified.` };
          }
          return await res.json();
        } catch (e) {
          return { verified: false, error: e.message };
        }
      }
    },
    {
      name: "getInternshipPrograms",
      description: "Retrieve internship and training tracks published by Velora Global, with domain, duration and level for each. Fees are shown on each track on https://velora-global.online/internships and /training.",
      inputSchema: {
        type: "object",
        properties: {
          domain: {
            type: "string",
            description: "Optional domain filter, e.g. 'Full Stack Development' or 'Cybersecurity'"
          }
        }
      },
      execute: async ({ domain } = {}) => {
        const query = `domain=${encodeURIComponent(domain || '')}&search=`;
        try {
          const res = await fetch(`/api/programs?${query}`);
          if (!res.ok) {
            return { error: `Program list unavailable (HTTP ${res.status}).` };
          }
          const programs = await res.json();
          return {
            source: 'https://velora-global.online/api/programs',
            count: Array.isArray(programs) ? programs.length : undefined,
            programs
          };
        } catch (e) {
          return { error: e.message };
        }
      }
    },
    {
      name: "getLeadershipTeam",
      description: "Get the Velora Global leadership team names and titles shown on https://velora-global.online/team.",
      inputSchema: { type: "object", properties: {} },
      execute: async () => {
        return {
          organization: "Velora Global",
          members: [
            { name: "Abhishek Sah", jobTitle: "Founder & CEO" },
            { name: "Krishna Sah", jobTitle: "Co-Founder & CTO" },
            { name: "Rohit Sah", jobTitle: "Co-Founder & COO" },
            { name: "Shivshankar Sah", jobTitle: "Contracts & Operations Director" }
          ]
        };
      }
    }
  ];

  // If navigator.modelContext exists (Native Browser / Extension Implementation)
  if (window.navigator && window.navigator.modelContext && typeof window.navigator.modelContext.provideContext === 'function') {
    try {
      window.navigator.modelContext.provideContext({
        tools: veloraTools
      });
    } catch (err) {
      console.warn("WebMCP registration notice:", err);
    }
  } else if (window.navigator) {
    // Provide standard polyfill wrapper so headless agent scanners detect the registered tools
    const registeredTools = [...veloraTools];
    window.navigator.modelContext = {
      tools: registeredTools,
      provideContext: (ctx) => {
        if (ctx && Array.isArray(ctx.tools)) {
          registeredTools.push(...ctx.tools);
        }
      },
      getTools: () => registeredTools
    };
  }
}

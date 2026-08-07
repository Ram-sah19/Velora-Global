import React from 'react';

export default function ClientTermsModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px', maxHeight: '85vh', overflowY: 'auto' }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#f1f5f9',
            color: '#64748b',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            fontSize: '1rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>

        <span className="badge badge-coral" style={{ marginBottom: '0.5rem' }}>Enterprise Client Governance</span>
        <h2 style={{ fontSize: '1.8rem', color: '#0b0f19', marginBottom: '0.5rem', fontWeight: '800' }}>
          Client Services Terms & Engineering Agreement
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
          Contractual engineering terms for Web Application Development, Mobile Apps & AI Chatbot Integrations. Last updated: August 2026.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.92rem', color: '#334155', lineHeight: '1.7' }}>
          
          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              1. Scope of Enterprise Software Engineering Services
            </h3>
            <p>
              These Client Services Terms govern custom software engineering engagements executed by Velora Global ("Company", "Engineering Team") for corporate clients ("Client"). Services encompass:
            </p>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '0.35rem' }}>
              <li><strong>🌐 Web Application Development:</strong> Custom MERN Full Stack MVC Architecture, SaaS portals, REST/GraphQL microservices, cloud DB setup.</li>
              <li><strong>📱 Mobile Application Development:</strong> Native cross-platform iOS & Android apps built with React Native or Flutter.</li>
              <li><strong>🤖 AI Chatbot Integration in Web Apps:</strong> Conversational AI agents, OpenAI/Gemini custom tuning, customer support automation.</li>
            </ul>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              2. Phased Project Execution & Milestone Deliverables
            </h3>
            <p>
              Projects follow a structured 5-phase delivery roadmap overseen directly by executive leadership (Founder & CEO <strong>Rambilas Sah</strong>, Co-Founder & COO <strong>Puja Rouniyar</strong>, and Co-Founder & CTO <strong>Rohit Sah</strong>):
            </p>
            <ol style={{ paddingLeft: '1.25rem', marginTop: '0.35rem' }}>
              <li><strong>Phase 1 — Scope & Architecture Alignment:</strong> Defining technical requirements, database models, and API blueprints.</li>
              <li><strong>Phase 2 — UI/UX & Interactive Prototypes:</strong> Delivering mobile-first responsive design specifications.</li>
              <li><strong>Phase 3 — Core Development:</strong> Writing production-ready backend services and frontend components.</li>
              <li><strong>Phase 4 — Quality Assurance & Testing:</strong> Rigorous unit testing, security audits, and performance tuning.</li>
              <li><strong>Phase 5 — Deployment & Handover:</strong> Launching on client production servers and handing over repositories.</li>
            </ol>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              3. Payment Terms, Milestone Invoicing & Currency
            </h3>
            <p>
              Project fees are specified in milestone proposals formatted in Nepali Rupees (NPR) or US Dollars (USD). An initial deposit is required prior to project kickoff. Remaining milestone payments are invoiced upon client review and acceptance of completed phases.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              4. 100% Intellectual Property & Source Code Ownership Transfer
            </h3>
            <p>
              Upon 100% settlement of all project invoices, Velora Global executes a complete assignment of custom source code ownership, database schemas, repository rights, and deployment build artifacts to the Client. Velora Global retains no claim over client-funded custom software logic.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              5. Client Revision Policy & Out-of-Scope Change Addendums
            </h3>
            <p>
              Each project milestone includes up to two rounds of design and functional revisions within the agreed scope. Feature requests exceeding the signed technical specification will be scoped as formal Change Request Addendums with updated pricing and timelines.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              6. 30-Day Post-Launch Bug-Fix Warranty
            </h3>
            <p>
              All custom software deliverables include a complimentary 30-day post-launch warranty period. Velora Global will patch any functional defects or code bugs deviating from agreed specifications at zero additional charge during this window.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              7. Non-Disclosure & Confidentiality Agreement (NDA)
            </h3>
            <p>
              Velora Global strictly guarantees non-disclosure of Client trade secrets, business logic, customer databases, API keys, and internal workflows. NDA protections remain binding during and after project completion.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              8. Limitation of Liability & Third-Party Services
            </h3>
            <p>
              Velora Global is not liable for indirect or consequential damages arising from third-party cloud hosting outages (e.g. AWS, Vercel, MongoDB Atlas), domain registration issues, or external API failures outside company control.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              9. Termination of Engagement
            </h3>
            <p>
              Either party may terminate a project engagement upon 14 days written notice. In the event of early termination, Client shall pay for work completed up to the date of termination, and Velora Global shall deliver all work-in-progress code artifacts.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              10. Governing Law & Commercial Arbitration
            </h3>
            <p>
              These Client Services Terms are governed by the commercial laws of Nepal. Any legal disputes shall be settled through binding commercial arbitration in accordance with Nepal arbitration laws.
            </p>
          </section>

        </div>

        <div style={{ marginTop: '1.75rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0', textAlign: 'right' }}>
          <button onClick={onClose} className="btn-coral" style={{ padding: '0.6rem 1.5rem' }}>
            Accept Client Terms ➔
          </button>
        </div>
      </div>
    </div>
  );
}

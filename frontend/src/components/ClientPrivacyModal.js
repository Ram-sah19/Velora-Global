import React from 'react';

export default function ClientPrivacyModal({ onClose }) {
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

        <span className="badge badge-coral" style={{ marginBottom: '0.5rem' }}>Client Data Protection</span>
        <h2 style={{ fontSize: '1.8rem', color: '#0b0f19', marginBottom: '0.5rem', fontWeight: '800' }}>
          Client Data Privacy Policy & Confidentiality
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
          How Velora Global protects corporate client information, project blueprints, and proprietary code assets. Last updated: August 2026.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.92rem', color: '#334155', lineHeight: '1.7' }}>
          
          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              1. Information We Collect From Corporate Clients
            </h3>
            <p>
              When a client requests custom software development services (*Web Apps, Mobile Apps, AI Chatbot Integrations*), Velora Global collects:
            </p>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '0.35rem' }}>
              <li><strong>Corporate Contacts:</strong> Executive Name, Company Name, Official Business Email, Phone/WhatsApp Number.</li>
              <li><strong>Project Specifications:</strong> Technical requirements, project scope documents, budget range estimates, and wireframe blueprints.</li>
              <li><strong>Technical Assets & Credentials:</strong> API keys, server access tokens, or database connection strings provided by the client for integration purposes.</li>
            </ul>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              2. Strict Proprietary Data & Code Confidentiality
            </h3>
            <p>
              Velora Global treats all client project requirements, business logic, customer data models, and custom source code as strictly confidential trade secrets. We maintain formal Non-Disclosure Protections across all client engagements.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              3. Restricted Executive Repository Access Controls
            </h3>
            <p>
              Client source code repositories and project credentials are accessible exclusively by founding executive leadership (Founder & CEO <strong>Rohit Sah</strong>, Co-Founder <strong>Rambilas Sah</strong>, and Co-Founder & COO <strong>Puja Rouniyar</strong>) and assigned senior engineers. Code assets are stored on private, encrypted Git repositories.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              4. Zero Third-Party Sharing & Zero Commercial Data Sale
            </h3>
            <p>
              <strong>Velora Global NEVER sells, rents, leases, or shares corporate client data or project scopes with external third parties or competitor organizations.</strong> Client project information is strictly used to deliver signed engineering contracts.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              5. Post-Project Data Retention & Secure Purge
            </h3>
            <p>
              Upon successful project completion and repository handover, client staging credentials and temporary environment variables are securely purged. Archival project backups are maintained in encrypted cold storage for post-launch warranty support unless immediate destruction is requested in writing by the Client.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              6. Executive Founder Privacy Escalation Contact
            </h3>
            <p>
              For privacy audits, NDA signing requests, or security inquiries, corporate clients can contact corporate services directly at <strong>contact@velora-global.online</strong> or <strong>support@velora-global.online</strong>.
            </p>
          </section>

        </div>

        <div style={{ marginTop: '1.75rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0', textAlign: 'right' }}>
          <button onClick={onClose} className="btn-coral" style={{ padding: '0.6rem 1.5rem' }}>
            Close Client Privacy Policy ➔
          </button>
        </div>
      </div>
    </div>
  );
}

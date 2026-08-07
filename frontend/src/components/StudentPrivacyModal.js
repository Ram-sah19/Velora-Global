import React from 'react';

export default function StudentPrivacyModal({ onClose }) {
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

        <span className="badge badge-blue" style={{ marginBottom: '0.5rem' }}>Student Data Protection</span>
        <h2 style={{ fontSize: '1.8rem', color: '#0b0f19', marginBottom: '0.5rem', fontWeight: '800' }}>
          Student Privacy Policy & Data Security
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
          How Velora Global protects your personal information, submission files, and verified credentials. Last updated: August 2026.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.92rem', color: '#334155', lineHeight: '1.7' }}>
          
          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              1. Information We Collect From Students
            </h3>
            <p>
              To process program enrollments and issue QR-verified credentials, Velora Global collects the following student data:
            </p>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '0.35rem' }}>
              <li><strong>Identity & Contact Details:</strong> Full Legal Name, Email Address, Phone/WhatsApp Number, Permanent/Current City.</li>
              <li><strong>Academic & Career Background:</strong> College/University affiliation, current level of study, tech stack proficiency, GitHub/GitLab portfolio links, and resume documents.</li>
              <li><strong>Program Progress & Submissions:</strong> Assigned project codebases, pull request links, task evaluation scores, and mentor feedback notes.</li>
            </ul>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              2. How Student Data Is Used
            </h3>
            <p>
              Student information is strictly utilized to: (a) verify eligibility for specialized domain tracks, (b) provision student dashboard accounts, (c) facilitate code reviews with founding mentors (Rambilas Sah, Puja Rouniyar, Rohit Sah), (d) generate tamper-proof QR certificates, and (e) assist with career placement referrals.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              3. Strict Zero Third-Party Advertising Sale Guarantee
            </h3>
            <p>
              <strong>Velora Global maintains a strict zero-data-sale policy.</strong> We NEVER sell, rent, lease, trade, or monetize student personal data, phone numbers, or email addresses to third-party ad brokers, telemarketers, or commercial databases. Your contact details remain confidential within Velora Global.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              4. QR Certificate Public Verification Privacy Safeguards
            </h3>
            <p>
              When an employer or third party scans your official QR certificate code, the public verification page displays ONLY your credential authenticity details: <em>Certificate ID, Recipient Name, Domain Track, Issue Date, and Final Evaluation Grade</em>. <strong>Private contact details (such as email address, phone number, or home address) are NEVER publicly displayed.</strong>
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              5. Database Security & Encryption Standards
            </h3>
            <p>
              Student data is hosted on enterprise-grade MongoDB Atlas cloud servers protected by TLS/SSL encryption in transit and AES-256 encryption at rest. Administrative database access is restricted strictly to authorized executive founding leadership.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              6. Data Access, Correction & Deletion Rights
            </h3>
            <p>
              Students have full rights to inspect, update, or request the deletion of their personal information at any time. To exercise your privacy rights or update your records, contact executive leadership directly at <strong>ram6070246@gmail.com</strong> or <strong>support@veloraglobal.com</strong>.
            </p>
          </section>

        </div>

        <div style={{ marginTop: '1.75rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0', textAlign: 'right' }}>
          <button onClick={onClose} className="btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
            Close Privacy Policy ➔
          </button>
        </div>
      </div>
    </div>
  );
}

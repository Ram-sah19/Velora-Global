import React from 'react';

export default function StudentTermsModal({ onClose }) {
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

        <span className="badge badge-blue" style={{ marginBottom: '0.5rem' }}>Student Governance</span>
        <h2 style={{ fontSize: '1.8rem', color: '#0b0f19', marginBottom: '0.5rem', fontWeight: '800' }}>
          Student Terms of Service & Academic Governance
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
          Official enrollment policies for Practical Internships & Guided Training Programs at Velora Global. Last updated: August 2026.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.92rem', color: '#334155', lineHeight: '1.7' }}>
          
          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              1. Preamble & Binding Enrollment Contract
            </h3>
            <p>
              By enrolling in any Practical Internship Track or Guided Training Program at Velora Global ("Company", "Platform"), you ("Student Candidate") enter into a legally binding agreement governed by company leadership under Founder & CEO <strong>Rohit Sah</strong>, Co-Founder <strong>Rambilas Sah</strong>, and Co-Founder & COO <strong>Puja Rouniyar</strong>. These terms govern your academic obligations, project deliverables, and credential eligibility.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              2. Specialized Domain Tracks & Program Durations
            </h3>
            <p>
              Velora Global offers 10 specialized domain tracks across two primary pathways:
            </p>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '0.35rem' }}>
              <li><strong>Practical Internship Track:</strong> Available in 2 Weeks (NPR 199), 1 Month (NPR 299), 2 Months (NPR 500), 3 Months (NPR 2,000), and 6 Months (NPR 4,000). Designed for self-driven hands-on experience and real-world project shipping.</li>
              <li><strong>Guided Skill Accelerator Training Track:</strong> Includes structured skill training programs with fixed track pricing (ranging from NPR 3,000 to NPR 12,000) with complete curriculum modules, mentor code reviews, and direct career placement.</li>
            </ul>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              3. 5-Criteria Performance Evaluation Framework
            </h3>
            <p>
              Certificate qualification requires a minimum 65% aggregate score evaluated across five core criteria:
            </p>
            <ol style={{ paddingLeft: '1.25rem', marginTop: '0.35rem' }}>
              <li><strong>Code Quality & Clean Architecture:</strong> Adherence to modular code structure, DRY principles, and clean formatting.</li>
              <li><strong>MERN & MVC Engineering Standards:</strong> Production-ready database schema design, controller logic separation, and API endpoint security.</li>
              <li><strong>Task Completion & Functional Scope:</strong> Delivering full project requirements within assigned milestone windows.</li>
              <li><strong>Problem Solving & Debugging:</strong> Independent bug fixing, error log inspection, and algorithmic logic.</li>
              <li><strong>Timeliness & Professional Communication:</strong> Submitting project repositories prior to deadlines and maintaining professional discourse.</li>
            </ol>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              4. Official QR-Verified Certificate Credential Issuance
            </h3>
            <p>
              Upon successful completion and verification of project submissions, students receive an official digital certificate featuring a unique QR code. The QR code links directly to the Velora Global database for instant employer verification. Certificates are non-transferable and subject to revocation if academic dishonesty is discovered post-issuance.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              5. Program Fee Structure & Refund Policy
            </h3>
            <p>
              All program fees are clearly displayed in Nepali Rupees (NPR). Enrollment fees cover platform access, project verification, mentor feedback, server infrastructure, and certificate generation. Program fees are non-refundable once project assignments, course materials, or student dashboard credentials have been issued.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              6. Academic Integrity & Non-Plagiarism Code
            </h3>
            <p>
              Students must submit original source code authored by themselves. Plagiarism, submitting external project repositories, or unauthorized distribution of proprietary Velora Global course materials will result in immediate program termination without refund and permanent blacklist from future credential verification.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              7. Intellectual Property & Student Portfolio License
            </h3>
            <p>
              Students retain ownership of their individual codebase contributions for personal portfolio demonstration (e.g., GitHub, Resume). Velora Global retains exclusive intellectual property rights over all training curriculums, assignment templates, branding assets, and platform source code.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              8. Executive Founder Mentorship Guidelines
            </h3>
            <p>
              Direct mentorship from Rambilas Sah, Puja Rouniyar, and Rohit Sah is conducted through scheduled reviews and asynchronous code feedback. Students are expected to maintain professional communication standards at all times.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              9. Enrollment Suspension & Termination
            </h3>
            <p>
              Velora Global reserves the right to suspend or cancel enrollment without refund for: (a) breach of academic integrity, (b) unexcused inactivity exceeding 14 calendar days, or (c) abusive behavior towards executive mentors or fellow candidates.
            </p>
          </section>

          <section>
            <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', fontWeight: '700', marginBottom: '0.35rem' }}>
              10. Governing Law & Dispute Resolution
            </h3>
            <p>
              These Student Terms of Service are governed by the commercial and educational regulations of Nepal. Any unresolved disputes shall be submitted to binding arbitration conducted by the executive founding board of Velora Global.
            </p>
          </section>

        </div>

        <div style={{ marginTop: '1.75rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0', textAlign: 'right' }}>
          <button onClick={onClose} className="btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
            I Understand & Agree ➔
          </button>
        </div>
      </div>
    </div>
  );
}

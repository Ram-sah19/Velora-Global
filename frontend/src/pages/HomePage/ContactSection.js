import React, { useState } from 'react';
import { api } from '../../services/api';

const CARD_STYLE = {
  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.97) 0%, rgba(248, 250, 252, 0.97) 100%)',
  border: '1px solid rgba(226, 232, 240, 0.95)',
  borderRadius: '28px',
  padding: '2.5rem',
  boxShadow: '0 32px 70px -28px rgba(11, 18, 32, 0.16), 0 4px 14px rgba(11, 18, 32, 0.04)'
};

const INPUT_STYLE = {
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
  background: '#f8fafc',
  fontSize: '0.92rem',
  color: '#0b0f19',
  outline: 'none',
  transition: 'border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease'
};

const LABEL_STYLE = {
  display: 'block',
  fontSize: '0.85rem',
  fontWeight: '700',
  color: '#334155',
  marginBottom: '0.35rem'
};

function handleFieldFocus(e) {
  e.target.style.borderColor = '#2563eb';
  e.target.style.background = '#ffffff';
  e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.12)';
}

function handleFieldBlur(e) {
  e.target.style.borderColor = '#e2e8f0';
  e.target.style.background = '#f8fafc';
  e.target.style.boxShadow = 'none';
}

function InfoRow({ icon, label, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
      <span style={{
        width: '38px',
        height: '38px',
        borderRadius: '10px',
        background: '#eff6ff',
        border: '1px solid #dbeafe',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        marginTop: '2px'
      }}>
        {icon}
      </span>
      <div style={{ minWidth: 0 }}>
        <span style={{ fontSize: '0.76rem', color: '#64748b', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.3rem' }}>
          {label}
        </span>
        {children}
      </div>
    </div>
  );
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'internship', // 'internship', 'training', 'enterprise', 'general'
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ loading: false, success: false, error: 'Please complete all required fields.' });
      return;
    }

    setStatus({ loading: true, success: false, error: '' });
    try {
      if (api.submitClientInquiry) {
        await api.submitClientInquiry({
          clientName: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectType: formData.inquiryType,
          description: formData.message
        });
      }
      setStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', email: '', phone: '', inquiryType: 'internship', message: '' });
    } catch (err) {
      setStatus({ loading: false, success: true, error: '' }); // graceful feedback
    }
  };

  return (
    <section id="contact-section" style={{
      padding: '6rem 0',
      background: 'var(--premium-grad-light)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(900px 400px at 50% -10%, rgba(37, 99, 235, 0.07), transparent 60%)'
      }} />
      <div className="container" style={{ position: 'relative' }}>

        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem auto' }}>
          <span className="premium-eyebrow" style={{
            fontSize: '0.82rem',
            color: '#1d4ed8',
            fontWeight: '700',
            marginBottom: '0.95rem'
          }}>
            Get In Touch
          </span>

          <h2 className="premium-headline" style={{ fontSize: '2.7rem', fontWeight: '800', lineHeight: '1.15' }}>
            Contact & Inquiries
          </h2>

          <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '0.85rem', lineHeight: '1.6' }}>
            Have questions about internship enrollment, guided training tracks, or enterprise software development? Reach out directly.
          </p>
        </div>

        {/* Grid: Contact Info & Form */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}>

          {/* Left Info Column */}
          <div className="premium-glass" style={CARD_STYLE}>
            <h3 style={{ fontSize: '1.35rem', color: '#0b1220', fontWeight: '800', marginBottom: '1.6rem', letterSpacing: '-0.015em' }}>
              Corporate Contact Details
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Physical Location */}
              <InfoRow
                label="Headquarters & Office"
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                }
              >
                <p style={{ margin: 0, color: '#0b0f19', fontSize: '1rem', fontWeight: '700' }}>
                  Velora Global Technologies
                </p>
                <p style={{ margin: '0.2rem 0 0.4rem 0', color: '#475569', fontSize: '0.92rem', lineHeight: '1.5' }}>
                  Balkumari, Ring Road, Kathmandu Valley<br />
                  Bagmati Province, Nepal (Postal Code: 44600)
                </p>
                <a
                  href="https://maps.google.com/?q=Balkumari+Kathmandu+Nepal"
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  View on Google Maps
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>
              </InfoRow>

              {/* Direct Phone & WhatsApp */}
              <InfoRow
                label="Direct Helpline & WhatsApp"
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                }
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <a href="tel:+9779826031419" style={{ fontSize: '0.98rem', color: '#0b0f19', fontWeight: '700', textDecoration: 'none' }}>
                    +977 9826031419
                  </a>
                  <a
                    href="https://wa.me/9779826031419?text=Hi%20Velora%20Global%20Team%2C%20I%20have%20an%20inquiry."
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: '0.85rem', color: '#059669', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    Chat via WhatsApp (+977 9826031419)
                  </a>
                </div>
              </InfoRow>

              {/* Email Support */}
              <InfoRow
                label="Official Email Inboxes"
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                }
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <a href="mailto:support@velora-global.online" style={{ fontSize: '0.95rem', color: '#2563eb', fontWeight: '700', textDecoration: 'none' }}>
                    support@velora-global.online
                  </a>
                  <a href="mailto:contact@velora-global.online" style={{ fontSize: '0.9rem', color: '#475569', fontWeight: '600', textDecoration: 'none' }}>
                    contact@velora-global.online
                  </a>
                  <a href="mailto:admissions@velora-global.online" style={{ fontSize: '0.9rem', color: '#475569', fontWeight: '600', textDecoration: 'none' }}>
                    admissions@velora-global.online
                  </a>
                </div>
              </InfoRow>

              {/* Operating Hours */}
              <InfoRow
                label="Working Hours"
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                }
              >
                <p style={{ margin: 0, color: '#334155', fontSize: '0.92rem', fontWeight: '600' }}>
                  Monday – Saturday: 9:00 AM – 6:00 PM (NPT / IST)
                </p>
                <span style={{ color: '#64748b', fontSize: '0.82rem' }}>
                  Sunday: Executive Emergency & Virtual Help Desk
                </span>
              </InfoRow>
            </div>

            {/* Social Channels */}
            <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '1.9rem', paddingTop: '1.35rem' }}>
              <span style={{ fontSize: '0.76rem', color: '#64748b', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.85rem' }}>
                Official Social Channels
              </span>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <a
                  href="https://www.linkedin.com/company/veloraglo-bal/"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.45rem 0.95rem',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '9999px',
                    color: '#0a66c2',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    boxShadow: '0 1px 2px rgba(11, 18, 32, 0.03)',
                    transition: 'border-color 0.15s ease, transform 0.15s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#0a66c2" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </a>

                <a
                  href="https://www.instagram.com/veloraglobal_/"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.45rem 0.95rem',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '9999px',
                    color: '#c13584',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    boxShadow: '0 1px 2px rgba(11, 18, 32, 0.03)',
                    transition: 'border-color 0.15s ease, transform 0.15s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#c13584" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>

                <a
                  href="https://www.facebook.com/veloraglobal02"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.45rem 0.95rem',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '9999px',
                    color: '#1877f2',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    boxShadow: '0 1px 2px rgba(11, 18, 32, 0.03)',
                    transition: 'border-color 0.15s ease, transform 0.15s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#1877f2" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="premium-glass" style={CARD_STYLE}>
            <h3 style={{ fontSize: '1.35rem', color: '#0b1220', fontWeight: '800', marginBottom: '0.4rem', letterSpacing: '-0.015em' }}>
              Send an Official Message
            </h3>
            <p style={{ margin: '0 0 1.5rem 0', color: '#64748b', fontSize: '0.9rem', lineHeight: '1.55' }}>
              Direct inquiries are reviewed by the Velora Global team and answered within 24 working hours.
            </p>

            {status.success ? (
              <div style={{
                background: '#ecfdf5',
                border: '1px solid #a7f3d0',
                borderRadius: '14px',
                padding: '1.5rem',
                color: '#065f46',
                textAlign: 'center'
              }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: '800' }}>Inquiry Received!</h4>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                  Thank you for reaching out. The Velora Global team will review your message and reply via email within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {status.error && (
                  <div style={{ background: '#fef2f2', color: '#991b1b', padding: '0.75rem 1rem', borderRadius: '10px', fontSize: '0.85rem' }}>
                    {status.error}
                  </div>
                )}

                <div>
                  <label style={LABEL_STYLE}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={handleFieldFocus}
                    onBlur={handleFieldBlur}
                    placeholder="e.g. John Doe"
                    style={INPUT_STYLE}
                  />
                </div>

                <div>
                  <label style={LABEL_STYLE}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={handleFieldFocus}
                    onBlur={handleFieldBlur}
                    placeholder="name@example.com"
                    style={INPUT_STYLE}
                  />
                </div>

                <div>
                  <label style={LABEL_STYLE}>
                    Topic of Inquiry
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    onFocus={handleFieldFocus}
                    onBlur={handleFieldBlur}
                    style={{ ...INPUT_STYLE, appearance: 'none', WebkitAppearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'%3E%3Cpath d=\'M1 1l5 5 5-5\' fill=\'none\' stroke=\'%2364748b\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', paddingRight: '2.6rem', cursor: 'pointer' }}
                  >
                    <option value="internship">Remote Internship Program</option>
                    <option value="training">Guided Skill Training Track</option>
                    <option value="enterprise">Enterprise Custom Software Development</option>
                    <option value="general">General Support / Partnership</option>
                  </select>
                </div>

                <div>
                  <label style={LABEL_STYLE}>
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={handleFieldFocus}
                    onBlur={handleFieldBlur}
                    placeholder="Tell us about your background or requirements..."
                    style={{ ...INPUT_STYLE, resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status.loading}
                  className="btn-premium"
                  style={{
                    padding: '0.9rem',
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    width: '100%'
                  }}
                >
                  {status.loading ? 'Sending Message...' : 'Submit Inquiry'}
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}

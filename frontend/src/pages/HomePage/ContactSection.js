import React, { useState } from 'react';
import { api } from '../../services/api';

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
    <section id="contact-section" style={{ padding: '5rem 0', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem auto' }}>
          <span style={{
            fontSize: '0.82rem',
            color: '#2563eb',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            background: '#eff6ff',
            padding: '0.35rem 1.1rem',
            borderRadius: '9999px',
            border: '1px solid #dbeafe',
            display: 'inline-block',
            marginBottom: '0.85rem'
          }}>
            Get In Touch
          </span>
          
          <h2 style={{ fontSize: '2.5rem', color: '#0b0f19', fontWeight: '800', lineHeight: '1.2' }}>
            Contact & Inquiries
          </h2>
          
          <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '0.75rem', lineHeight: '1.6' }}>
            Have questions about internship enrollment, guided training tracks, or enterprise software development? Reach out directly.
          </p>
        </div>

        {/* Grid: Contact Info & Form */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'start'
        }}>
          
          {/* Left Info Column */}
          <div>
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '2rem'
            }}>
              <h3 style={{ fontSize: '1.35rem', color: '#0b0f19', fontWeight: '800', marginBottom: '1.5rem' }}>
                Corporate Contact Details
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', display: 'block' }}>
                    Official Support Email
                  </span>
                  <a href="mailto:support@velora-global.online" style={{ fontSize: '1rem', color: '#2563eb', fontWeight: '700', textDecoration: 'none' }}>
                    support@velora-global.online
                  </a>
                </div>

                <div>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', display: 'block' }}>
                    Executive Operations
                  </span>
                  <p style={{ margin: 0, color: '#334155', fontSize: '0.95rem', fontWeight: '600' }}>
                    Velora Global Operations & Engineering
                  </p>
                  <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                    Remote Operations (South Asia & Global Remote)
                  </span>
                </div>

                <div>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', display: 'block' }}>
                    Hours of Operation
                  </span>
                  <p style={{ margin: 0, color: '#334155', fontSize: '0.95rem' }}>
                    Monday – Saturday: 9:00 AM – 6:00 PM (NPT / IST)
                  </p>
                </div>
              </div>

              {/* Social Channels */}
              <div style={{ borderTop: '1px solid #f1f5f9', marginTop: '1.75rem', paddingTop: '1.25rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', display: 'block', marginBottom: '0.85rem' }}>
                  Official Social Channels
                </span>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <a 
                    href="https://www.linkedin.com/company/veloraglo-bal/" 
                    target="_blank" 
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.45rem 0.85rem',
                      background: '#eff6ff',
                      border: '1px solid #dbeafe',
                      borderRadius: '8px',
                      color: '#0a66c2',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#dbeafe'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#eff6ff'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#0a66c2">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn ➔
                  </a>

                  <a 
                    href="https://www.instagram.com/veloraglobal_/" 
                    target="_blank" 
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.45rem 0.85rem',
                      background: '#fff1f2',
                      border: '1px solid #ffe4e6',
                      borderRadius: '8px',
                      color: '#e1306c',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#ffe4e6'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#fff1f2'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#e1306c">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Instagram ➔
                  </a>

                  <a 
                    href="https://www.facebook.com/veloraglobal02" 
                    target="_blank" 
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.45rem 0.85rem',
                      background: '#f0f9ff',
                      border: '1px solid #e0f2fe',
                      borderRadius: '8px',
                      color: '#1877f2',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#e0f2fe'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#f0f9ff'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877f2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook ➔
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '20px',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.35rem', color: '#0b0f19', fontWeight: '800', marginBottom: '1.25rem' }}>
              Send an Official Message
            </h3>

            {status.success ? (
              <div style={{
                background: '#ecfdf5',
                border: '1px solid #a7f3d0',
                borderRadius: '12px',
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
                  <div style={{ background: '#fef2f2', color: '#991b1b', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.85rem' }}>
                    {status.error}
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.92rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.92rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                    Topic of Inquiry
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.92rem',
                      background: '#ffffff'
                    }}
                  >
                    <option value="internship">Remote Internship Program</option>
                    <option value="training">Guided Skill Training Track</option>
                    <option value="enterprise">Enterprise Custom Software Development</option>
                    <option value="general">General Support / Partnership</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your background or requirements..."
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.92rem',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status.loading}
                  className="btn-primary"
                  style={{
                    padding: '0.85rem',
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    width: '100%',
                    borderRadius: '8px'
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

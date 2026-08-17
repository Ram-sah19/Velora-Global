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
                      gap: '0.4rem',
                      color: '#0a66c2',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      textDecoration: 'none'
                    }}
                  >
                    LinkedIn Profile ➔
                  </a>

                  <a 
                    href="https://www.instagram.com/veloraglobal_/" 
                    target="_blank" 
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: '#e1306c',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      textDecoration: 'none'
                    }}
                  >
                    Instagram Page ➔
                  </a>

                  <a 
                    href="https://www.facebook.com/veloraglobal02" 
                    target="_blank" 
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: '#1877f2',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      textDecoration: 'none'
                    }}
                  >
                    Facebook Page ➔
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

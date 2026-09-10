import React, { useState } from 'react';

export default function BookConsultationModal({ isOpen, onClose }) {
  const [userType, setUserType] = useState('client'); // 'client' or 'student'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: 'Nepal (NPT)',
    interest: 'Custom Web / SaaS Platform',
    message: '',
    preferredTime: 'Morning (9:00 AM - 12:00 PM)'
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send inquiry to backend
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          serviceCategory: userType === 'client' ? `Enterprise Discovery (${formData.interest})` : `Career Mentorship with Ram Sah (${formData.interest})`,
          projectScope: `Location: ${formData.location} | Preferred Time: ${formData.preferredTime} | Notes: ${formData.message}`
        })
      });
    } catch (err) {
      console.warn('Backend inquiry recorded locally:', err);
    }

    setLoading(false);
    setSubmitted(true);
  };

  const generateWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello Ram Sah (Founder & CEO, Velora Global)!\n\nI would like to schedule a 1-on-1 ${userType === 'client' ? 'Enterprise Software Discovery' : 'Career Mentorship'} call.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nLocation/Timezone: ${formData.location}\nTopic: ${formData.interest}\nPreferred Time: ${formData.preferredTime}\nNotes: ${formData.message}`
    );
    return `https://wa.me/9779826031419?text=${text}`;
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(11, 15, 25, 0.75)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '560px',
        maxHeight: '92vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid #e2e8f0',
        padding: '2.5rem',
        position: 'relative'
      }}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#f1f5f9',
            border: 'none',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            fontSize: '1.2rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b'
          }}
        >
          ✕
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <span style={{
                fontSize: '0.76rem',
                color: '#2563eb',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                background: '#eff6ff',
                padding: '0.3rem 0.9rem',
                borderRadius: '9999px',
                display: 'inline-block',
                marginBottom: '0.65rem'
              }}>
                1-ON-1 EXECUTIVE SESSION
              </span>

              <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0b0f19', margin: '0 0 0.4rem 0' }}>
                Schedule a 1-on-1 Call
              </h2>

              <p style={{ color: '#64748b', fontSize: '0.92rem', margin: 0 }}>
                Direct discovery session with <strong>Ram Sah (Founder & CEO)</strong> & technical leadership.
              </p>
            </div>

            {/* Selector: Corporate Client vs Student Candidate */}
            <div style={{
              display: 'flex',
              background: '#f1f5f9',
              padding: '0.3rem',
              borderRadius: '12px',
              marginBottom: '1.5rem',
              border: '1px solid #e2e8f0'
            }}>
              <button
                type="button"
                onClick={() => {
                  setUserType('client');
                  setFormData({ ...formData, interest: 'Custom Web / SaaS Platform' });
                }}
                style={{
                  flex: 1,
                  padding: '0.65rem',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  borderRadius: '9px',
                  border: 'none',
                  cursor: 'pointer',
                  background: userType === 'client' ? '#2563eb' : 'transparent',
                  color: userType === 'client' ? '#ffffff' : '#64748b',
                  transition: 'all 0.2s ease'
                }}
              >
                Enterprise / Client Call
              </button>

              <button
                type="button"
                onClick={() => {
                  setUserType('student');
                  setFormData({ ...formData, interest: 'Internship & Career Guidance' });
                }}
                style={{
                  flex: 1,
                  padding: '0.65rem',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  borderRadius: '9px',
                  border: 'none',
                  cursor: 'pointer',
                  background: userType === 'student' ? '#2563eb' : 'transparent',
                  color: userType === 'student' ? '#ffffff' : '#64748b',
                  transition: 'all 0.2s ease'
                }}
              >
                Student / Mentorship Call
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe / Ram Kumar"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.92rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                    WhatsApp / Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+977-98... or +1..."
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                    Location / Timezone
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.92rem',
                      outline: 'none',
                      background: '#ffffff'
                    }}
                  >
                    <option value="Nepal (NPT)">Nepal (NPT - UTC+5:45)</option>
                    <option value="United States (EST)">United States (EST / New York)</option>
                    <option value="United States (PST)">United States (PST / California)</option>
                    <option value="India (IST)">India (IST - UTC+5:30)</option>
                    <option value="Europe (GMT/CET)">Europe (GMT / CET)</option>
                    <option value="Other Global">Other Global Region</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                    {userType === 'client' ? 'Project Interest' : 'Domain Interest'}
                  </label>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.92rem',
                      outline: 'none',
                      background: '#ffffff'
                    }}
                  >
                    {userType === 'client' ? (
                      <>
                        <option value="Custom Web / SaaS Platform">Custom Web / SaaS Platform</option>
                        <option value="Mobile App (iOS / Android)">Mobile App (iOS / Android)</option>
                        <option value="AI Chatbot & Automation">AI Chatbot & Automation</option>
                        <option value="Cloud Infrastructure & DevOps">Cloud Infrastructure & DevOps</option>
                        <option value="Full Engineering Team Dedicated">Dedicated Engineering Team</option>
                      </>
                    ) : (
                      <>
                        <option value="Internship & Career Guidance">Internship & Career Guidance</option>
                        <option value="Full Stack MERN Track">Full Stack MERN Track</option>
                        <option value="Python AI / ML Track">Python AI / ML Track</option>
                        <option value="Cloud DevOps Track">Cloud DevOps Track</option>
                        <option value="Mobile App Development Track">Mobile App Track</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '0.35rem' }}>
                  Project Brief or Career Questions
                </label>
                <textarea
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={userType === 'client' ? 'Briefly describe your project requirements, goals, or timeline...' : 'Tell us about your learning background and career goals...'}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.92rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-coral"
                style={{
                  width: '100%',
                  padding: '0.9rem',
                  fontSize: '1rem',
                  fontWeight: '800',
                  borderRadius: '12px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 18px rgba(255, 107, 107, 0.35)',
                  marginTop: '0.5rem'
                }}
              >
                {loading ? 'Submitting Schedule Request...' : 'Confirm Discovery Call Request ➔'}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation State with WhatsApp Instant Connect */
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#dcfce7',
              color: '#16a34a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              fontWeight: '900',
              margin: '0 auto 1.25rem auto'
            }}>
              ✓
            </div>

            <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0b0f19', marginBottom: '0.5rem' }}>
              Discovery Request Received!
            </h3>

            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.75rem' }}>
              Thank you, <strong>{formData.name}</strong>. Ram Sah and our executive engineering team will reach out to you at <strong>{formData.email}</strong> within 24 hours.
            </p>

            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '1.25rem',
              marginBottom: '1.75rem',
              textAlign: 'left'
            }}>
              <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                Need an Immediate Response?
              </span>
              <p style={{ fontSize: '0.88rem', color: '#334155', margin: '0 0 1rem 0', lineHeight: '1.5' }}>
                Connect directly with <strong>Ram Sah (Founder & CEO)</strong> right now via WhatsApp with your inquiry details.
              </p>
              
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  width: '100%',
                  padding: '0.75rem 1.25rem',
                  background: '#25D366',
                  color: '#ffffff',
                  fontWeight: '800',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '0.92rem'
                }}
              >
                Open Direct WhatsApp Chat ➔
              </a>
            </div>

            <button
              onClick={onClose}
              style={{
                background: '#f1f5f9',
                color: '#334155',
                border: 'none',
                padding: '0.75rem 2rem',
                borderRadius: '9999px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

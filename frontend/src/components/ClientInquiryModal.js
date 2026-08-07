import React, { useState } from 'react';
import { api } from '../services/api';

const TARGET_EMAIL = "ram6070246@gmail.com";

export default function ClientInquiryModal({ defaultService = 'Web Application Development', onClose }) {
  const [formData, setFormData] = useState({
    clientName: '',
    companyName: '',
    businessEmail: '',
    phone: '',
    serviceRequired: defaultService,
    budgetRange: 'NPR 50,000 - 100,000',
    projectScope: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Construct mailto URL
    const subject = encodeURIComponent(`[Client Project Inquiry] - ${formData.serviceRequired} - ${formData.companyName || formData.clientName}`);
    const body = encodeURIComponent(
      `Velora Global - Client Project Consultation Request\n` +
      `--------------------------------------------------\n` +
      `Client Name: ${formData.clientName}\n` +
      `Company: ${formData.companyName || 'N/A'}\n` +
      `Business Email: ${formData.businessEmail}\n` +
      `Phone/WhatsApp: ${formData.phone}\n` +
      `Service Required: ${formData.serviceRequired}\n` +
      `Estimated Budget: ${formData.budgetRange}\n\n` +
      `Project Scope / Requirements Summary:\n` +
      `${formData.projectScope}\n`
    );

    const mailtoUrl = `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;

    try {
      if (api.submitClientInquiry) {
        await api.submitClientInquiry(formData).catch(() => {});
      }
    } catch (err) {
      console.warn("Backend save logged");
    } finally {
      window.location.href = mailtoUrl;
      setSuccessMsg(`Opening email client to send project scope directly to ${TARGET_EMAIL}...`);
      setSubmitting(false);
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 3500);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
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

        <span className="badge badge-coral" style={{ marginBottom: '0.5rem' }}>Enterprise Project Consultation</span>
        <h2 style={{ fontSize: '1.8rem', color: '#0b0f19', marginBottom: '0.35rem', fontWeight: '800' }}>
          Schedule Client Consultation
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Submit your project requirements. Details will be redirected directly to <strong>{TARGET_EMAIL}</strong>.
        </p>

        {successMsg ? (
          <div style={{ padding: '2rem', textAlign: 'center', background: '#ecfdf5', border: '1px solid #10b981', borderRadius: '12px', color: '#059669' }}>
            <p style={{ fontSize: '1.05rem', fontWeight: '700', lineHeight: '1.6' }}>{successMsg}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Your Name *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Rajesh Shrestha"
                  value={formData.clientName}
                  onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Company / Organization</label>
                <input 
                  type="text"
                  placeholder="e.g. Acme Tech Pvt. Ltd."
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Business Email Address *</label>
                <input 
                  type="email"
                  required
                  placeholder="client@company.com"
                  value={formData.businessEmail}
                  onChange={(e) => setFormData({...formData, businessEmail: e.target.value})}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Phone / WhatsApp Number *</label>
                <input 
                  type="tel"
                  required
                  placeholder="+977 9800000000"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Service Required *</label>
                <select
                  value={formData.serviceRequired}
                  onChange={(e) => setFormData({...formData, serviceRequired: e.target.value})}
                  style={{ width: '100%', fontWeight: '600' }}
                >
                  <option value="Web Application Development">🌐 Web Application Development</option>
                  <option value="Mobile Application Development">📱 Mobile Application Development</option>
                  <option value="AI Chatbot Integration in Web Apps">🤖 AI Chatbot Integration in Web Apps</option>
                  <option value="Full Enterprise Custom Software">⚡ Full Enterprise Custom Software</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Estimated Project Budget</label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({...formData, budgetRange: e.target.value})}
                  style={{ width: '100%', fontWeight: '600' }}
                >
                  <option value="NPR 25,000 - 50,000">NPR 25,000 - 50,000</option>
                  <option value="NPR 50,000 - 100,000">NPR 50,000 - 100,000</option>
                  <option value="NPR 100,000+ / Custom Enterprise">NPR 100,000+ / Custom Enterprise</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Project Scope / Requirements Summary *</label>
              <textarea 
                rows={3}
                required
                placeholder="Describe your project goals, required features, or tech stack expectations..."
                value={formData.projectScope}
                onChange={(e) => setFormData({...formData, projectScope: e.target.value})}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button type="button" onClick={onClose} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" disabled={submitting} className="btn-coral" style={{ padding: '0.65rem 1.6rem' }}>
                {submitting ? 'Opening Email...' : 'Send Inquiry to Founder Email ➔'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

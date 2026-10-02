import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import DialogShell from './DialogShell';

import { SUPPORT_EMAIL } from '../constants';

const TARGET_EMAIL = SUPPORT_EMAIL;

export default function ClientInquiryModal({ defaultService = 'Web Application Development', currentUser, onClose }) {
  const [formData, setFormData] = useState({
    clientName: currentUser?.name || '',
    companyName: currentUser?.companyName || '',
    businessEmail: currentUser?.email || '',
    phone: currentUser?.phone || '',
    serviceRequired: defaultService,
    budgetRange: 'NPR 50,000 - 100,000',
    projectScope: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [mailtoUrl, setMailtoUrl] = useState('');

  useEffect(() => {
    if (defaultService) {
      setFormData(prev => ({ ...prev, serviceRequired: defaultService }));
    }
  }, [defaultService]);

  const buildMailtoUrl = () => {
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
    return `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const url = buildMailtoUrl();
    setMailtoUrl(url);

    let recorded = true;
    try {
      await api.submitClientInquiry(formData);
    } catch (err) {
      recorded = false;
    }

    // The email client is the delivery path that actually reaches the founder, so it opens
    // either way; `recorded` only decides whether we claim the inquiry was also stored.
    window.location.href = url;
    setSubmitting(false);
    setResult({
      recorded,
      message: recorded
        ? `Your inquiry was recorded and your email app is opening so you can send it to ${TARGET_EMAIL}.`
        : `We could not record this inquiry on our server, so your email app is opening instead — please send it to ${TARGET_EMAIL}.`
    });
  };

  const modalJSX = (
    <DialogShell
      labelId="client-inquiry-title"
      onClose={onClose}
      overlayStyle={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(11, 15, 25, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        overflowY: 'auto',
        boxSizing: 'border-box'
      }}
      panelClassName="modal-content"
      panelStyle={{
        maxWidth: '640px',
        width: '100%',
        maxHeight: 'min(90vh, 760px)',
        overflowY: 'auto',
        borderRadius: '24px',
        padding: '2.25rem 2rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
        background: '#ffffff',
        position: 'relative',
        margin: 'auto',
        boxSizing: 'border-box'
      }}
      onPanelClick={(e) => e.stopPropagation()}
    >
        <button
          onClick={onClose}
          aria-label="Close dialog"
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
          <span aria-hidden="true">&#215;</span>
        </button>

        <span className="badge badge-coral" style={{ marginBottom: '0.5rem' }}>Enterprise Project Consultation</span>
        <h2 id="client-inquiry-title" style={{ fontSize: '1.8rem', color: '#0b0f19', marginBottom: '0.35rem', fontWeight: '800' }}>
          Schedule Client Consultation
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Submit your project requirements. Details will be redirected directly to <strong>{TARGET_EMAIL}</strong>.
        </p>

        {result ? (
          <div role="status" aria-live="polite" style={{ padding: '2rem', textAlign: 'center', background: result.recorded ? '#ecfdf5' : '#fffbeb', border: `1px solid ${result.recorded ? '#10b981' : '#f59e0b'}`, borderRadius: '12px', color: result.recorded ? '#059669' : '#92400e' }}>
            <p style={{ fontSize: '1.05rem', fontWeight: '700', lineHeight: '1.6', margin: 0 }}>{result.message}</p>
            <p style={{ fontSize: '0.88rem', marginTop: '0.9rem' }}>
              If your email app did not open,{' '}
              <a href={mailtoUrl} style={{ fontWeight: '700', textDecoration: 'underline' }}>open a prepared draft here</a>.
            </p>
            <button type="button" onClick={onClose} className="btn-secondary" style={{ marginTop: '1.25rem' }}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label htmlFor="inquiry-client-name" style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Your Name *</label>
                <input 
                  id="inquiry-client-name"
                  type="text"
                  required
                  aria-required="true"
                  placeholder="e.g. Rajesh Shrestha"
                  value={formData.clientName}
                  onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label htmlFor="inquiry-company-name" style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Company / Organization</label>
                <input 
                  id="inquiry-company-name"
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
                <label htmlFor="inquiry-business-email" style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Business Email Address *</label>
                <input 
                  id="inquiry-business-email"
                  type="email"
                  required
                  aria-required="true"
                  placeholder="client@company.com"
                  value={formData.businessEmail}
                  onChange={(e) => setFormData({...formData, businessEmail: e.target.value})}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label htmlFor="inquiry-phone" style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Phone / WhatsApp Number *</label>
                <input 
                  id="inquiry-phone"
                  type="tel"
                  required
                  aria-required="true"
                  placeholder="+977 9800000000"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label htmlFor="inquiry-service" style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Service Required *</label>
                <select
                  id="inquiry-service"
                  value={formData.serviceRequired}
                  onChange={(e) => setFormData({...formData, serviceRequired: e.target.value})}
                  style={{ width: '100%', fontWeight: '600' }}
                >
                  <option value="Web Application Development">Web Application Development</option>
                  <option value="Cross-Platform Mobile Application Development">Cross-Platform Mobile Application Development</option>
                  <option value="Mobile Application Development">Mobile Application Development</option>
                  <option value="AI Chatbots & Intelligent Agents">AI Chatbots & Intelligent Agents</option>
                  <option value="AI Chatbot Integration in Web Apps">AI Chatbot Integration in Web Apps</option>
                  <option value="Full Enterprise Custom Software">Full Enterprise Custom Software</option>
                  <option value="Direct Face-to-Face Project Discussion">Direct Face-to-Face Project Discussion</option>
                </select>
              </div>

              <div>
                <label htmlFor="inquiry-budget" style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Estimated Project Budget</label>
                <select
                  id="inquiry-budget"
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
              <label htmlFor="inquiry-scope" style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Project Scope / Requirements Summary *</label>
              <textarea 
                id="inquiry-scope"
                rows={3}
                required
                aria-required="true"
                placeholder="Describe your project goals, required features, or tech stack expectations..."
                value={formData.projectScope}
                onChange={(e) => setFormData({...formData, projectScope: e.target.value})}
                style={{ width: '100%' }}
              />
            </div>

            <p style={{ margin: '0.25rem 0 0', fontSize: '0.82rem', color: '#64748b', lineHeight: '1.6' }}>
              Sending this inquiry means you agree to our{' '}
              <a href="/terms" style={{ color: '#2563eb', fontWeight: 600 }}>Terms &amp; Conditions</a>
              {' '}and confirm we may contact you about the project, as described in our{' '}
              <a href="/privacy-policy" style={{ color: '#2563eb', fontWeight: 600 }}>Privacy Policy</a>.
            </p>

            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button type="button" onClick={onClose} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" disabled={submitting} aria-busy={submitting} className="btn-coral" style={{ padding: '0.65rem 1.6rem' }}>
                {submitting ? 'Opening Email...' : 'Send Inquiry to Founder Email'}
              </button>
            </div>
          </form>
        )}
    </DialogShell>
  );

  return modalJSX;
}

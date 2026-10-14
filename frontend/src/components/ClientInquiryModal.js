import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import DialogShell from './DialogShell';
import SelectField from './SelectField';

import { SUPPORT_EMAIL } from '../constants';

const TARGET_EMAIL = SUPPORT_EMAIL;

const SERVICE_OPTIONS = [
  'Custom Web Application Development',
  'Mobile App Development',
  'AI Chatbots & Intelligent Agents',
  'SEO & Digital Growth',
  'Website Maintenance & Support',
  'Full Enterprise Custom Software',
  'Direct Face-to-Face Project Discussion'
];

const BUDGET_OPTIONS = [
  'NPR 25,000 - 50,000',
  'NPR 50,000 - 100,000',
  'NPR 100,000+ / Custom Enterprise'
];

export default function ClientInquiryModal({ defaultService = 'Custom Web Application Development', currentUser, onClose }) {
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

  const update = (field) => (event) => setFormData(prev => ({ ...prev, [field]: event.target.value }));

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

  return (
    <DialogShell labelId="client-inquiry-title" onClose={onClose} panelClassName="svc-modal">
      <button type="button" className="svc-modal__close" aria-label="Close dialog" onClick={onClose}>
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2.5 2.5l9 9M11.5 2.5l-9 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </button>

      <p className="svc-eyebrow">Enterprise Project Consultation</p>
      <h2 id="client-inquiry-title" className="svc-modal__title">Schedule Client Consultation</h2>
      <p className="svc-modal__note">
        Submit your project requirements. Details will be redirected directly to <strong>{TARGET_EMAIL}</strong>.
      </p>

      {result ? (
        <div
          role="status"
          aria-live="polite"
          className={`svc-result${result.recorded ? '' : ' svc-result--warning'}`}
        >
          <p className="svc-result__message">{result.message}</p>
          <p className="svc-result__fallback">
            If your email app did not open,{' '}
            <a href={mailtoUrl}>open a prepared draft here</a>.
          </p>
          <div className="svc-result__actions">
            <button type="button" onClick={onClose} className="svc-btn svc-btn--quiet">Close</button>
          </div>
        </div>
      ) : (
        <form className="svc-form" onSubmit={handleSubmit}>
          <div className="svc-form__row">
            <div className="svc-field">
              <label className="svc-field__label" htmlFor="inquiry-client-name">Your Name *</label>
              <input
                id="inquiry-client-name"
                className="svc-input"
                type="text"
                required
                aria-required="true"
                placeholder="e.g. Rajesh Shrestha"
                value={formData.clientName}
                onChange={update('clientName')}
              />
            </div>

            <div className="svc-field">
              <label className="svc-field__label" htmlFor="inquiry-company-name">Company / Organization</label>
              <input
                id="inquiry-company-name"
                className="svc-input"
                type="text"
                placeholder="e.g. Acme Tech Pvt. Ltd."
                value={formData.companyName}
                onChange={update('companyName')}
              />
            </div>
          </div>

          <div className="svc-form__row">
            <div className="svc-field">
              <label className="svc-field__label" htmlFor="inquiry-business-email">Business Email Address *</label>
              <input
                id="inquiry-business-email"
                className="svc-input"
                type="email"
                required
                aria-required="true"
                placeholder="client@company.com"
                value={formData.businessEmail}
                onChange={update('businessEmail')}
              />
            </div>

            <div className="svc-field">
              <label className="svc-field__label" htmlFor="inquiry-phone">Phone / WhatsApp Number *</label>
              <input
                id="inquiry-phone"
                className="svc-input"
                type="tel"
                required
                aria-required="true"
                placeholder="+977 9800000000"
                value={formData.phone}
                onChange={update('phone')}
              />
            </div>
          </div>

          <div className="svc-form__row">
            <div className="svc-field">
              <label className="svc-field__label" id="inquiry-service-label">Service Required *</label>
              <SelectField
                id="inquiry-service"
                value={formData.serviceRequired}
                options={SERVICE_OPTIONS}
                onChange={(serviceRequired) => setFormData(prev => ({ ...prev, serviceRequired }))}
              />
            </div>

            <div className="svc-field">
              <label className="svc-field__label" id="inquiry-budget-label">Estimated Project Budget</label>
              <SelectField
                id="inquiry-budget"
                value={formData.budgetRange}
                options={BUDGET_OPTIONS}
                onChange={(budgetRange) => setFormData(prev => ({ ...prev, budgetRange }))}
              />
            </div>
          </div>

          <div className="svc-field">
            <label className="svc-field__label" htmlFor="inquiry-scope">Project Scope / Requirements Summary *</label>
            <textarea
              id="inquiry-scope"
              className="svc-input"
              rows={3}
              required
              aria-required="true"
              placeholder="Describe your project goals, the business problem you want solved, or the features you need..."
              value={formData.projectScope}
              onChange={update('projectScope')}
            />
          </div>

          <p className="svc-consent">
            Sending this inquiry means you agree to our{' '}
            <a className="svc-link" href="/terms">Terms &amp; Conditions</a>
            {' '}and confirm we may contact you about the project, as described in our{' '}
            <a className="svc-link" href="/privacy-policy">Privacy Policy</a>.
          </p>

          <div className="svc-form__actions">
            <button type="button" onClick={onClose} className="svc-btn svc-btn--quiet">Cancel</button>
            <button type="submit" disabled={submitting} aria-busy={submitting} className="svc-btn svc-btn--primary">
              {submitting ? 'Opening Email...' : 'Send Inquiry to Founder Email'}
            </button>
          </div>
        </form>
      )}
    </DialogShell>
  );
}

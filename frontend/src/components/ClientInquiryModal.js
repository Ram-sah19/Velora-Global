import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { buildInquiryMailto } from '../services/inquiryMailto';
import DialogShell from './DialogShell';
import SelectField from './SelectField';

import { SUPPORT_EMAIL } from '../constants';

const TARGET_EMAIL = SUPPORT_EMAIL;

const SERVICE_OPTIONS = [
  'Custom Web Application Development',
  'Mobile App Development',
  'AI Chatbots & Intelligent Agents',
  'SEO & Digital Growth',
  'Digital Marketing',
  'Website Maintenance & Support',
  'Full Enterprise Custom Software',
  'Direct Face-to-Face Project Discussion'
];

const BUDGET_OPTIONS = [
  'NPR 25,000 - 50,000',
  'NPR 50,000 - 100,000',
  'NPR 100,000+ / Custom Enterprise'
];

// The inquiry endpoint whitelists projectType (ALLOWED_PROJECT_TYPES in
// backend/controllers/inquiryController.js); anything else is stored as 'general'.
const PROJECT_TYPE_BY_SERVICE = {
  'Custom Web Application Development': 'web-development',
  'Mobile App Development': 'mobile-app',
  'AI Chatbots & Intelligent Agents': 'ai-automation',
  'Full Enterprise Custom Software': 'enterprise-solutions'
};

const SAVED_MESSAGE = 'Your inquiry is with our team. We reply to you within 24 business hours.';

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

  useEffect(() => {
    if (defaultService) {
      setFormData(prev => ({ ...prev, serviceRequired: defaultService }));
    }
  }, [defaultService]);

  const update = (field) => (event) => setFormData(prev => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // The endpoint contract is clientName/email/description (+projectType, budget, phone,
    // companyName) — the same shape ContactSection posts, not this form's own field names.
    const payload = {
      clientName: formData.clientName,
      email: formData.businessEmail,
      phone: formData.phone,
      companyName: formData.companyName,
      projectType: PROJECT_TYPE_BY_SERVICE[formData.serviceRequired] || 'general',
      budget: formData.budgetRange,
      description: formData.projectScope
    };
    const mailto = buildInquiryMailto({
      clientName: payload.clientName,
      email: payload.email,
      phone: payload.phone,
      companyName: payload.companyName,
      service: formData.serviceRequired,
      budget: payload.budget,
      message: payload.description
    });

    const recorded = api.submitClientInquiry(payload);
    // Launched while the click gesture is still live, which is what lets the mail client open.
    window.location.href = mailto;

    try {
      await recorded;
      setResult({ sent: true, mailto, message: SAVED_MESSAGE });
    } catch (err) {
      // 503 means the inquiry is stored and only our own SMTP failed. The visitor's mail
      // client is already opening with the same details, so there is nothing for them to fix.
      if (err.status === 503) {
        setResult({ sent: true, mailto, message: SAVED_MESSAGE });
      } else {
        setResult({
          sent: false,
          mailto,
          message: err.name === 'AbortError'
            ? 'The request timed out. Please try again in a moment.'
            : (err.message || 'We could not send your inquiry. Please try again in a moment.')
        });
      }
    } finally {
      setSubmitting(false);
    }
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
        Submit your project requirements and they reach our team at <strong>{TARGET_EMAIL}</strong>. Your mail
        app also opens with a prepared copy of the same details, so you can send it yourself as well.
      </p>

      {result ? (
        <div
          role="status"
          aria-live="polite"
          className={`svc-result${result.sent ? '' : ' svc-result--warning'}`}
        >
          <p className="svc-result__message">{result.message}</p>
          <p className="svc-result__fallback">
            If your mail app did not open, <a href={result.mailto}>send the prepared email here</a>.
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
                minLength={2}
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
              minLength={10}
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
              {submitting ? 'Sending...' : 'Send Inquiry'}
            </button>
          </div>
        </form>
      )}
    </DialogShell>
  );
}

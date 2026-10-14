import React, { useState } from 'react';
import { api } from '../../services/api';

function InfoRow({ icon, label, children }) {
  return (
    <div className="hp-contact__row">
      <span className="hp-contact__label">
        {icon}
        {label}
      </span>
      <div>{children}</div>
    </div>
  );
}

const ICON_PROPS = {
  width: 14,
  height: 14,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true'
};

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'internship', // 'internship', 'training', 'enterprise', 'general'
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const update = (field) => (event) => setFormData({ ...formData, [field]: event.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ loading: false, success: false, error: 'Please complete all required fields.' });
      return;
    }

    setStatus({ loading: true, success: false, error: '' });
    try {
      await api.submitClientInquiry({
        clientName: formData.name,
        email: formData.email,
        projectType: formData.inquiryType,
        description: formData.message
      });
      setStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', email: '', inquiryType: 'internship', message: '' });
    } catch (err) {
      // The old handler set success:true here, so a dropped inquiry looked delivered
      // and the typed message was cleared.
      setStatus({
        loading: false,
        success: false,
        error: 'We could not send your message. Please email info@velora-global.online or try again in a moment.'
      });
    }
  };

  return (
    <section id="contact-section" className="hp-band">
      <div className="container">
        <div className="hp-head hp-head--center">
          <span className="svc-eyebrow">Get In Touch</span>
          <h2 className="hp-title">Contact &amp; Inquiries</h2>
          <p className="hp-lede">
            Have questions about internship enrollment, guided training tracks, or enterprise software
            development? Reach out directly.
          </p>
        </div>

        <div className="hp-contact">
          <div>
            <h3 className="hp-contact__title">Corporate Contact Details</h3>

            <div className="hp-contact__rows">
              <InfoRow
                label="Headquarters & Office"
                icon={
                  <svg {...ICON_PROPS}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                }
              >
                <p className="hp-contact__primary">Velora Global Technologies</p>
                <p className="hp-contact__text">
                  Balkumari, Ring Road, Kathmandu Valley<br />
                  Bagmati Province, Nepal (Postal Code: 44600)
                </p>
                <a
                  className="hp-contact__link"
                  href="https://maps.google.com/?q=Balkumari+Kathmandu+Nepal"
                  target="_blank"
                  rel="noreferrer"
                >
                  View on Google Maps
                </a>
              </InfoRow>

              <InfoRow
                label="Direct Helpline & WhatsApp"
                icon={
                  <svg {...ICON_PROPS}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                }
              >
                <a className="hp-contact__primary" href="tel:+9779826031419">
                  +977 9826031419
                </a>
                <a
                  className="hp-contact__link"
                  href="https://wa.me/9779826031419?text=Hi%20Velora%20Global%20Team%2C%20I%20have%20an%20inquiry."
                  target="_blank"
                  rel="noreferrer"
                >
                  Chat via WhatsApp (+977 9826031419)
                </a>
              </InfoRow>

              <InfoRow
                label="Email"
                icon={
                  <svg {...ICON_PROPS}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0 1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                }
              >
                <a className="hp-contact__link" href="mailto:info@velora-global.online">
                  info@velora-global.online
                </a>
                <p className="hp-contact__text">
                  One inbox for internships, training and client enquiries.
                </p>
              </InfoRow>

              <InfoRow
                label="Response Time"
                icon={
                  <svg {...ICON_PROPS}>
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                }
              >
                <p className="hp-contact__primary">We reply from Kathmandu, Nepal (UTC+5:45).</p>
                <p className="hp-contact__text">
                  Applications and inquiries are read by the founding team, so replies can take a few days.
                </p>
              </InfoRow>
            </div>

            <div className="hp-contact__socials">
              <span className="hp-contact__label">Official Social Channels</span>
              <div className="hp-contact__social-list">
                <a
                  className="hp-contact__social"
                  href="https://www.linkedin.com/company/veloraglo-bal/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#0a66c2" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </a>

                <a
                  className="hp-contact__social"
                  href="https://www.instagram.com/veloraglobal_/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#c13584" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>

                <a
                  className="hp-contact__social"
                  href="https://www.facebook.com/veloraglobal02"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#1877f2" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
              </div>
            </div>
          </div>

          <div className="hp-contact__panel">
            <h3 className="hp-contact__title">Send an Official Message</h3>
            <p className="hp-contact__note">
              Direct inquiries are reviewed by the Velora Global team and answered within 24 working hours.
            </p>

            {status.success ? (
              <div role="status" aria-live="polite" className="svc-result">
                <p className="svc-result__message">Inquiry Received!</p>
                <p className="svc-result__fallback">
                  Thank you for reaching out. The Velora Global team will review your message and reply via
                  email within 24 hours.
                </p>
                <div className="svc-result__actions">
                  <button
                    type="button"
                    className="svc-btn svc-btn--quiet"
                    onClick={() => setStatus({ loading: false, success: false, error: '' })}
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form className="svc-form" onSubmit={handleSubmit}>
                {status.error && (
                  <div role="alert" className="svc-result svc-result--warning">
                    <p className="svc-result__message">{status.error}</p>
                  </div>
                )}

                <div className="svc-field">
                  <label className="svc-field__label" htmlFor="contact-name">Full Name *</label>
                  <input
                    id="contact-name"
                    className="svc-input"
                    type="text"
                    required
                    aria-required="true"
                    value={formData.name}
                    onChange={update('name')}
                    placeholder="e.g. John Doe"
                  />
                </div>

                <div className="svc-field">
                  <label className="svc-field__label" htmlFor="contact-email">Email Address *</label>
                  <input
                    id="contact-email"
                    className="svc-input"
                    type="email"
                    required
                    aria-required="true"
                    value={formData.email}
                    onChange={update('email')}
                    placeholder="name@example.com"
                  />
                </div>

                <div className="svc-field">
                  <label className="svc-field__label" htmlFor="contact-topic">Topic of Inquiry</label>
                  <select
                    id="contact-topic"
                    className="svc-input hp-contact__select"
                    value={formData.inquiryType}
                    onChange={update('inquiryType')}
                  >
                    <option value="internship">Remote Internship Program</option>
                    <option value="training">Guided Skill Training Track</option>
                    <option value="enterprise">Enterprise Custom Software Development</option>
                    <option value="general">General Support / Partnership</option>
                  </select>
                </div>

                <div className="svc-field">
                  <label className="svc-field__label" htmlFor="contact-message">Your Message *</label>
                  <textarea
                    id="contact-message"
                    className="svc-input"
                    rows={4}
                    required
                    aria-required="true"
                    value={formData.message}
                    onChange={update('message')}
                    placeholder="Tell us about your background or requirements..."
                  />
                </div>

                <p className="svc-consent">
                  Submitting this form means you agree to our{' '}
                  <a href="/terms">Terms &amp; Conditions</a>
                  {' '}and confirm we may reply to you, as described in our{' '}
                  <a href="/privacy-policy">Privacy Policy</a>.
                </p>

                <div className="svc-form__actions">
                  <button type="submit" disabled={status.loading} className="svc-btn svc-btn--blue">
                    {status.loading ? 'Sending Message...' : 'Submit Inquiry'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

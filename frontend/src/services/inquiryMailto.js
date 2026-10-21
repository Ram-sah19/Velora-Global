import { SUPPORT_EMAIL } from '../constants';

const row = (label, value) => (value && value.trim() ? `${label}: ${value.trim()}\r\n` : '');

/**
 * Pre-fills the visitor's own mail client so the inquiry reaches the team even when the
 * server's SMTP send fails. Subject and body must stay percent-encoded: unencoded "&" or
 * "#" in a project description would truncate the body.
 */
export function buildInquiryMailto({ clientName, email, phone, companyName, service, budget, message }) {
  const body = [
    row('Name', clientName),
    row('Reply to', email),
    row('Phone', phone),
    row('Company', companyName),
    row('Service', service),
    row('Budget', budget),
    '\r\nMessage:\r\n',
    message || '',
    '\r\n\r\nSent from the Velora Global website.'
  ].join('');

  const subject = `Project Inquiry - ${clientName || 'Website visitor'}`;
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

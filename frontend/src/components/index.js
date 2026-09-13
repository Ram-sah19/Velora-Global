/**
 * Centralized components barrel export.
 * Provides unified access to layout, modal, feedback, and motion components.
 */

// Layout Components
export { default as Navbar } from './Navbar';
export { default as Footer } from './Footer';
export { default as WhatsAppFloatingButton } from './WhatsAppFloatingButton';
export { default as VeloraLogo } from './VeloraLogo';

// Modals
export { default as CertificateModal } from './CertificateModal';
export { default as ClientInquiryModal } from './ClientInquiryModal';
export { default as ClientPrivacyModal } from './ClientPrivacyModal';
export { default as ClientTermsModal } from './ClientTermsModal';
export { default as StudentPrivacyModal } from './StudentPrivacyModal';
export { default as StudentTermsModal } from './StudentTermsModal';

// Feedback & Common UI
export { default as CookieBanner } from './CookieBanner';
export { default as NotificationToast } from './NotificationToast';
export * from './UIStates';
export * from './Motion';

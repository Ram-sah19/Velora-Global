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

// Feedback & Common UI
export { default as CookieBanner } from './CookieBanner';
export { default as NotificationToast } from './NotificationToast';
export { default as AnswerSection } from './AnswerSection';
export { default as PageFaq } from './PageFaq';
export { default as LegalSections } from './LegalSections';
export * from './UIStates';
export * from './Motion';

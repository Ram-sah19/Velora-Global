import React, { useEffect, useState } from 'react';
import DialogShell from '../../components/DialogShell';

const CONCEPTS = [
  {
    id: 1,
    sector: 'Enterprise Security & Cryptography',
    title: 'Velora Circle — End-to-End Encrypted Collaboration Suite',
    region: 'Enterprise & high-security deployments',
    tagline: 'End-to-end encrypted messaging, HD video conferencing, an encrypted file vault, and isolated enterprise workspaces, designed so content is unreadable in transit and at rest.',
    metric: 'End-to-end encryption, signaling and key management',
    deliverables: [
      'End-to-end cryptographic messaging with ephemeral chat destruction',
      'Encrypted multi-party HD video & audio conferencing with screen share',
      'Encrypted file transmission and credential vault',
      'Isolated enterprise team workspaces & role-partitioned channels',
      'Client-side key derivation with message content unreadable on the server'
    ],
    stack: ['WebRTC', 'AES-256 / RSA-4096', 'Node.js', 'React.js', 'Socket.io', 'PostgreSQL']
  },
  {
    id: 2,
    sector: 'Education & Global Consultancy',
    title: 'Overseas Education & Visa Advisory Platform',
    region: 'Australia, USA & Nepal',
    tagline: 'Multi-country consultancy portal connecting prospective students to university admissions across Australia, the USA, Canada and the UK, with a lead pipeline wired to the enquiry form.',
    metric: 'Eligibility screening, course directory and CRM hand-off',
    deliverables: [
      'Interactive multi-country visa eligibility assessment form',
      'Global university course directory with entry requirements filter',
      'Direct WhatsApp lead capture & instant CRM pipeline dispatch',
      'Mobile-first architecture with Core Web Vitals and SEO work',
      'Search engine optimisation and structured data for admissions pages'
    ],
    stack: ['React.js', 'Node.js', 'REST API', 'WhatsApp CRM', 'Cloudflare']
  },
  {
    id: 3,
    sector: 'Hospitality & Food Tech',
    title: 'Restaurant Digital QR Menu & Table Ordering System',
    region: 'Kathmandu Valley & Pokhara',
    tagline: 'Contactless zero-install digital menu allowing restaurant guests to scan table QR codes, browse live food & drink catalogs, and order in real-time.',
    metric: 'Table-scoped QR menus and live catalogue sync',
    deliverables: [
      'QR code per table that opens the menu in the browser, no app install',
      'Dynamic food & drink catalog with instant full-text search',
      'Dietary identification tags: Veg / Non-Veg / Vegan / Spiciness',
      'Merchant admin portal for real-time menu and pricing adjustments',
      'Offline-tolerant image caching for high-reliability peak traffic'
    ],
    stack: ['React 19', 'Node.js', 'Cloud Storage', 'QR Engine', 'Admin Console']
  },
  {
    id: 4,
    sector: 'Retail & E-Commerce',
    title: 'E-Commerce Brand Store & Direct Order System',
    region: 'Nepal nationwide delivery',
    tagline: 'High-speed modern online storefront replacing manual social media direct messages with an automated catalog, digital checkout, and live inventory sync.',
    metric: 'Catalogue, checkout and inventory sync',
    deliverables: [
      'Interactive visual product storefront with responsive media gallery',
      'One-click shopping cart & automated WhatsApp order dispatch routing',
      'Local digital payment integration (eSewa / Khalti / Cash on Delivery)',
      'Real-time inventory toggle and customer verification system',
      'Merchant order fulfillment and shipment dispatch dashboard'
    ],
    stack: ['MERN Stack', 'React.js', 'eSewa', 'Khalti', 'MongoDB Atlas']
  }
];

export default function ProductConceptsSection({ onConsultationClick }) {
  const [activeId, setActiveId] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  // DialogShell unmounts on demand, so the exit animation needs the panel kept alive
  // for its duration before the detail is dropped.
  useEffect(() => {
    if (!isClosing) return undefined;
    const timer = setTimeout(() => {
      setActiveId(null);
      setIsClosing(false);
    }, 240);
    return () => clearTimeout(timer);
  }, [isClosing]);

  const activeConcept = CONCEPTS.find((concept) => concept.id === activeId) || null;
  const closeDetail = () => setIsClosing(true);

  return (
    <section className="concept-band">
      <div className="container">
        <div className="concept-head">
          <span className="premium-eyebrow premium-eyebrow--on-dark">PRODUCT CONCEPTS</span>
          <h2 className="premium-headline premium-headline--on-dark concept-title">
            Product Concepts &amp; Engineering Notes
          </h2>
          <p className="concept-intro">
            Interfaces and architectures we design when a brief calls for them. These are concept builds, not live client platforms: we do not publish client names, URLs or results without permission.
          </p>
        </div>

        <div className="concept-stage">
          <div className="concept-grid">
            {CONCEPTS.map((concept, idx) => (
              <article key={concept.id} className="concept-card">
                <span className="concept-index" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
                <span className="concept-sector">{concept.sector}</span>
                <h3 className="concept-card-title">{concept.title}</h3>
                <p className="concept-region">{concept.region}</p>
                <p className="concept-tagline">{concept.tagline}</p>

                <div className="concept-tags">
                  {concept.stack.slice(0, 3).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                  {concept.stack.length > 3 && <span>+{concept.stack.length - 3}</span>}
                </div>

                <button
                  type="button"
                  className="concept-more"
                  aria-haspopup="dialog"
                  aria-expanded={activeId === concept.id && !isClosing}
                  onClick={() => setActiveId(concept.id)}
                >
                  See Full Project
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </article>
            ))}
          </div>

          <span className="concept-plus" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1.5v11M1.5 7h11" stroke="#7dd3fc" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
        </div>

        {onConsultationClick && (
          <div className="concept-cta">
            <button type="button" className="concept-cta-btn" onClick={onConsultationClick}>
              Inquire for Similar Architecture
            </button>
          </div>
        )}
      </div>

      {activeConcept && (
        <DialogShell
          labelId="concept-detail-title"
          onClose={closeDetail}
          panelClassName={`concept-modal${isClosing ? ' is-closing' : ''}`}
          overlayStyle={{ animation: isClosing ? 'conceptOverlayOut 0.22s ease both' : 'conceptOverlayIn 0.26s ease both' }}
          panelStyle={{ animation: isClosing ? 'conceptModalOut 0.22s ease both' : 'conceptModalIn 0.34s cubic-bezier(0.22, 1, 0.36, 1) both' }}
        >
          <button type="button" className="concept-modal-close" aria-label="Close project details" onClick={closeDetail}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2.5 2.5l9 9M11.5 2.5l-9 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>

          <span className="concept-sector">{activeConcept.sector}</span>
          <h3 id="concept-detail-title" className="concept-card-title">{activeConcept.title}</h3>
          <p className="concept-region">{activeConcept.region}</p>
          <p className="concept-modal-tagline">{activeConcept.tagline}</p>

          <p className="concept-label">Key Architectural Deliverables</p>
          <ul className="concept-deliverables">
            {activeConcept.deliverables.map((item) => (
              <li key={item}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="10" fill="rgba(125, 211, 252, 0.16)" />
                  <path d="M6 10L8.5 12.5L14 7" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="concept-label">Technology Stack</p>
          <div className="concept-modal-tags">
            {activeConcept.stack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>

          <div className="concept-foot">
            <span className="concept-foot-label">Capability Covered</span>
            <span className="concept-foot-value">{activeConcept.metric}</span>
          </div>
        </DialogShell>
      )}
    </section>
  );
}

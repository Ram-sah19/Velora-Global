import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import VeloraLogo from './VeloraLogo';
import QrCode from './QrCode';
import { useDialog } from './DialogShell';
import { showToast } from './NotificationToast';
import { ORG_FACTS } from '../content/siteFacts';

const icon = (paths) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {paths}
  </svg>
);

const issuedOn = (date) => {
  const parsed = new Date(`${date}T00:00:00`);
  return Number.isNaN(parsed.getTime())
    ? date
    : parsed.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
};

export default function CertificateModal({ certificate, onClose }) {
  const panelRef = useDialog(!!certificate, onClose);
  const sheetRef = useRef(null);
  const [saving, setSaving] = useState(false);

  if (!certificate) return null;

  const { certificateId, studentName, programTitle, duration, issueDate, grade } = certificate;
  const verifyUrl = `${ORG_FACTS.url}/verify/${certificateId}`;
  const domain = (certificate.domain || programTitle || '')
    .replace(/\s+(internship|program|training)$/i, '')
    .replace(/Developer$/i, 'Development');

  const facts = [
    { label: 'Internship Domain', value: domain, paths: (<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /><path d="M3 12h18" /></>) },
    { label: 'Duration', value: duration, paths: (<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></>) },
    { label: 'Program', value: 'Internship Program', paths: (<><path d="M2 8.5 12 4l10 4.5L12 13 2 8.5Z" /><path d="M6 10.6V15c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.4" /><path d="M22 8.5V14" /></>) },
    { label: 'Issued on', value: issuedOn(issueDate), paths: (<><circle cx="12" cy="9" r="5" /><path d="M9 13.4 7.5 21l4.5-2.6L16.5 21 15 13.4" /></>) }
  ];

  // Rasterized at the print base unit, so the file matches the printed page.
  async function downloadCertificate() {
    setSaving(true);
    try {
      const [{ toJpeg }, { default: pdfFromJpeg }] = await Promise.all([
        import('html-to-image'),
        import('./certificatePdf')
      ]);
      const sheet = sheetRef.current;
      const scale = 14.6 / parseFloat(getComputedStyle(sheet).fontSize);
      const dataUrl = await toJpeg(sheet, {
        pixelRatio: 3,
        quality: 0.95,
        backgroundColor: '#f8f4ea',
        width: Math.round(sheet.offsetWidth * scale),
        height: Math.round(sheet.offsetHeight * scale),
        style: { '--u': '14.6px' }
      });
      const image = new Image();
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
        image.src = dataUrl;
      });
      const url = URL.createObjectURL(pdfFromJpeg(dataUrl, image.naturalWidth, image.naturalHeight));
      const link = document.createElement('a');
      link.href = url;
      link.download = `velora-internship-certificate-${certificateId}.pdf`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      showToast('The certificate file could not be created.', 'error');
    } finally {
      setSaving(false);
    }
  }

  const modalJSX = (
    <div className="modal-overlay cert-overlay" onClick={onClose}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="certificate-title"
        tabIndex={-1}
        className="modal-content cert-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cert-sheet" ref={sheetRef}>
          <span className="cert-frame" aria-hidden="true" />
          <span className="cert-corner cert-corner--tl" aria-hidden="true" />
          <span className="cert-corner cert-corner--br" aria-hidden="true" />

          <svg className="cert-mountains" viewBox="0 0 400 180" aria-hidden="true">
            <path d="M0 180 60 92 96 128 150 58 206 132 250 96 308 150 360 118 400 180Z" fill="#cbb590" opacity="0.4" />
            <path d="M0 180 44 118 92 158 140 104 196 160 246 126 300 168 352 140 400 180Z" fill="#9aa8bb" opacity="0.3" />
            <path d="M150 58 168 80 132 80Z" fill="#ffffff" opacity="0.8" />
            <path d="M60 92 74 108 46 108Z" fill="#ffffff" opacity="0.7" />
          </svg>

          <div className="cert-head">
            <div className="cert-brand">
              <VeloraLogo showText={false} />
              <div className="cert-wordmark">
                VELOR<span>A</span>
                <div className="cert-wordmark-sub">GLOBAL</div>
              </div>
            </div>
            <p className="cert-tagline">
              Learn &nbsp;&bull;&nbsp; Build &nbsp;&bull;&nbsp; Grow<br />
              For a Better Tomorrow
            </p>
          </div>

          <p className="cert-title" id="certificate-title">Certificate of Internship</p>
          <p className="cert-subtitle">Completion</p>

          <p className="cert-presented">This certificate is proudly presented to</p>
          <p className="cert-name">{studentName}</p>
          <span className="cert-name-rule" aria-hidden="true" />

          <p className="cert-body">
            for successfully completing the <strong>{duration} {programTitle}</strong> at {ORG_FACTS.name}
            {grade ? <>, with an overall performance grade of <strong>{grade}</strong></> : null}.
          </p>

          <dl className="cert-facts">
            {facts.map((fact) => (
              <div className="cert-fact" key={fact.label}>
                {icon(fact.paths)}
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>

          <p className="cert-note">
            During the internship, the recipient gained hands-on experience in {domain.toLowerCase()},
            contributed to real-world projects, and developed valuable skills in a professional
            environment under the guidance of the {ORG_FACTS.name} team.
          </p>

          <div className="cert-foot">
            <p className="cert-motto">
              Empowering Talent.<br />
              Building the Future.
            </p>

            <div className="cert-verify">
              <span className="cert-qr">
                <QrCode value={verifyUrl} title={`QR code linking to ${verifyUrl}`} />
              </span>
              <div>
                <p className="cert-verify-title">Verify this Certificate</p>
                <p className="cert-verify-meta">
                  {icon(<><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" /><path d="M9 12l2 2 4-4" /></>)}
                  <span>Certificate ID: {certificateId} &nbsp;&bull;&nbsp; Issued: {issuedOn(issueDate)}</span>
                </p>
              </div>
            </div>

            <div className="cert-sign">
              <p className="cert-sign-script">{certificate.founderSignature || 'Rambilas Sah'}</p>
              <p className="cert-sign-label">Authorized Signatory</p>
              <span className="cert-sign-rule" aria-hidden="true" />
              <p className="cert-sign-name">{certificate.founderSignature || 'Rambilas Sah'}</p>
              <p className="cert-sign-role">{certificate.founderTitle || 'Founder & CEO'}</p>
              <p className="cert-sign-org">{ORG_FACTS.name}</p>
            </div>
          </div>

          <p className="cert-closing">
            This certificate is issued by {ORG_FACTS.name} and may be verified using the certificate ID
            or verification endpoint.
          </p>
        </div>

        <div className="cert-actions">
          <button type="button" className="btn-premium" onClick={downloadCertificate} disabled={saving}>
            {icon(<><path d="M12 3v12" /><path d="m7 11 5 5 5-5" /><path d="M4 20h16" /></>)}
            <span>{saving ? 'Preparing…' : 'Download Certificate'}</span>
          </button>
          <button type="button" className="btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? ReactDOM.createPortal(modalJSX, document.body) : modalJSX;
}

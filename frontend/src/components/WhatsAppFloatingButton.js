import React, { useState } from 'react';

export default function WhatsAppFloatingButton({ phoneNumber = '9826031419' }) {
  const [isHovered, setIsHovered] = useState(false);
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  const internationalNumber = cleanNumber.startsWith('977') ? cleanNumber : `977${cleanNumber}`;
  const whatsappUrl = `https://wa.me/${internationalNumber}?text=Hello%20Velora%20Global%20Team%2C%20I%20would%20like%20to%20inquire%20about%20your%20services%20and%20programs.`;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        flexDirection: 'row-reverse',
        pointerEvents: 'auto'
      }}
    >
      {/* WhatsApp Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Contact with Velora Global Support (+977 9826031419)"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isHovered
            ? '0 8px 24px rgba(37, 211, 102, 0.5), 0 2px 6px rgba(0, 0, 0, 0.15)'
            : '0 4px 16px rgba(37, 211, 102, 0.35), 0 2px 4px rgba(0, 0, 0, 0.1)',
          transform: isHovered ? 'scale(1.08) translateY(-2px)' : 'scale(1)',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          textDecoration: 'none',
          cursor: 'pointer'
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
            fill="#ffffff"
            stroke="none"
          />
          <path
            d="M9.5 9c-.2-.4-.4-.4-.7-.4-.3 0-.6 0-.8.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.2.2 2 3.2 5 4.3 2.5.9 3 .6 3.6.5.5 0 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4 0-.1-.2-.2-.5-.4s-1.7-.8-2-1-.5-.2-.7.2-.8 1-.9 1.2-.3.2-.6.1c-.3-.1-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.6.1-.2.2-.4.3-.6.1-.2 0-.4 0-.6s-.7-1.7-1-2.4z"
            fill="#25D366"
            stroke="none"
          />
        </svg>
      </a>

      {/* Floating Tooltip Pill */}
      <div
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateX(0)' : 'translateX(10px)',
          pointerEvents: isHovered ? 'auto' : 'none',
          transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
          background: '#0b0f19',
          color: '#ffffff',
          padding: '0.5rem 0.95rem',
          borderRadius: '10px',
          fontSize: '0.84rem',
          fontWeight: '600',
          boxShadow: '0 4px 14px rgba(11, 15, 25, 0.18)',
          whiteSpace: 'nowrap',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        Chat on WhatsApp (+977 9826031419)
      </div>
    </div>
  );
}

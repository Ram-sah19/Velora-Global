import React, { useState, useEffect } from 'react';

// Event listener for global toast notifications
let toastListener = null;

export const showToast = (message, type = 'success') => {
  if (toastListener) {
    toastListener({ id: Date.now(), message, type });
  }
};

const TOAST_ICONS = {
  error: (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false">
      <path d="M10 2.5 18 17H2L10 2.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M10 8v3.5M10 14h.01" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false">
      <circle cx="10" cy="10" r="7.75" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 9v4.5M10 6.2h.01" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false">
      <circle cx="10" cy="10" r="7.75" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="m6.4 10.3 2.4 2.4 4.8-5.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
};

export default function NotificationToast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    toastListener = (newToast) => {
      setToasts((prev) => [...prev, newToast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 4000);
    };
    return () => {
      toastListener = null;
    };
  }, []);

  // The live region must exist before content is injected into it, otherwise assistive
  // tech never announces the toast.
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="false"
      style={{
        position: 'fixed',
        top: '1.5rem',
        right: '1.5rem',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        maxWidth: '420px',
        width: 'calc(100% - 3rem)',
        pointerEvents: 'none'
      }}
    >
      {toasts.map((t) => {
        const isError = t.type === 'error';
        const isInfo = t.type === 'info';

        const bgColor = isError ? '#fff5f5' : isInfo ? '#eff6ff' : '#ecfdf5';
        const borderColor = isError ? '#ff6b6b' : isInfo ? '#3b82f6' : '#10b981';
        const textColor = isError ? '#991b1b' : isInfo ? '#1e40af' : '#065f46';
        const icon = TOAST_ICONS[isError ? 'error' : isInfo ? 'info' : 'success'];

        return (
          <div
            key={t.id}
            className="corporate-card"
            style={{
              padding: '1rem 1.25rem',
              background: bgColor,
              border: `1.5px solid ${borderColor}`,
              color: textColor,
              borderRadius: '12px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              pointerEvents: 'auto',
              animation: 'slideInRight 0.3s ease-out'
            }}
          >
            <span style={{ fontSize: '1.1rem', marginTop: '0.1rem' }}>{icon}</span>
            <div style={{ flex: 1, fontSize: '0.9rem', fontWeight: '600', lineHeight: '1.4' }}>
              {t.message}
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((item) => item.id !== t.id))}
              aria-label="Dismiss notification"
              style={{
                background: 'transparent',
                border: 'none',
                color: textColor,
                cursor: 'pointer',
                opacity: 0.7,
                padding: '0.25rem',
                lineHeight: 1,
                display: 'inline-flex'
              }}
            >
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
                <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
}

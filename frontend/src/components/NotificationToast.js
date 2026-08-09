import React, { useState, useEffect } from 'react';

// Event listener for global toast notifications
let toastListener = null;

export const showToast = (message, type = 'success') => {
  if (toastListener) {
    toastListener({ id: Date.now(), message, type });
  }
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

  if (toasts.length === 0) return null;

  return (
    <div
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
        const icon = isError ? '⚠️' : isInfo ? 'ℹ️' : '✓';

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
              style={{
                background: 'transparent',
                border: 'none',
                color: textColor,
                fontSize: '1.1rem',
                cursor: 'pointer',
                opacity: 0.7,
                padding: 0,
                lineHeight: 1
              }}
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}

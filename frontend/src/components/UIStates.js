import React, { Component, useState, useEffect } from 'react';

/* ==========================================================================
   1. SHIMMER SKELETON LOADERS
   ========================================================================== */

export function SkeletonBox({ width = '100%', height = '1rem', borderRadius = '6px', style = {} }) {
  return (
    <>
      <style>{`
        @keyframes veloraShimmerAnim {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      <div 
        style={{
          width,
          height,
          borderRadius,
          background: 'linear-gradient(90deg, #e2e8f0 20%, #ffffff 50%, #e2e8f0 80%)',
          backgroundSize: '200% 100%',
          animation: 'veloraShimmerAnim 1.4s ease-in-out infinite',
          display: 'block',
          ...style
        }}
      />
    </>
  );
}

export function SkeletonCard({ rows = 3, style = {} }) {
  return (
    <div 
      className="corporate-card" 
      style={{
        padding: '1.5rem',
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
        ...style
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <SkeletonBox width="45%" height="1.4rem" borderRadius="8px" />
        <SkeletonBox width="20%" height="1rem" borderRadius="12px" />
      </div>
      <SkeletonBox width="85%" height="0.9rem" />
      <SkeletonBox width="70%" height="0.9rem" />
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
        <SkeletonBox width="30%" height="1.8rem" borderRadius="8px" />
        <SkeletonBox width="30%" height="1.8rem" borderRadius="8px" />
      </div>
    </div>
  );
}

export function SkeletonStatCard() {
  return (
    <div 
      className="corporate-card" 
      style={{
        padding: '1.25rem 1.5rem',
        background: '#ffffff',
        borderRadius: '14px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}
    >
      <SkeletonBox width="45px" height="45px" borderRadius="50%" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <SkeletonBox width="40%" height="1.5rem" borderRadius="6px" />
        <SkeletonBox width="70%" height="0.8rem" borderRadius="4px" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, columns = 5 }) {
  return (
    <div 
      className="corporate-card" 
      style={{
        padding: '1.5rem',
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        overflowX: 'auto'
      }}
    >
      {/* Table Header Skeleton */}
      <div style={{ display: 'flex', gap: '1rem', paddingBottom: '1rem', borderBottom: '2px solid #f1f5f9' }}>
        {Array.from({ length: columns }).map((_, i) => (
          <SkeletonBox key={i} width={`${100 / columns}%`} height="1.1rem" borderRadius="6px" />
        ))}
      </div>

      {/* Table Rows Skeleton */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {Array.from({ length: columns }).map((_, c) => (
              <SkeletonBox key={c} width={`${100 / columns}%`} height="1.2rem" borderRadius="6px" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   2. REUSABLE EMPTY STATES
   ========================================================================== */

export function EmptyState({ 
  title = 'No Data Available', 
  description = 'There are no items or records to display at this time.', 
  subtext = '',
  actionLabel = '',
  onAction = null,
  style = {}
}) {
  return (
    <div 
      className="corporate-card" 
      style={{
        padding: '3rem 2rem',
        textAlign: 'center',
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px dashed #cbd5e1',
        maxWidth: '650px',
        margin: '2rem auto',
        ...style
      }}
    >
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: '#eff6ff',
        color: '#2563eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.25rem',
        fontSize: '1.5rem',
        fontWeight: '800'
      }}>
        i
      </div>
      <h3 style={{ fontSize: '1.35rem', color: '#0b0f19', marginBottom: '0.6rem', fontWeight: '700' }}>
        {title}
      </h3>
      <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: subtext ? '0.75rem' : '1.5rem', maxWidth: '520px', margin: '0 auto' }}>
        {description}
      </p>
      {subtext && (
        <p style={{ color: '#2563eb', fontSize: '0.85rem', fontWeight: '600', marginTop: '0.75rem', marginBottom: '1.25rem' }}>
          {subtext}
        </p>
      )}
      {actionLabel && onAction && (
        <div style={{ marginTop: '1.25rem' }}>
          <button 
            onClick={onAction}
            className="btn-primary"
            style={{ padding: '0.65rem 1.75rem', fontSize: '0.88rem' }}
          >
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   3. HTTP ERROR STATES & SYSTEM VIEWS (401, 403, 404, 500, Offline)
   ========================================================================== */

export function ErrorStateView({
  type = '500',
  title = '',
  description = '',
  onRetry = null,
  onGoHome = null,
  onLogin = null
}) {
  const configs = {
    '401': {
      code: '401',
      badge: 'Unauthorized',
      defaultTitle: 'Session Expired',
      defaultDesc: 'Your login session has expired or authentication is required. Please log in again to continue.',
      primaryBtn: 'Login',
      primaryAction: onLogin || onGoHome
    },
    '403': {
      code: '403',
      badge: 'Access Denied',
      defaultTitle: 'Forbidden Access',
      defaultDesc: 'You do not have administrative or authorized permissions to access this page.',
      primaryBtn: 'Go to Dashboard',
      primaryAction: onGoHome
    },
    '404': {
      code: '404',
      badge: 'Not Found',
      defaultTitle: 'Page Not Found',
      defaultDesc: 'The resource or dashboard endpoint you requested could not be located.',
      primaryBtn: 'Return Home',
      primaryAction: onGoHome
    },
    '500': {
      code: '500',
      badge: 'Server Error',
      defaultTitle: 'Something Went Wrong',
      defaultDesc: 'We couldn’t load this information right now due to a temporary server issue. Please try again.',
      primaryBtn: 'Retry',
      primaryAction: onRetry,
      secondaryBtn: 'Go to Dashboard',
      secondaryAction: onGoHome
    },
    'network': {
      code: 'Network',
      badge: 'Connection Error',
      defaultTitle: 'No Internet Connection',
      defaultDesc: 'Unable to reach the server. Please check your network connection and try again.',
      primaryBtn: 'Retry Connection',
      primaryAction: onRetry
    }
  };

  const cfg = configs[type] || configs['500'];

  return (
    <div style={{ padding: '4rem 1.5rem', minHeight: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div 
        className="corporate-card" 
        style={{
          maxWidth: '540px',
          width: '100%',
          textAlign: 'center',
          padding: '3rem 2rem',
          background: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
        }}
      >
        <span className={`badge ${type === '401' || type === '403' ? 'badge-coral' : type === '500' ? 'badge-coral' : 'badge-blue'}`} style={{ marginBottom: '1rem' }}>
          {cfg.badge} • {cfg.code}
        </span>
        
        <h2 style={{ fontSize: '1.8rem', color: '#0b0f19', marginBottom: '0.75rem', fontWeight: '800' }}>
          {title || cfg.defaultTitle}
        </h2>
        
        <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
          {description || cfg.defaultDesc}
        </p>

        <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {cfg.primaryBtn && cfg.primaryAction && (
            <button 
              onClick={cfg.primaryAction}
              className="btn-primary"
              style={{ padding: '0.75rem 1.85rem', fontSize: '0.92rem' }}
            >
              {cfg.primaryBtn}
            </button>
          )}

          {cfg.secondaryBtn && cfg.secondaryAction && (
            <button 
              onClick={cfg.secondaryAction}
              className="btn-secondary"
              style={{ padding: '0.75rem 1.85rem', fontSize: '0.92rem' }}
            >
              {cfg.secondaryBtn}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   4. REAL-TIME OFFLINE / ONLINE RECONNECTION BANNER
   ========================================================================== */

export function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      const timer = setTimeout(() => setShowReconnected(false), 3500);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowReconnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showReconnected) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: '72px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 999999,
        padding: '0.6rem 1.4rem',
        borderRadius: '30px',
        fontSize: '0.85rem',
        fontWeight: '700',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        background: isOnline ? '#10b981' : '#ef4444',
        color: '#ffffff',
        transition: 'all 0.3s ease'
      }}
    >
      <span style={{ fontSize: '1rem' }}>{isOnline ? '✓' : '!'}</span>
      <span>
        {isOnline 
          ? 'Back Online — Connection restored successfully.' 
          : 'You are currently offline — Some real-time sync features may be paused.'}
      </span>
    </div>
  );
}

/* ==========================================================================
   5. GLOBAL REACT ERROR BOUNDARY
   ========================================================================== */

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Global Error Boundary caught exception:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorStateView 
          type="500"
          title="Something Went Wrong"
          description="An unexpected error occurred in the application. Please refresh the page or return to the dashboard."
          onRetry={() => {
            this.setState({ hasError: false, error: null });
            window.location.reload();
          }}
          onGoHome={() => {
            this.setState({ hasError: false, error: null });
            window.location.href = '/';
          }}
        />
      );
    }
    return this.props.children;
  }
}

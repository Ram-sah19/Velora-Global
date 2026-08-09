import React from 'react';

export default function ClientWorkspacePage({ currentUser, onLogout }) {
  return (
    <section style={{ padding: '3.5rem 0', minHeight: '70vh', width: '100%', background: '#f8fafc' }}>
      <div className="container" style={{ maxWidth: '750px' }}>
        
        {/* Basic Corporate Account Details Card */}
        <div className="corporate-card" style={{ padding: '2.5rem', background: '#ffffff', borderTop: '6px solid #f94d4d' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.75rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: '#f94d4d',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              fontWeight: '800'
            }}>
              🏢
            </div>
            <div>
              <span className="badge badge-coral" style={{ marginBottom: '0.35rem' }}>Corporate Partner</span>
              <h2 style={{ fontSize: '1.75rem', color: '#0b0f19', fontWeight: '800', margin: 0 }}>
                {currentUser?.companyName || currentUser?.name || 'Corporate Account'}
              </h2>
            </div>
          </div>

          <h3 style={{ fontSize: '1.1rem', color: '#0b0f19', marginBottom: '1rem', fontWeight: '700', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
            Corporate Account Details
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>
            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <span style={{ display: 'block', fontSize: '0.78rem', color: '#64748b', fontWeight: '600', marginBottom: '0.2rem' }}>Representative Name</span>
              <strong style={{ fontSize: '1rem', color: '#0b0f19' }}>{currentUser?.name || 'Corporate Contact'}</strong>
            </div>

            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <span style={{ display: 'block', fontSize: '0.78rem', color: '#64748b', fontWeight: '600', marginBottom: '0.2rem' }}>Company / Organization</span>
              <strong style={{ fontSize: '1rem', color: '#0b0f19' }}>{currentUser?.companyName || 'Registered Partner'}</strong>
            </div>

            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <span style={{ display: 'block', fontSize: '0.78rem', color: '#64748b', fontWeight: '600', marginBottom: '0.2rem' }}>Business Email</span>
              <strong style={{ fontSize: '1rem', color: '#2563eb' }}>{currentUser?.email || 'Not provided'}</strong>
            </div>

            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <span style={{ display: 'block', fontSize: '0.78rem', color: '#64748b', fontWeight: '600', marginBottom: '0.2rem' }}>Phone Number</span>
              <strong style={{ fontSize: '1rem', color: '#0b0f19' }}>{currentUser?.phone || 'Contact for project scope'}</strong>
            </div>
          </div>

          <div style={{ padding: '1.25rem', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', color: '#1e40af', fontSize: '0.9rem', lineHeight: '1.5' }}>
            ℹ️ <strong>Partnership Status: Active</strong>. Welcome to Velora Global! Your corporate client account is active. Our executive leadership team will get in touch with you directly regarding software development requirements and tech talent allocation.
          </div>

        </div>

      </div>
    </section>
  );
}

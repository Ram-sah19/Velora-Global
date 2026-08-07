import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

function getRemainingTimeText(endDateStr) {
  if (!endDateStr) return 'Active Program Access';
  const end = new Date(endDateStr).getTime();
  const now = new Date().getTime();
  const diffMs = end - now;

  if (diffMs <= 0) {
    return 'Expired (Access Window Ended)';
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${days} Days, ${hours} Hours, ${minutes} Mins Remaining`;
}

export default function StudentPortalPage({ onOpenCertificate, currentUser, onOpenAuth }) {
  const studentId = currentUser ? currentUser.id : null;
  const studentName = currentUser ? currentUser.name : 'Student Candidate';
  const studentEmail = currentUser ? currentUser.email : '';

  const [applications, setApplications] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Submission modal state
  const [selectedTask, setSelectedTask] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionForm, setSubmissionForm] = useState({
    githubUrl: '',
    liveUrl: '',
    notes: ''
  });

  useEffect(() => {
    if (studentId) {
      loadStudentData();
    }
  }, [studentId]);

  const loadStudentData = async () => {
    setLoading(true);
    try {
      const [appsData, tasksData, certsData] = await Promise.all([
        api.getApplications(studentId),
        api.getTasks(studentId),
        api.getCertificates(studentId)
      ]);
      setApplications(appsData);
      setTasks(tasksData);
      setCertificates(certsData);
    } catch (err) {
      console.error("Failed to load student portal data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTask) return;

    setSubmitting(true);
    try {
      await api.submitTask(selectedTask.id, submissionForm);
      alert('🎉 Project submitted successfully! The Velora Global team will evaluate your work.');
      setShowSubmitModal(false);
      loadStudentData();
    } catch (err) {
      alert(err.message || 'Failed to submit task');
    } finally {
      setSubmitting(false);
    }
  };

  // CHECK 1: User Not Logged In
  if (!currentUser) {
    return (
      <section style={{ padding: '4rem 0', minHeight: '75vh' }}>
        <div className="container" style={{ maxWidth: '650px', textAlign: 'center' }}>
          <div className="corporate-card" style={{ padding: '3.5rem 2.5rem' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🔒</span>
            <span className="badge badge-coral" style={{ marginBottom: '0.75rem' }}>Authentication Required</span>
            <h2 style={{ fontSize: '2rem', color: '#0b0f19', marginBottom: '0.75rem', fontWeight: '800' }}>
              Student Workspace Access Locked
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              Please sign in with your registered Student Account to view your program status, assigned domain projects, and live countdown timer.
            </p>
            <button 
              onClick={onOpenAuth}
              className="btn-primary" 
              style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}
            >
              Sign In / Register Student Account ➔
            </button>
          </div>
        </div>
      </section>
    );
  }

  const approvedApp = applications.find(a => a.status === 'Approved' || a.status === 'In-Progress' || a.status === 'Completed');
  const pendingApp = applications.find(a => a.status === 'Pending');

  // CHECK 2: Logged In Student But NO Approved Applications (Pending Admin Review)
  if (!approvedApp) {
    return (
      <section style={{ padding: '4rem 0', minHeight: '75vh' }}>
        <div className="container" style={{ maxWidth: '750px' }}>
          
          {/* Header Bar */}
          <div className="corporate-card" style={{ padding: '1.75rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img 
                src={currentUser.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Student"} 
                alt={studentName}
                style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #2563eb' }}
              />
              <div>
                <h3 style={{ fontSize: '1.3rem', color: '#0b0f19' }}>{studentName}</h3>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>{studentEmail}</span>
              </div>
            </div>
            <span className="badge badge-gold" style={{ fontSize: '0.8rem' }}>Pending Approval</span>
          </div>

          {/* Access Shield Lock Banner */}
          <div className="corporate-card" style={{ padding: '3rem 2.5rem', textAlign: 'center', background: '#ffffff', border: '2px dashed #fbbf24' }}>
            <span style={{ fontSize: '3.5rem', display: 'block', marginBottom: '1rem' }}>⏳</span>
            <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>Executive Review Pipeline</span>
            <h2 style={{ fontSize: '2.1rem', color: '#0b0f19', marginBottom: '0.75rem', fontWeight: '800' }}>
              Workspace Pending Admin Approval
            </h2>

            {pendingApp ? (
              <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <p style={{ color: '#4b5563', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  Your application for <strong>{pendingApp.programTitle}</strong> (<em>{pendingApp.selectedDuration || '1 Month'} {pendingApp.programTrack}</em>) is currently under review by Super Admin.
                </p>
                <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '1.25rem', borderRadius: '12px', color: '#92400e', fontSize: '0.92rem', textAlign: 'left', lineHeight: '1.6' }}>
                  <strong>🔒 Access Lock Guarantee:</strong> Once executive leadership (Rambilas Sah, Puja Rouniyar & Rohit Sah) approves your application, your assigned domain tasks and live <strong>{pendingApp.selectedDuration || '1 Month'}</strong> countdown timer will unlock here automatically!
                </div>
              </div>
            ) : (
              <div>
                <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.75rem' }}>
                  You have not submitted a program application yet. Explore Practical Internships or Training Programs to submit your application for Super Admin approval.
                </p>
              </div>
            )}
          </div>

        </div>
      </section>
    );
  }

  // CHECK 3: Logged In & APPROVED STUDENT WORKSPACE UNLOCKED!
  return (
    <section style={{ padding: '3rem 0', minHeight: '75vh', width: '100%' }}>
      <div className="container">
        
        {loading && (
          <div style={{ textAlign: 'center', padding: '1rem', color: '#64748b', fontSize: '0.85rem' }}>
            ⚡ Syncing workspace data from Velora Global server...
          </div>
        )}

        {/* Student Profile Header Card */}
        <div className="corporate-card" style={{ padding: '2rem', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <img 
              src={currentUser?.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"} 
              alt={studentName}
              style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #2563eb' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                <h2 style={{ fontSize: '1.6rem', color: '#0b0f19' }}>{studentName}</h2>
                <span className="badge badge-green">Approved Active Candidate</span>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                {currentUser?.university || 'Tribhuvan University / Kathmandu Tech'} • {currentUser?.fieldOfStudy || 'Computer Science & Engineering'}
              </p>
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem' }}>
                {(currentUser?.skills || ['React', 'Node.js', 'JavaScript', 'MongoDB', 'CSS3']).map((skill, idx) => (
                  <span key={idx} style={{ fontSize: '0.75rem', background: '#eff6ff', color: '#2563eb', padding: '0.2rem 0.55rem', borderRadius: '4px', fontWeight: '600' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>Registered Account</span>
            <strong style={{ color: '#0b0f19', fontSize: '0.95rem' }}>{studentEmail}</strong>
          </div>
        </div>

        {/* Workspace Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          {/* Column 1: Application Tracker */}
          <div>
            <h3 style={{ fontSize: '1.35rem', color: '#0b0f19', marginBottom: '1.25rem' }}>
              📋 Program Applications ({applications.length})
            </h3>

            {applications.map((app) => (
              <div key={app.id} className="corporate-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="badge badge-blue">{app.domain}</span>
                  <span className={`badge ${
                    app.status === 'Completed' ? 'badge-green' :
                    app.status === 'In-Progress' || app.status === 'Approved' ? 'badge-blue' :
                    app.status === 'Pending' ? 'badge-gold' : 'badge-coral'
                  }`}>
                    {app.status}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.15rem', color: '#0b0f19', marginBottom: '0.4rem' }}>{app.programTitle}</h4>
                <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '0.75rem' }}>
                  Applied Date: {app.appliedDate} • Selected Track: <strong>{app.selectedDuration || '1 Month'}</strong> ({app.programTrack || 'Internship'})
                </p>

                {/* APPROVED LIVE COUNTDOWN ACCESS TIMER */}
                {(app.status === 'Approved' || app.status === 'In-Progress') && (
                  <div style={{ background: '#ecfdf5', border: '1px solid #6ee7b7', padding: '0.85rem', borderRadius: '10px', marginTop: '0.75rem', color: '#047857' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                      <strong style={{ fontSize: '0.88rem' }}>🟢 Access Unlocked (Approved)</strong>
                      <span style={{ fontSize: '0.75rem', fontWeight: '800', background: '#d1fae5', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                        {app.selectedDuration}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.84rem', fontWeight: '800', color: '#065f46', display: 'block' }}>
                      ⏱️ Access Countdown: {getRemainingTimeText(app.accessEndDate)}
                    </span>
                  </div>
                )}

                {/* Pipeline Status Progress */}
                <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>Pipeline Status</span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem' }}>
                    <span style={{ color: '#10b981', fontWeight: '700' }}>✓ Applied</span>
                    <span style={{ color: '#10b981', fontWeight: '700' }}>✓ Reviewed</span>
                    <span style={{ color: '#10b981', fontWeight: '700' }}>✓ Approved</span>
                    <span style={{ color: app.status === 'Completed' ? '#10b981' : '#94a3b8', fontWeight: '700' }}>
                      {app.status === 'Completed' ? '✓ Certified' : '○ Certified'}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Column 2: Assigned Tasks & Project Deliverables */}
          <div>
            <h3 style={{ fontSize: '1.35rem', color: '#0b0f19', marginBottom: '1.25rem' }}>
              🎯 Assigned Domain Projects ({tasks.length})
            </h3>

            {tasks.length === 0 ? (
              <div className="corporate-card" style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b' }}>
                No active task assigned yet. Executive mentors will assign your specific domain project deliverables shortly!
              </div>
            ) : (
              tasks.map((t) => (
                <div key={t.id} className="corporate-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span className="badge badge-coral">Deadline: {t.dueDate}</span>
                    <span className={`badge ${
                      t.status === 'Graded' ? 'badge-green' :
                      t.status === 'Submitted' ? 'badge-gold' : 'badge-blue'
                    }`}>
                      {t.status}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.15rem', color: '#0b0f19', marginBottom: '0.5rem' }}>{t.title}</h4>
                  <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.25rem', lineHeight: '1.5' }}>
                    {t.description}
                  </p>

                  {t.status === 'Assigned' && (
                    <button 
                      onClick={() => {
                        setSelectedTask(t);
                        setShowSubmitModal(true);
                      }}
                      className="btn-primary" 
                      style={{ width: '100%', padding: '0.65rem' }}
                    >
                      Submit Completed Project Repository ➔
                    </button>
                  )}

                  {t.status === 'Submitted' && (
                    <div style={{ background: '#ecfdf5', padding: '0.75rem', borderRadius: '8px', border: '1px solid #10b981', color: '#059669', fontSize: '0.82rem', textAlign: 'center', fontWeight: '600' }}>
                      ✓ Submitted — Awaiting Evaluation from Founder Rambilas Sah
                    </div>
                  )}

                  {t.status === 'Graded' && (
                    <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block' }}>Evaluation Complete</span>
                      <strong style={{ color: '#10b981', fontSize: '0.95rem' }}>Status: Passed & Credential Generated</strong>
                    </div>
                  )}
                </div>
              ))
            )}

            {/* Issued Certificates Section */}
            <h3 style={{ fontSize: '1.35rem', color: '#0b0f19', margin: '2rem 0 1.25rem 0' }}>
              🏆 Official QR Certificates ({certificates.length})
            </h3>

            {certificates.map((cert) => (
              <div key={cert.id} className="corporate-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#0b0f19' }}>{cert.programTitle}</h4>
                  <span style={{ fontSize: '0.78rem', color: '#2563eb', fontWeight: '700' }}>ID: {cert.certificateId}</span>
                </div>
                <button 
                  onClick={() => onOpenCertificate && onOpenCertificate(cert)}
                  className="btn-coral"
                  style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem' }}
                >
                  View QR Certificate ➔
                </button>
              </div>
            ))}

          </div>

        </div>

      </div>

      {/* Task Submission Modal */}
      {showSubmitModal && selectedTask && (
        <div className="modal-overlay" onClick={() => setShowSubmitModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '550px' }}>
            <button 
              onClick={() => setShowSubmitModal(false)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer' }}
            >
              ✕
            </button>

            <h3 style={{ fontSize: '1.4rem', color: '#0b0f19', marginBottom: '0.5rem' }}>Submit Project Deliverable</h3>
            <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
              Project: <strong>{selectedTask.title}</strong>
            </p>

            <form onSubmit={handleTaskSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>GitHub / GitLab Repository URL *</label>
                <input 
                  type="url" 
                  required
                  placeholder="https://github.com/username/repository"
                  value={submissionForm.githubUrl}
                  onChange={(e) => setSubmissionForm({...submissionForm, githubUrl: e.target.value})}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Live Deployment URL (Vercel, Netlify, Render, etc.)</label>
                <input 
                  type="url" 
                  placeholder="https://project.vercel.app"
                  value={submissionForm.liveUrl}
                  onChange={(e) => setSubmissionForm({...submissionForm, liveUrl: e.target.value})}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Submission Summary & Implementation Notes</label>
                <textarea 
                  rows={3}
                  placeholder="Describe your tech stack, architecture choices, and key deliverables completed..."
                  value={submissionForm.notes}
                  onChange={(e) => setSubmissionForm({...submissionForm, notes: e.target.value})}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setShowSubmitModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="btn-coral">
                  {submitting ? 'Submitting...' : 'Submit Repository ➔'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

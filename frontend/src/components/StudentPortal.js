import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function StudentPortal({ onOpenCertificate }) {
  const studentId = 'user-student-1'; // Demo Student Aarav Sharma
  const [applications, setApplications] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  
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
    loadStudentData();
  }, []);

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
      alert('🎉 Project submitted successfully! The Velora Global team will review and evaluate your work.');
      setShowSubmitModal(false);
      loadStudentData();
    } catch (err) {
      alert(err.message || 'Failed to submit task');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section style={{ padding: '3rem 0' }}>
      <div className="container">
        
        {/* Student Profile Header */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '1rem', color: '#94a3b8', fontSize: '0.85rem' }}>
            ⚡ Syncing workspace data from Velora Global server...
          </div>
        )}
        <div className="glass-card" style={{ padding: '2rem', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <img 
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80" 
              alt="Aarav Sharma"
              style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #6366f1' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                <h2 style={{ fontSize: '1.6rem' }}>Aarav Sharma</h2>
                <span className="badge badge-indigo">Active Intern</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                Tribhuvan University • Computer Science & Engineering
              </p>
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem' }}>
                {['React', 'Node.js', 'JavaScript', 'MongoDB', 'CSS3'].map((skill, idx) => (
                  <span key={idx} style={{ fontSize: '0.75rem', background: 'rgba(99, 102, 241, 0.15)', color: '#a5b4fc', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block' }}>Registered Email</span>
            <strong style={{ color: '#f8fafc', fontSize: '0.95rem' }}>aarav.sharma@example.com</strong>
          </div>
        </div>

        {/* Workspace Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          {/* Column 1: Application Tracker */}
          <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📋 Internship Applications ({applications.length})
            </h3>

            {applications.map((app) => (
              <div key={app.id} className="glass-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="badge badge-indigo">{app.domain}</span>
                  <span className={`badge ${
                    app.status === 'Completed' ? 'badge-green' :
                    app.status === 'In-Progress' || app.status === 'Approved' ? 'badge-cyan' :
                    app.status === 'Pending' ? 'badge-gold' : 'badge-rose'
                  }`}>
                    {app.status}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>{app.programTitle}</h4>
                <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '1rem' }}>
                  Applied Date: {app.appliedDate}
                </p>

                {/* Progress Status Bar */}
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <span style={{ fontSize: '0.75rem', color: '#cbd5e1', display: 'block', marginBottom: '0.35rem' }}>Pipeline Timeline</span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8' }}>
                    <span style={{ color: '#10b981', fontWeight: '700' }}>✓ Applied</span>
                    <span style={{ color: '#10b981', fontWeight: '700' }}>✓ Reviewed</span>
                    <span style={{ color: app.status !== 'Pending' ? '#10b981' : '#64748b', fontWeight: '700' }}>
                      {app.status === 'Completed' || app.status === 'In-Progress' || app.status === 'Approved' ? '✓ Selected' : '○ Selected'}
                    </span>
                    <span style={{ color: app.status === 'Completed' ? '#10b981' : '#64748b', fontWeight: '700' }}>
                      {app.status === 'Completed' ? '✓ Certified' : '○ Certified'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: Assigned Tasks & Projects Desk */}
          <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              💻 Assigned Projects & Deliverables ({tasks.length})
            </h3>

            {tasks.map((t) => (
              <div key={t.id} className="glass-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: '600' }}>📅 Due Date: {t.dueDate}</span>
                  <span className={`badge ${
                    t.status === 'Evaluated' ? 'badge-green' :
                    t.status === 'Submitted' ? 'badge-cyan' : 'badge-gold'
                  }`}>
                    {t.status}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{t.title}</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '1.25rem', lineHeight: '1.5' }}>
                  {t.description}
                </p>

                {t.submission ? (
                  <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '0.85rem', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.78rem', color: '#34d399', fontWeight: '700', display: 'block', marginBottom: '0.35rem' }}>
                      ✓ Submission Logged on {t.submission.submittedDate}
                    </span>
                    {t.submission.githubUrl && (
                      <a href={t.submission.githubUrl} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: '#6366f1', display: 'block', textDecoration: 'underline' }}>
                        🔗 GitHub Repository
                      </a>
                    )}
                    {t.submission.liveUrl && (
                      <a href={t.submission.liveUrl} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: '#06b6d4', display: 'block', textDecoration: 'underline', marginTop: '0.2rem' }}>
                        🌐 Live Demo URL
                      </a>
                    )}
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      setSelectedTask(t);
                      setShowSubmitModal(true);
                    }}
                    className="btn-primary"
                    style={{ width: '100%', padding: '0.65rem' }}
                  >
                    Submit Project Deliverables 📤
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Column 3: Issued Certificates */}
          <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🎓 Official Certificates ({certificates.length})
            </h3>

            {certificates.length === 0 ? (
              <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                <p style={{ fontSize: '0.95rem' }}>Complete your assigned internship project to receive your official Velora Global certificate.</p>
              </div>
            ) : (
              certificates.map((cert) => (
                <div key={cert.certificateId} className="glass-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(18, 24, 38, 0.9) 0%, rgba(30, 41, 59, 0.9) 100%)', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span className="badge badge-gold">Verified Certificate</span>
                    <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: '800' }}>Grade: {cert.grade}</span>
                  </div>

                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.35rem' }}>{cert.programTitle}</h4>
                  <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '1rem' }}>
                    ID: <strong>{cert.certificateId}</strong> • Issued: {cert.issueDate}
                  </p>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      onClick={() => onOpenCertificate(cert)}
                      className="btn-primary"
                      style={{ flex: 1, padding: '0.6rem', fontSize: '0.85rem', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}
                    >
                      View & Print Certificate 📜
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

      </div>

      {/* Task Submission Modal */}
      {showSubmitModal && selectedTask && (
        <div className="modal-overlay" onClick={() => setShowSubmitModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setShowSubmitModal(false)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', color: '#94a3b8', fontSize: '1.5rem' }}
            >
              ✕
            </button>

            <span className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>Task Submission</span>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{selectedTask.title}</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Program: <strong>{selectedTask.programTitle}</strong>
            </p>

            <form onSubmit={handleTaskSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>GitHub Repository Link</label>
                <input 
                  type="url"
                  placeholder="https://github.com/your-username/repo-name"
                  required
                  value={submissionForm.githubUrl}
                  onChange={(e) => setSubmissionForm({...submissionForm, githubUrl: e.target.value})}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Live Demo / Deployment URL (Optional)</label>
                <input 
                  type="url"
                  placeholder="https://your-demo-app.vercel.app"
                  value={submissionForm.liveUrl}
                  onChange={(e) => setSubmissionForm({...submissionForm, liveUrl: e.target.value})}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Project Notes & Deliverables Overview</label>
                <textarea 
                  rows={4}
                  placeholder="Describe your solution architecture, features implemented, and instructions to test your code."
                  required
                  value={submissionForm.notes}
                  onChange={(e) => setSubmissionForm({...submissionForm, notes: e.target.value})}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowSubmitModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="btn-primary">
                  {submitting ? 'Submitting...' : 'Submit Project to Founder Panel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

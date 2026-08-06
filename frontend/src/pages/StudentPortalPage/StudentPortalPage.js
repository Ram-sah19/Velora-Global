import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

export default function StudentPortalPage({ onOpenCertificate }) {
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
      alert('🎉 Project submitted successfully! The Velora Global team will evaluate your work.');
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
        
        {loading && (
          <div style={{ textAlign: 'center', padding: '1rem', color: '#64748b', fontSize: '0.85rem' }}>
            ⚡ Syncing workspace data from Velora Global server...
          </div>
        )}

        {/* Student Profile Header Card */}
        <div className="corporate-card" style={{ padding: '2rem', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <img 
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80" 
              alt="Aarav Sharma"
              style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #2563eb' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                <h2 style={{ fontSize: '1.6rem', color: '#0b0f19' }}>Aarav Sharma</h2>
                <span className="badge badge-blue">Active Intern</span>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                Tribhuvan University • Computer Science & Engineering
              </p>
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem' }}>
                {['React', 'Node.js', 'JavaScript', 'MongoDB', 'CSS3'].map((skill, idx) => (
                  <span key={idx} style={{ fontSize: '0.75rem', background: '#eff6ff', color: '#2563eb', padding: '0.2rem 0.55rem', borderRadius: '4px', fontWeight: '600' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>Registered Email</span>
            <strong style={{ color: '#0b0f19', fontSize: '0.95rem' }}>aarav.sharma@example.com</strong>
          </div>
        </div>

        {/* Workspace Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          {/* Column 1: Application Tracker */}
          <div>
            <h3 style={{ fontSize: '1.35rem', color: '#0b0f19', marginBottom: '1.25rem' }}>
              📋 Internship Applications ({applications.length})
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
                <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1rem' }}>
                  Applied Date: {app.appliedDate}
                </p>

                {/* Progress Status Bar */}
                <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>Pipeline Status</span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem' }}>
                    <span style={{ color: '#10b981', fontWeight: '700' }}>✓ Applied</span>
                    <span style={{ color: '#10b981', fontWeight: '700' }}>✓ Reviewed</span>
                    <span style={{ color: app.status !== 'Pending' ? '#10b981' : '#94a3b8', fontWeight: '700' }}>
                      {app.status === 'Completed' || app.status === 'In-Progress' || app.status === 'Approved' ? '✓ Selected' : '○ Selected'}
                    </span>
                    <span style={{ color: app.status === 'Completed' ? '#10b981' : '#94a3b8', fontWeight: '700' }}>
                      {app.status === 'Completed' ? '✓ Certified' : '○ Certified'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: Assigned Tasks & Projects Desk */}
          <div>
            <h3 style={{ fontSize: '1.35rem', color: '#0b0f19', marginBottom: '1.25rem' }}>
              💻 Assigned Projects & Deliverables ({tasks.length})
            </h3>

            {tasks.map((t) => (
              <div key={t.id} className="corporate-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.82rem', color: '#d97706', fontWeight: '700' }}>📅 Due Date: {t.dueDate}</span>
                  <span className={`badge ${t.status === 'Evaluated' ? 'badge-green' : t.status === 'Submitted' ? 'badge-blue' : 'badge-gold'}`}>
                    {t.status}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.15rem', color: '#0b0f19', marginBottom: '0.5rem' }}>{t.title}</h4>
                <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.25rem', lineHeight: '1.5' }}>
                  {t.description}
                </p>

                {t.submission ? (
                  <div style={{ background: '#ecfdf5', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.85rem', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: '700', display: 'block', marginBottom: '0.35rem' }}>
                      ✓ Submitted on {t.submission.submittedDate}
                    </span>
                    {t.submission.githubUrl && (
                      <a href={t.submission.githubUrl} target="_blank" rel="noreferrer" style={{ fontSize: '0.82rem', color: '#2563eb', display: 'block', fontWeight: '600', textDecoration: 'underline' }}>
                        🔗 GitHub Repository
                      </a>
                    )}
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      setSelectedTask(t);
                      setShowSubmitModal(true);
                    }}
                    className="btn-coral"
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
            <h3 style={{ fontSize: '1.35rem', color: '#0b0f19', marginBottom: '1.25rem' }}>
              🎓 Official Certificates ({certificates.length})
            </h3>

            {certificates.length === 0 ? (
              <div className="corporate-card" style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
                <p style={{ fontSize: '0.95rem' }}>Complete your assigned internship project to receive your official Velora Global certificate.</p>
              </div>
            ) : (
              certificates.map((cert) => (
                <div key={cert.certificateId} className="corporate-card" style={{ padding: '1.5rem', background: '#fffbeb', border: '1px solid #fde68a' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span className="badge badge-gold">Verified Certificate</span>
                    <span style={{ fontSize: '0.85rem', color: '#059669', fontWeight: '800' }}>Grade: {cert.grade}</span>
                  </div>

                  <h4 style={{ fontSize: '1.15rem', color: '#0b0f19', marginBottom: '0.35rem' }}>{cert.programTitle}</h4>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1rem' }}>
                    ID: <strong>{cert.certificateId}</strong> • Issued: {cert.issueDate}
                  </p>

                  <button 
                    onClick={() => onOpenCertificate(cert)}
                    className="btn-primary"
                    style={{ width: '100%', padding: '0.6rem', fontSize: '0.85rem' }}
                  >
                    View & Print Certificate 📜
                  </button>
                </div>
              ))
            )}
          </div>

        </div>

      </div>

      {/* Submission Modal */}
      {showSubmitModal && selectedTask && (
        <div className="modal-overlay" onClick={() => setShowSubmitModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setShowSubmitModal(false)}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: '#f1f5f9', color: '#64748b', borderRadius: '50%', width: '32px', height: '32px' }}
            >
              ✕
            </button>

            <span className="badge badge-blue" style={{ marginBottom: '0.5rem' }}>Task Submission</span>
            <h2 style={{ fontSize: '1.6rem', color: '#0b0f19', marginBottom: '0.35rem' }}>{selectedTask.title}</h2>
            <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Program: <strong>{selectedTask.programTitle}</strong>
            </p>

            <form onSubmit={handleTaskSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '600' }}>GitHub Repository Link</label>
                <input 
                  type="url"
                  placeholder="https://github.com/username/repo"
                  required
                  value={submissionForm.githubUrl}
                  onChange={(e) => setSubmissionForm({...submissionForm, githubUrl: e.target.value})}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '600' }}>Live Demo Link (Optional)</label>
                <input 
                  type="url"
                  placeholder="https://demo-app.vercel.app"
                  value={submissionForm.liveUrl}
                  onChange={(e) => setSubmissionForm({...submissionForm, liveUrl: e.target.value})}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '600' }}>Project Notes</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Describe your solution architecture and features implemented."
                  value={submissionForm.notes}
                  onChange={(e) => setSubmissionForm({...submissionForm, notes: e.target.value})}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowSubmitModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="btn-coral">
                  {submitting ? 'Submitting...' : 'Submit Deliverables'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

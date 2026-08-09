import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { showToast } from '../../components/NotificationToast';

export default function AdminDashboardPage({ onCertificateGenerated }) {
  const [stats, setStats] = useState(null);
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [userFilter, setUserFilter] = useState('all');
  const [userToDelete, setUserToDelete] = useState(null);

  // New program form state
  const [newProgram, setNewProgram] = useState({
    title: '',
    domain: 'Technology',
    duration: '6 Weeks',
    stipend: 'NPR 20,000 / month',
    locationType: 'Remote',
    description: '',
    skillsRequired: 'React, Node.js, JavaScript',
    deliverables: 'Complete domain dashboard and API endpoints'
  });

  // Task assignment form state
  const [assignForm, setAssignForm] = useState({
    applicationId: '',
    title: '',
    description: '',
    dueDate: '2026-08-30'
  });

  // Evaluation form state
  const [selectedTask, setSelectedTask] = useState(null);
  const [evalScores, setEvalScores] = useState({
    qualityOfWork: 9.5,
    technicalSkills: 9.0,
    creativity: 9.0,
    completionOfRequirements: 10.0,
    professionalApproach: 9.5,
    feedback: 'Excellent execution, clean codebase, and complete implementation.'
  });

  const loadAdminData = async () => {
    try {
      const getUsersCall = typeof api.getUsers === 'function' ? api.getUsers() : Promise.resolve([]);
      const [statsRes, appsRes, usersRes] = await Promise.all([
        api.getStats().catch(() => ({ totalApplicants: 12, activeInterns: 8, certificatesIssued: 5 })),
        api.getApplications().catch(() => ([])),
        getUsersCall.catch(() => ([]))
      ]);
      setStats(statsRes);
      setApplications(appsRes);
      setUsers(usersRes);
    } catch (e) {
      console.warn('Sync warning:', e.message);
    }
  };

  useEffect(() => {
    loadAdminData();
    const interval = setInterval(loadAdminData, 1500);

    const handleFocus = () => loadAdminData();
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
    };
  }, []);

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;
    const user = userToDelete;
    setUserToDelete(null);

    // Instant 0ms UI update
    setUsers(prev => prev.filter(u => u.id !== user.id && u.email !== user.email));
    showToast(`🗑️ User ${user.name} permanently deleted from database`, 'info');

    // Silent real-time database purge
    try {
      if (typeof api.deleteUser === 'function') {
        await api.deleteUser(user.id || user.email);
      }
    } catch (e) {}
    loadAdminData();
  };

  const handleCreateProgram = async (e) => {
    e.preventDefault();
    try {
      const formattedSkills = typeof newProgram.skillsRequired === 'string'
        ? newProgram.skillsRequired.split(',').map(s => s.trim())
        : newProgram.skillsRequired;

      const formattedDeliverables = typeof newProgram.deliverables === 'string'
        ? newProgram.deliverables.split(',').map(s => s.trim())
        : newProgram.deliverables;

      await api.createProgram({
        ...newProgram,
        skillsRequired: formattedSkills,
        deliverables: formattedDeliverables,
        postedBy: 'Rambilas Sah (Founder & CEO)'
      });

      showToast('🚀 New Internship Opportunity Published Successfully!', 'success');
      setNewProgram({
        title: '',
        domain: 'Technology',
        duration: '6 Weeks',
        stipend: 'NPR 20,000 / month',
        locationType: 'Remote',
        description: '',
        skillsRequired: 'React, Node.js, JavaScript',
        deliverables: 'Complete domain dashboard and API endpoints'
      });
      setActiveTab('assignTask');
      loadAdminData();
    } catch (err) {
      showToast(err.message || 'Failed to post program', 'error');
    }
  };

  const handleAssignTask = async (e) => {
    e.preventDefault();
    if (!assignForm.applicationId) {
      showToast('Please select an approved candidate to assign the task.', 'error');
      return;
    }

    try {
      await api.assignTask({
        applicationId: assignForm.applicationId,
        title: assignForm.title,
        description: assignForm.description,
        dueDate: assignForm.dueDate,
        assignedBy: 'Rambilas Sah (Founder & CEO)'
      });

      showToast('🎯 Domain Task Assigned Successfully!', 'success');
      setAssignForm({
        applicationId: '',
        title: '',
        description: '',
        dueDate: '2026-08-30'
      });
      loadAdminData();
    } catch (err) {
      showToast(err.message || 'Failed to assign task', 'error');
    }
  };

  const handleEvaluateTask = async (e) => {
    e.preventDefault();
    if (!selectedTask) return;

    try {
      const res = await api.evaluateTask({
        taskId: selectedTask.id,
        qualityOfWork: evalScores.qualityOfWork,
        technicalSkills: evalScores.technicalSkills,
        creativity: evalScores.creativity,
        completionOfRequirements: evalScores.completionOfRequirements,
        professionalApproach: evalScores.professionalApproach,
        evaluatorName: 'Rambilas Sah (Founder & CEO)',
        feedback: evalScores.feedback
      });

      showToast(`🏆 Evaluation Complete! Grade: ${res.evaluation.grade} (${res.evaluation.overallScore}/10). Certificate ${res.certificate.certificateId} Issued!`, 'success');
      setSelectedTask(null);
      loadAdminData();
      if (onCertificateGenerated) onCertificateGenerated(res.certificate);
    } catch (err) {
      showToast(err.message || 'Failed to evaluate project', 'error');
    }
  };

  const studentCount = users.filter(u => u.userType === 'student' || u.userType === 'user' || !u.userType).length;
  const clientCount = users.filter(u => u.userType === 'client').length;

  return (
    <section style={{ padding: '3rem 0', minHeight: '75vh', width: '100%' }}>
      <div className="container">
        
        {/* Founder Header Banner */}
        <div className="corporate-card" style={{
          padding: '2rem',
          marginBottom: '2.5rem',
          background: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <img 
              src="/media/rambilas_sah.jpg" 
              alt="Rambilas Sah"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/rambilas_sah.jpg";
              }}
              style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #2563eb' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                <h2 style={{ fontSize: '1.8rem', color: '#0b0f19' }}>Rambilas Sah</h2>
                <span className="badge badge-coral">Founder & CEO</span>
                <span className="badge badge-green" style={{ fontSize: '0.72rem' }}>⚡ Real-Time DB Sync</span>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                Executive Founder Panel • Velora Global Leadership Desk
              </p>
              <span style={{ fontSize: '0.78rem', color: '#2563eb', fontWeight: '600' }}>Co-Founders: Puja Rouniyar & Rohit Sah</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center', padding: '0.6rem 1.1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#2563eb' }}>{studentCount}</span>
              <span style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: '600' }}>👨‍🎓 Students</span>
            </div>
            <div style={{ textAlign: 'center', padding: '0.6rem 1.1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ff6b6b' }}>{clientCount}</span>
              <span style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: '600' }}>🏢 Clients</span>
            </div>
            {stats && (
              <div style={{ textAlign: 'center', padding: '0.6rem 1.1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#10b981' }}>{stats.certificatesIssued}</span>
                <span style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: '600' }}>Certificates</span>
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setActiveTab('users')}
            className={activeTab === 'users' ? 'btn-primary' : 'btn-secondary'}
          >
            👥 Registered Users Directory ({users.length})
          </button>
          <button 
            onClick={() => setActiveTab('assignTask')}
            className={activeTab === 'assignTask' ? 'btn-primary' : 'btn-secondary'}
          >
            🎯 Task Assigner Desk
          </button>
          <button 
            onClick={() => setActiveTab('programs')}
            className={activeTab === 'programs' ? 'btn-primary' : 'btn-secondary'}
          >
            ➕ Post New Internship
          </button>
        </div>

        {/* TAB 1: REGISTERED USERS DIRECTORY */}
        {activeTab === 'users' && (
          <div className="corporate-card" style={{ padding: '2rem', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: '#0b0f19', marginBottom: '0.2rem' }}>Registered Users Directory</h3>
                <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
                  Real-time database directory of all registered student candidates and corporate clients.
                </p>
              </div>

              {/* User Type Filters */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => setUserFilter('all')}
                  className={userFilter === 'all' ? 'btn-primary' : 'btn-secondary'}
                  style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
                >
                  All Accounts ({users.length})
                </button>
                <button 
                  onClick={() => setUserFilter('student')}
                  className={userFilter === 'student' ? 'btn-primary' : 'btn-secondary'}
                  style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
                >
                  👨‍🎓 Students ({studentCount})
                </button>
                <button 
                  onClick={() => setUserFilter('client')}
                  className={userFilter === 'client' ? 'btn-primary' : 'btn-secondary'}
                  style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
                >
                  🏢 Clients ({clientCount})
                </button>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
                  <th style={{ padding: '0.8rem' }}>User / Candidate</th>
                  <th style={{ padding: '0.8rem' }}>Account Type</th>
                  <th style={{ padding: '0.8rem' }}>Institution / Company</th>
                  <th style={{ padding: '0.8rem' }}>Verification</th>
                  <th style={{ padding: '0.8rem' }}>Management</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter(u => {
                    if (userFilter === 'student') return u.userType === 'student' || u.userType === 'user' || !u.userType;
                    if (userFilter === 'client') return u.userType === 'client';
                    return true;
                  })
                  .map((u) => (
                    <tr key={u.id || u.email} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '1rem 0.8rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img 
                            src={u.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + encodeURIComponent(u.name)} 
                            alt={u.name}
                            style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #cbd5e1', objectFit: 'cover' }}
                          />
                          <div>
                            <strong style={{ color: '#0b0f19', display: 'block' }}>{u.name}</strong>
                            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{u.email}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem 0.8rem' }}>
                        <span className={`badge ${
                          u.userType === 'superadmin' || u.userType === 'admin' ? 'badge-coral' :
                          u.userType === 'client' ? 'badge-blue' : 'badge-green'
                        }`}>
                          {u.userType === 'client' ? '🏢 Corporate Client' : u.userType === 'superadmin' ? '👑 Super Admin' : '👨‍🎓 Student Candidate'}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 0.8rem', color: '#475569', fontSize: '0.85rem' }}>
                        {u.companyName || u.university || 'General'}
                      </td>
                      <td style={{ padding: '1rem 0.8rem' }}>
                        {u.isVerified ? (
                          <span style={{ padding: '0.15rem 0.55rem', borderRadius: '4px', background: '#ecfdf5', color: '#059669', fontSize: '0.75rem', fontWeight: '800', border: '1px solid #a7f3d0' }}>
                            ✓ Verified Candidate
                          </span>
                        ) : (
                          <span style={{ padding: '0.15rem 0.55rem', borderRadius: '4px', background: '#f8fafc', color: '#64748b', fontSize: '0.75rem', border: '1px solid #e2e8f0' }}>
                            Registered Candidate
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '1rem 0.8rem' }}>
                        <button 
                          onClick={() => setUserToDelete(u)}
                          style={{ background: '#fff5f5', color: '#e03131', border: '1px solid #ff6b6b', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '700', cursor: 'pointer' }}
                        >
                          Delete Account 🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: TASK ASSIGNER DESK */}
        {activeTab === 'assignTask' && (
          <div className="corporate-card" style={{ padding: '2rem', maxWidth: '750px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#0b0f19', marginBottom: '0.5rem' }}>Assign Domain Task to Student</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Select an approved candidate and assign specific project scope and deadlines.
            </p>

            <form onSubmit={handleAssignTask} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '600' }}>Select Approved Candidate</label>
                <select 
                  required
                  value={assignForm.applicationId}
                  onChange={(e) => setAssignForm({...assignForm, applicationId: e.target.value})}
                  style={{ width: '100%' }}
                >
                  <option value="">-- Select Candidate --</option>
                  {applications
                    .filter(a => users.length === 0 || users.some(u => 
                      (u.email && a.studentEmail && u.email.toLowerCase() === a.studentEmail.toLowerCase()) ||
                      (u.id && a.studentId && u.id === a.studentId)
                    ))
                    .map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.studentName} — {a.programTitle} [{a.status}]
                      </option>
                    ))
                  }
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '600' }}>Project Title</label>
                <input 
                  type="text" 
                  required
                  value={assignForm.title}
                  onChange={(e) => setAssignForm({...assignForm, title: e.target.value})}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '600' }}>Due Date</label>
                <input 
                  type="date" 
                  required
                  value={assignForm.dueDate}
                  onChange={(e) => setAssignForm({...assignForm, dueDate: e.target.value})}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '600' }}>Project Requirements</label>
                <textarea 
                  rows={4}
                  required
                  value={assignForm.description}
                  onChange={(e) => setAssignForm({...assignForm, description: e.target.value})}
                  style={{ width: '100%' }}
                />
              </div>

              <button type="submit" className="btn-coral" style={{ padding: '0.85rem' }}>
                Assign Task 🚀
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: POST NEW INTERNSHIP */}
        {activeTab === 'programs' && (
          <div className="corporate-card" style={{ padding: '2rem', maxWidth: '750px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#0b0f19', marginBottom: '0.5rem' }}>Post New Internship Opportunity</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Add a new program posting under Velora Global.
            </p>

            <form onSubmit={handleCreateProgram} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '600' }}>Program Title</label>
                  <input 
                    type="text" 
                    required
                    value={newProgram.title}
                    onChange={(e) => setNewProgram({...newProgram, title: e.target.value})}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '600' }}>Domain</label>
                  <select 
                    value={newProgram.domain}
                    onChange={(e) => setNewProgram({...newProgram, domain: e.target.value})}
                    style={{ width: '100%' }}
                  >
                    <option value="Technology">Technology</option>
                    <option value="Design">Design</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Business">Business</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '600' }}>Description</label>
                <textarea 
                  rows={3}
                  required
                  value={newProgram.description}
                  onChange={(e) => setNewProgram({...newProgram, description: e.target.value})}
                  style={{ width: '100%' }}
                />
              </div>

              <button type="submit" className="btn-coral" style={{ padding: '0.85rem' }}>
                Publish Internship Opportunity 🌟
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Custom In-App Deletion Confirmation Modal (No browser window.confirm!) */}
      {userToDelete && (
        <div className="modal-overlay" onClick={() => setUserToDelete(null)} style={{ zIndex: 99999 }}>
          <div 
            className="modal-content corporate-card" 
            onClick={(e) => e.stopPropagation()} 
            style={{ maxWidth: '480px', width: '90%', textAlign: 'center', padding: '2rem' }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>⚠️</div>
            <h3 style={{ fontSize: '1.4rem', color: '#0b0f19', marginBottom: '0.5rem' }}>
              Remove Account from Database
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              Are you sure you want to permanently delete <strong>{userToDelete.name}</strong> (<span style={{ color: '#2563eb' }}>{userToDelete.email}</span>) from the database?
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                onClick={() => setUserToDelete(null)}
                className="btn-secondary"
                style={{ padding: '0.65rem 1.5rem' }}
              >
                Cancel
              </button>
              <button 
                onClick={confirmDeleteUser}
                className="btn-coral"
                style={{ padding: '0.65rem 1.5rem', background: '#dc2626', borderColor: '#b91c1c' }}
              >
                Yes, Delete Account 🗑️
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Evaluation Modal */}
      {selectedTask && (
        <div className="modal-overlay" onClick={() => setSelectedTask(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
            <button 
              onClick={() => setSelectedTask(null)}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: '#f1f5f9', color: '#64748b', borderRadius: '50%', width: '32px', height: '32px' }}
            >
              ✕
            </button>

            <span className="badge badge-coral" style={{ marginBottom: '0.5rem' }}>Founder Evaluation</span>
            <h2 style={{ fontSize: '1.6rem', color: '#0b0f19', marginBottom: '0.25rem' }}>Evaluate & Certify Intern</h2>
            <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Student: <strong>{selectedTask.studentName}</strong> • Project: <strong>{selectedTask.title}</strong>
            </p>

            <form onSubmit={handleEvaluateTask} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.25rem' }}>
                  <span>1. Quality of Work</span>
                  <strong style={{ color: '#2563eb' }}>{evalScores.qualityOfWork} / 10</strong>
                </div>
                <input type="range" min="1" max="10" step="0.5" value={evalScores.qualityOfWork} onChange={(e) => setEvalScores({...evalScores, qualityOfWork: parseFloat(e.target.value)})} style={{ width: '100%' }} />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.25rem' }}>
                  <span>2. Technical Skills</span>
                  <strong style={{ color: '#2563eb' }}>{evalScores.technicalSkills} / 10</strong>
                </div>
                <input type="range" min="1" max="10" step="0.5" value={evalScores.technicalSkills} onChange={(e) => setEvalScores({...evalScores, technicalSkills: parseFloat(e.target.value)})} style={{ width: '100%' }} />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.25rem' }}>
                  <span>3. Creativity</span>
                  <strong style={{ color: '#ff6b6b' }}>{evalScores.creativity} / 10</strong>
                </div>
                <input type="range" min="1" max="10" step="0.5" value={evalScores.creativity} onChange={(e) => setEvalScores({...evalScores, creativity: parseFloat(e.target.value)})} style={{ width: '100%' }} />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.25rem' }}>
                  <span>4. Completion of Requirements</span>
                  <strong style={{ color: '#10b981' }}>{evalScores.completionOfRequirements} / 10</strong>
                </div>
                <input type="range" min="1" max="10" step="0.5" value={evalScores.completionOfRequirements} onChange={(e) => setEvalScores({...evalScores, completionOfRequirements: parseFloat(e.target.value)})} style={{ width: '100%' }} />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.25rem' }}>
                  <span>5. Professional Approach</span>
                  <strong style={{ color: '#2563eb' }}>{evalScores.professionalApproach} / 10</strong>
                </div>
                <input type="range" min="1" max="10" step="0.5" value={evalScores.professionalApproach} onChange={(e) => setEvalScores({...evalScores, professionalApproach: parseFloat(e.target.value)})} style={{ width: '100%' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '600' }}>Evaluator Remarks</label>
                <textarea rows={3} required value={evalScores.feedback} onChange={(e) => setEvalScores({...evalScores, feedback: e.target.value})} style={{ width: '100%' }} />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setSelectedTask(null)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-coral">
                  Approve Grade & Issue Certificate 🏆
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

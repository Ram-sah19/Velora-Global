import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function AdminDashboard({ onCertificateGenerated }) {
  const [stats, setStats] = useState(null);
  const [applications, setApplications] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('applications'); // 'applications', 'programs', 'tasks', 'evaluations'


  // New program form state
  const [newProgram, setNewProgram] = useState({
    title: '',
    domain: 'Technology',
    duration: '6 Weeks',
    stipend: '$350 / month',
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

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const [sData, aData, tData] = await Promise.all([
        api.getStats(),
        api.getApplications(),
        api.getTasks()
      ]);
      setStats(sData);
      setApplications(aData);
      setTasks(tData);
    } catch (err) {
      console.error("Failed to load admin data", err);
    }
  };

  const handleUpdateAppStatus = async (appId, status) => {
    try {
      await api.updateApplicationStatus(appId, status);
      alert(`Application updated to ${status}`);
      loadAdminData();
    } catch (err) {
      alert(err.message || 'Error updating status');
    }
  };

  const handleCreateProgram = async (e) => {
    e.preventDefault();
    try {
      await api.createProgram({
        ...newProgram,
        skillsRequired: newProgram.skillsRequired.split(',').map(s => s.trim()),
        deliverables: newProgram.deliverables.split(',').map(d => d.trim())
      });
      alert('🎉 New Internship Program Published Successfully!');
      setNewProgram({
        title: '',
        domain: 'Technology',
        duration: '6 Weeks',
        stipend: '$350 / month',
        locationType: 'Remote',
        description: '',
        skillsRequired: 'React, Node.js, JavaScript',
        deliverables: 'Complete domain dashboard and API endpoints'
      });
      loadAdminData();
      setActiveTab('applications');
    } catch (err) {
      alert(err.message || 'Failed to create program');
    }
  };

  const handleAssignTask = async (e) => {
    e.preventDefault();
    if (!assignForm.applicationId) {
      alert('Please select an approved application');
      return;
    }

    try {
      await api.assignTask(assignForm);
      alert('🎉 Project Task Assigned Successfully to Student!');
      setAssignForm({
        applicationId: '',
        title: '',
        description: '',
        dueDate: '2026-08-30'
      });
      loadAdminData();
      setActiveTab('tasks');
    } catch (err) {
      alert(err.message || 'Failed to assign task');
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

      alert(`🏆 Evaluation Complete! Student Grade: ${res.evaluation.grade} (${res.evaluation.overallScore}/10). Certificate ${res.certificate.certificateId} Issued!`);
      setSelectedTask(null);
      loadAdminData();
      if (onCertificateGenerated) onCertificateGenerated(res.certificate);
    } catch (err) {
      alert(err.message || 'Failed to evaluate project');
    }
  };

  return (
    <section style={{ padding: '3rem 0' }}>
      <div className="container">
        
        {/* Founder Header Banner */}
        <div className="glass-card" style={{
          padding: '2rem',
          marginBottom: '2.5rem',
          background: 'linear-gradient(135deg, rgba(18, 24, 38, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" 
              alt="Rambilas Sah"
              style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #f59e0b' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                <h2 style={{ fontSize: '1.8rem' }}>Rambilas Sah</h2>
                <span className="badge badge-gold">Founder & CEO</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                Executive Founder Panel • Velora Global Leadership Desk
              </p>
              <span style={{ fontSize: '0.78rem', color: '#06b6d4' }}>Co-Founders: Puja Rouniyar & Rohit Sah</span>
            </div>
          </div>

          {/* Quick Metrics */}
          {stats && (
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ textAlign: 'center', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#6366f1' }}>{stats.totalApplicants}</span>
                <span style={{ display: 'block', fontSize: '0.72rem', color: '#94a3b8' }}>Applicants</span>
              </div>
              <div style={{ textAlign: 'center', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#06b6d4' }}>{stats.activeInterns}</span>
                <span style={{ display: 'block', fontSize: '0.72rem', color: '#94a3b8' }}>Active Interns</span>
              </div>
              <div style={{ textAlign: 'center', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#10b981' }}>{stats.certificatesIssued}</span>
                <span style={{ display: 'block', fontSize: '0.72rem', color: '#94a3b8' }}>Certificates</span>
              </div>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setActiveTab('applications')}
            className={activeTab === 'applications' ? 'btn-primary' : 'btn-secondary'}
          >
            📋 Application Manager ({applications.length})
          </button>
          <button 
            onClick={() => setActiveTab('assignTask')}
            className={activeTab === 'assignTask' ? 'btn-primary' : 'btn-secondary'}
          >
            🎯 Task Assigner Desk
          </button>
          <button 
            onClick={() => setActiveTab('tasks')}
            className={activeTab === 'tasks' ? 'btn-primary' : 'btn-secondary'}
          >
            📊 Review Submissions ({tasks.filter(t => t.status === 'Submitted').length})
          </button>
          <button 
            onClick={() => setActiveTab('programs')}
            className={activeTab === 'programs' ? 'btn-primary' : 'btn-secondary'}
          >
            ➕ Post New Internship
          </button>
        </div>

        {/* TAB 1: APPLICATIONS MANAGER */}
        {activeTab === 'applications' && (
          <div className="glass-card" style={{ padding: '2rem', overflowX: 'auto' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Student Applications</h3>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}>
                  <th style={{ padding: '0.8rem' }}>Student</th>
                  <th style={{ padding: '0.8rem' }}>Program & Domain</th>
                  <th style={{ padding: '0.8rem' }}>Applied Date</th>
                  <th style={{ padding: '0.8rem' }}>Status</th>
                  <th style={{ padding: '0.8rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem 0.8rem' }}>
                      <strong style={{ color: '#f8fafc', display: 'block' }}>{app.studentName}</strong>
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{app.studentEmail}</span>
                    </td>
                    <td style={{ padding: '1rem 0.8rem' }}>
                      <span style={{ fontWeight: '600' }}>{app.programTitle}</span>
                      <span className="badge badge-indigo" style={{ display: 'inline-block', marginLeft: '0.5rem', fontSize: '0.7rem' }}>{app.domain}</span>
                    </td>
                    <td style={{ padding: '1rem 0.8rem', color: '#94a3b8' }}>{app.appliedDate}</td>
                    <td style={{ padding: '1rem 0.8rem' }}>
                      <span className={`badge ${
                        app.status === 'Completed' ? 'badge-green' :
                        app.status === 'Approved' || app.status === 'In-Progress' ? 'badge-cyan' :
                        app.status === 'Pending' ? 'badge-gold' : 'badge-rose'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 0.8rem' }}>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button 
                          onClick={() => handleUpdateAppStatus(app.id, 'Approved')}
                          style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '600' }}
                        >
                          Approve ✓
                        </button>
                        <button 
                          onClick={() => handleUpdateAppStatus(app.id, 'Rejected')}
                          style={{ background: 'rgba(244, 63, 94, 0.2)', color: '#f43f5e', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '600' }}
                        >
                          Reject ✕
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: TASK ASSIGNER DESK */}
        {activeTab === 'assignTask' && (
          <div className="glass-card" style={{ padding: '2rem', maxWidth: '750px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Assign Domain Task / Project to Selected Intern</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Select an approved student application and set specific project scope, deliverables, and deadline.
            </p>

            <form onSubmit={handleAssignTask} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Select Student Candidate</label>
                <select 
                  required
                  value={assignForm.applicationId}
                  onChange={(e) => setAssignForm({...assignForm, applicationId: e.target.value})}
                  style={{ width: '100%' }}
                >
                  <option value="">-- Choose Approved Student Application --</option>
                  {applications.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.studentName} — {a.programTitle} [{a.status}]
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Project Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Build Velora Global Analytics Portal"
                  value={assignForm.title}
                  onChange={(e) => setAssignForm({...assignForm, title: e.target.value})}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Submission Due Date</label>
                <input 
                  type="date" 
                  required
                  value={assignForm.dueDate}
                  onChange={(e) => setAssignForm({...assignForm, dueDate: e.target.value})}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Detailed Project Requirements & Instructions</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Specify task technical specs, expected API routes or design Figma components, and submission requirements."
                  value={assignForm.description}
                  onChange={(e) => setAssignForm({...assignForm, description: e.target.value})}
                  style={{ width: '100%' }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '0.85rem' }}>
                Assign Task to Student 🚀
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: REVIEW SUBMISSIONS & PROJECT EVALUATION */}
        {activeTab === 'tasks' && (
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Submitted Projects Awaiting Evaluation</h3>

            {tasks.length === 0 ? (
              <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                <p>No project submissions pending review.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                {tasks.map((t) => (
                  <div key={t.id} className="glass-card" style={{ padding: '1.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span className="badge badge-indigo">{t.programTitle}</span>
                      <span className={`badge ${t.status === 'Evaluated' ? 'badge-green' : 'badge-gold'}`}>{t.status}</span>
                    </div>

                    <h4 style={{ fontSize: '1.2rem', marginBottom: '0.35rem' }}>{t.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
                      Submitted by: <strong style={{ color: '#f8fafc' }}>{t.studentName}</strong>
                    </p>

                    {t.submission && (
                      <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.85rem', borderRadius: '8px', marginBottom: '1.25rem' }}>
                        <a href={t.submission.githubUrl} target="_blank" rel="noreferrer" style={{ fontSize: '0.82rem', color: '#6366f1', display: 'block', marginBottom: '0.3rem' }}>
                          🔗 {t.submission.githubUrl}
                        </a>
                        <p style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Notes: {t.submission.notes}</p>
                      </div>
                    )}

                    <button 
                      onClick={() => setSelectedTask(t)}
                      className="btn-primary"
                      style={{ width: '100%', padding: '0.65rem' }}
                    >
                      {t.status === 'Evaluated' ? 'View / Re-Evaluate' : 'Grade & Issue Certificate 🏆'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: POST NEW INTERNSHIP */}
        {activeTab === 'programs' && (
          <div className="glass-card" style={{ padding: '2rem', maxWidth: '750px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Post New Internship Opportunity</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Add a new program posting under Velora Global for prospective students.
            </p>

            <form onSubmit={handleCreateProgram} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Program Title</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. AI & Data Science Internship"
                    value={newProgram.title}
                    onChange={(e) => setNewProgram({...newProgram, title: e.target.value})}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Domain</label>
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Duration</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 8 Weeks"
                    value={newProgram.duration}
                    onChange={(e) => setNewProgram({...newProgram, duration: e.target.value})}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Stipend / Support</label>
                  <input 
                    type="text" 
                    placeholder="e.g. $400 / month"
                    value={newProgram.stipend}
                    onChange={(e) => setNewProgram({...newProgram, stipend: e.target.value})}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Description</label>
                <textarea 
                  rows={3}
                  required
                  placeholder="Overview of the program scope and learning objectives."
                  value={newProgram.description}
                  onChange={(e) => setNewProgram({...newProgram, description: e.target.value})}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Required Skills (comma separated)</label>
                <input 
                  type="text" 
                  placeholder="Python, SQL, Machine Learning"
                  value={newProgram.skillsRequired}
                  onChange={(e) => setNewProgram({...newProgram, skillsRequired: e.target.value})}
                  style={{ width: '100%' }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '0.85rem' }}>
                Publish Internship Program 🌟
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Project Evaluation Modal (5 Criteria Scoring) */}
      {selectedTask && (
        <div className="modal-overlay" onClick={() => setSelectedTask(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
            <button 
              onClick={() => setSelectedTask(null)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', color: '#94a3b8', fontSize: '1.5rem' }}
            >
              ✕
            </button>

            <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>Founder Evaluation Desk</span>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '0.25rem' }}>Evaluate & Certify Intern</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Student: <strong>{selectedTask.studentName}</strong> • Project: <strong>{selectedTask.title}</strong>
            </p>

            <form onSubmit={handleEvaluateTask} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* 5 Assessment Criteria Sliders */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.25rem' }}>
                  <span>1. Quality of Work</span>
                  <strong style={{ color: '#6366f1' }}>{evalScores.qualityOfWork} / 10</strong>
                </div>
                <input 
                  type="range" min="1" max="10" step="0.5" 
                  value={evalScores.qualityOfWork} 
                  onChange={(e) => setEvalScores({...evalScores, qualityOfWork: parseFloat(e.target.value)})}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.25rem' }}>
                  <span>2. Technical Skills</span>
                  <strong style={{ color: '#06b6d4' }}>{evalScores.technicalSkills} / 10</strong>
                </div>
                <input 
                  type="range" min="1" max="10" step="0.5" 
                  value={evalScores.technicalSkills} 
                  onChange={(e) => setEvalScores({...evalScores, technicalSkills: parseFloat(e.target.value)})}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.25rem' }}>
                  <span>3. Creativity</span>
                  <strong style={{ color: '#10b981' }}>{evalScores.creativity} / 10</strong>
                </div>
                <input 
                  type="range" min="1" max="10" step="0.5" 
                  value={evalScores.creativity} 
                  onChange={(e) => setEvalScores({...evalScores, creativity: parseFloat(e.target.value)})}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.25rem' }}>
                  <span>4. Completion of Requirements</span>
                  <strong style={{ color: '#f59e0b' }}>{evalScores.completionOfRequirements} / 10</strong>
                </div>
                <input 
                  type="range" min="1" max="10" step="0.5" 
                  value={evalScores.completionOfRequirements} 
                  onChange={(e) => setEvalScores({...evalScores, completionOfRequirements: parseFloat(e.target.value)})}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.25rem' }}>
                  <span>5. Professional Approach</span>
                  <strong style={{ color: '#ec4899' }}>{evalScores.professionalApproach} / 10</strong>
                </div>
                <input 
                  type="range" min="1" max="10" step="0.5" 
                  value={evalScores.professionalApproach} 
                  onChange={(e) => setEvalScores({...evalScores, professionalApproach: parseFloat(e.target.value)})}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.35rem' }}>Evaluator Remarks & Feedback</label>
                <textarea 
                  rows={3}
                  required
                  value={evalScores.feedback}
                  onChange={(e) => setEvalScores({...evalScores, feedback: e.target.value})}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setSelectedTask(null)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Submit Grade & Approve Certificate 🎓
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

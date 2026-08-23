import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { showToast } from '../../components/NotificationToast';
import { SkeletonTable } from '../../components/UIStates';

function getCleanDomainTitle(title = '', domain = '') {
  if (!title && !domain) return 'Software Engineering';
  let clean = (title || domain)
    .replace(/\b(internship|training|program|course|curriculum|track)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  return clean || domain || title;
}

export default function AdminDashboardPage({ currentUser, onCertificateGenerated, onOpenAdminRegister }) {
  const [stats, setStats] = useState(null);
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('enrollments');
  const [userFilter, setUserFilter] = useState('all');
  const [enrollmentFilter, setEnrollmentFilter] = useState('all');
  const [enrollmentSearch, setEnrollmentSearch] = useState('');
  const [userToDelete, setUserToDelete] = useState(null);
  const [appToDelete, setAppToDelete] = useState(null);

  // Edit Enrollment Modal State
  const [editingApp, setEditingApp] = useState(null);
  const [editForm, setEditForm] = useState({
    programTitle: '',
    domain: '',
    programTrack: 'Internship',
    selectedDuration: '1 Month',
    status: 'Approved'
  });

  // Direct Student Enrollment State
  const [enrollForm, setEnrollForm] = useState({
    studentId: '',
    programId: '',
    duration: '1 Month',
    track: 'Internship'
  });

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
      const getTasksCall = typeof api.getTasks === 'function' ? api.getTasks() : Promise.resolve([]);
      const [statsRes, appsRes, usersRes, progsRes, tasksRes] = await Promise.all([
        api.getStats().catch(() => ({ totalApplicants: 12, activeInterns: 8, certificatesIssued: 5 })),
        api.getApplications().catch(() => ([])),
        getUsersCall.catch(() => ([])),
        api.getPrograms().catch(() => ([])) ,
        getTasksCall.catch(() => ([]))
      ]);
      setStats(statsRes);
      setApplications(appsRes);
      setUsers(usersRes);
      setPrograms(progsRes);
      setTasks(tasksRes);
    } catch (e) {
      console.warn('Sync warning:', e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
    const interval = setInterval(loadAdminData, 2000);

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

    setUsers(prev => prev.filter(u => u.id !== user.id && u.email !== user.email));
    showToast(`User ${user.name} removed from database`, 'info');

    try {
      if (typeof api.deleteUser === 'function') {
        await api.deleteUser(user.id || user.email);
      }
    } catch (e) {}
    loadAdminData();
  };

  const confirmDeleteApplication = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!appToDelete) return;
    const app = appToDelete;
    const idToDelete = app.id || app._id;
    setAppToDelete(null);

    // Instant optimistic state purge
    setApplications(prev => prev.filter(a => a !== app && (idToDelete ? (a.id !== idToDelete && a._id !== idToDelete) : true)));
    showToast(`Enrollment for ${app.studentName || 'student'} permanently removed from database`, 'info');

    try {
      if (typeof api.deleteApplication === 'function' && idToDelete) {
        await api.deleteApplication(idToDelete);
      }
    } catch (e) {
      console.error('Unenroll error:', e);
    }
    
    await loadAdminData();
  };

  const handleOpenEditModal = (app) => {
    setEditingApp(app);
    setEditForm({
      programTitle: app.programTitle || '',
      domain: app.domain || 'Technology',
      programTrack: app.programTrack || 'Internship',
      selectedDuration: app.selectedDuration || '1 Month',
      status: app.status || 'Approved'
    });
  };

  const handleSaveEditEnrollment = async (e) => {
    e.preventDefault();
    if (!editingApp) return;

    const idToUpdate = editingApp.id || editingApp._id;
    try {
      if (typeof api.updateApplication === 'function') {
        await api.updateApplication(idToUpdate, editForm);
      }
      showToast('Enrollment details updated in database!', 'success');
      setEditingApp(null);
      setTimeout(loadAdminData, 300);
    } catch (err) {
      showToast(err.message || 'Failed to update enrollment', 'error');
    }
  };

  const handleEnrollStudent = async (e) => {
    e.preventDefault();
    if (!enrollForm.studentId || !enrollForm.programId) {
      showToast('Please select both a student candidate and a domain track.', 'error');
      return;
    }

    const selectedUser = users.find(u => (u.id && u.id === enrollForm.studentId) || (u.email && u.email.toLowerCase() === enrollForm.studentId.toLowerCase()));
    const selectedProg = programs.find(p => p.id === enrollForm.programId);

    const baseDomain = getCleanDomainTitle(selectedProg?.title, selectedProg?.domain);
    const trackLabel = enrollForm.track || 'Internship';
    const formattedTitle = `${baseDomain} ${trackLabel}`;

    try {
      await api.submitApplication({
        studentId: selectedUser?.id || enrollForm.studentId,
        studentName: selectedUser?.name || 'Student Candidate',
        studentEmail: selectedUser?.email || '',
        programId: selectedProg?.id || enrollForm.programId,
        programTitle: formattedTitle,
        domain: selectedProg?.domain || baseDomain,
        programTrack: trackLabel,
        selectedDuration: enrollForm.duration || '1 Month',
        status: 'Approved',
        enrolledBy: currentUser?.name || 'Administrator',
        feeAmount: selectedProg?.price || 0
      });

      showToast(`Successfully enrolled ${selectedUser?.name || 'student'} into ${formattedTitle}!`, 'success');
      setEnrollForm({
        studentId: '',
        programId: '',
        duration: '1 Month',
        track: 'Internship'
      });
      loadAdminData();
      setActiveTab('enrollments');
    } catch (err) {
      showToast(err.message || 'Failed to enroll student', 'error');
    }
  };

  const handleAssignTask = async (e) => {
    e.preventDefault();
    if (!assignForm.applicationId) {
      showToast('Please select an enrolled candidate to assign the task.', 'error');
      return;
    }

    try {
      await api.assignTask({
        applicationId: assignForm.applicationId,
        title: assignForm.title,
        description: assignForm.description,
        dueDate: assignForm.dueDate,
        assignedBy: currentUser?.name || 'Ram Sah (Founder & CEO)'
      });

      showToast('Domain Task Assigned Successfully!', 'success');
      setAssignForm({
        applicationId: '',
        title: '',
        description: '',
        dueDate: '2026-08-30'
      });
      loadAdminData();
      setActiveTab('enrollments');
    } catch (err) {
      showToast(err.message || 'Failed to assign task', 'error');
    }
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
        postedBy: currentUser?.name || 'Ram Sah (Founder & CEO)'
      });

      showToast('New Internship Opportunity Published Successfully!', 'success');
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
      loadAdminData();
      setActiveTab('enrollStudent');
    } catch (err) {
      showToast(err.message || 'Failed to post program', 'error');
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
        evaluatorName: currentUser?.name || 'Ram Sah (Founder & CEO)',
        feedback: evalScores.feedback
      });

      showToast(`Evaluation Complete! Grade: ${res.evaluation.grade} (${res.evaluation.overallScore}/10). Certificate Issued!`, 'success');
      setSelectedTask(null);
      loadAdminData();
      if (onCertificateGenerated) onCertificateGenerated(res.certificate);
    } catch (err) {
      showToast(err.message || 'Failed to evaluate project', 'error');
    }
  };

  const studentCount = users.filter(u => u.userType === 'student' || u.userType === 'user' || !u.userType).length;
  const clientCount = users.filter(u => u.userType === 'client').length;
  const enrolledCount = applications.filter(a => a.status === 'Approved' || a.status === 'In-Progress' || a.status === 'Enrolled').length;

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      (app.studentName || '').toLowerCase().includes(enrollmentSearch.toLowerCase()) ||
      (app.studentEmail || '').toLowerCase().includes(enrollmentSearch.toLowerCase()) ||
      (app.programTitle || '').toLowerCase().includes(enrollmentSearch.toLowerCase()) ||
      (app.domain || '').toLowerCase().includes(enrollmentSearch.toLowerCase());

    if (!matchesSearch) return false;

    if (enrollmentFilter === 'internship') return (app.programTrack || '').toLowerCase() === 'internship';
    if (enrollmentFilter === 'training') return (app.programTrack || '').toLowerCase() === 'training';
    if (enrollmentFilter === 'certification') return (app.programTrack || '').toLowerCase() === 'certification';
    if (enrollmentFilter === 'approved') return app.status === 'Approved';
    if (enrollmentFilter === 'in-progress') return app.status === 'In-Progress';
    if (enrollmentFilter === 'completed') return app.status === 'Completed';

    return true;
  });

  return (
    <section style={{ padding: '2rem 0', minHeight: '85vh', width: '100%', background: '#f8fafc' }}>
      <div className="container" style={{ maxWidth: '1440px' }}>
        
        {/* Founder Header Banner */}
        <div className="corporate-card" style={{
          padding: '1.5rem 2rem',
          marginBottom: '1.5rem',
          background: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <img 
              src="/media/ram_sah.jpg" 
              alt="Ram Sah"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/ram_sah.jpg";
              }}
              style={{ width: '65px', height: '65px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #2563eb' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.15rem' }}>
                <h2 style={{ fontSize: '1.5rem', color: '#0b0f19', margin: 0 }}>Ram Sah</h2>
                <span className="badge badge-coral" style={{ fontSize: '0.72rem' }}>Founder & CEO</span>
                <span className="badge badge-green" style={{ fontSize: '0.72rem' }}>Real-Time Sync</span>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
                Executive Founder Panel • Velora Global Leadership Desk
              </p>
              <span style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: '600' }}>Executive Leadership: Ram Sah (CEO), Krishna Sah (CTO) & Rohit Sah (COO)</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center', padding: '0.5rem 1rem', background: '#eff6ff', borderRadius: '10px', border: '1px solid #bfdbfe' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#2563eb', display: 'block' }}>{enrolledCount}</span>
              <span style={{ fontSize: '0.72rem', color: '#1e40af', fontWeight: '700' }}>Enrolled Students</span>
            </div>
            <div style={{ textAlign: 'center', padding: '0.5rem 1rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0b0f19', display: 'block' }}>{studentCount}</span>
              <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '600' }}>Total Students</span>
            </div>
            <div style={{ textAlign: 'center', padding: '0.5rem 1rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ff6b6b', display: 'block' }}>{clientCount}</span>
              <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '600' }}>Clients</span>
            </div>
            {stats && (
              <div style={{ textAlign: 'center', padding: '0.5rem 1rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#10b981', display: 'block' }}>{stats.certificatesIssued}</span>
                <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '600' }}>Certificates</span>
              </div>
            )}
          </div>
        </div>

        {/* SIDEBAR + MAIN CONTENT LAYOUT */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1.5rem', alignItems: 'start' }}>
          
          {/* LEFT SIDEBAR NAVIGATION */}
          <aside style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '1.25rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            border: '1px solid #e2e8f0',
            position: 'sticky',
            top: '85px'
          }}>
            <div style={{ paddingBottom: '0.75rem', marginBottom: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', fontWeight: '700' }}>
                Management Console
              </span>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              
              {/* Tab 1: Enrolled Students & Programs */}
              <button
                onClick={() => setActiveTab('enrollments')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeTab === 'enrollments' ? '#2563eb' : 'transparent',
                  color: activeTab === 'enrollments' ? '#ffffff' : '#334155',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>Enrolled Programs</span>
                <span style={{
                  fontSize: '0.72rem',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '12px',
                  background: activeTab === 'enrollments' ? 'rgba(255,255,255,0.25)' : '#eff6ff',
                  color: activeTab === 'enrollments' ? '#ffffff' : '#2563eb'
                }}>
                  {enrolledCount}
                </span>
              </button>

              {/* Tab 2: Users Directory */}
              <button
                onClick={() => setActiveTab('users')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeTab === 'users' ? '#2563eb' : 'transparent',
                  color: activeTab === 'users' ? '#ffffff' : '#334155',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>Users Directory</span>
                <span style={{
                  fontSize: '0.72rem',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '12px',
                  background: activeTab === 'users' ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
                  color: activeTab === 'users' ? '#ffffff' : '#64748b'
                }}>
                  {users.length}
                </span>
              </button>

              {/* Tab 3: Enroll Student Desk */}
              <button
                onClick={() => setActiveTab('enrollStudent')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeTab === 'enrollStudent' ? '#2563eb' : 'transparent',
                  color: activeTab === 'enrollStudent' ? '#ffffff' : '#334155',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>Enroll Student Desk</span>
                <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>+</span>
              </button>

              {/* Tab 4: Task Assigner */}
              <button
                onClick={() => setActiveTab('assignTask')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeTab === 'assignTask' ? '#2563eb' : 'transparent',
                  color: activeTab === 'assignTask' ? '#ffffff' : '#334155',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>Task Assigner Desk</span>
                <span style={{
                  fontSize: '0.72rem',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '12px',
                  background: activeTab === 'assignTask' ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
                  color: activeTab === 'assignTask' ? '#ffffff' : '#64748b'
                }}>
                  {tasks.length}
                </span>
              </button>

              {/* Tab 5: Post New Internship */}
              <button
                onClick={() => setActiveTab('programs')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeTab === 'programs' ? '#2563eb' : 'transparent',
                  color: activeTab === 'programs' ? '#ffffff' : '#334155',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>Post New Program</span>
                <span style={{
                  fontSize: '0.72rem',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '12px',
                  background: activeTab === 'programs' ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
                  color: activeTab === 'programs' ? '#ffffff' : '#64748b'
                }}>
                  {programs.length}
                </span>
              </button>

            </nav>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
              <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '700', display: 'block', marginBottom: '0.25rem' }}>
                  Quick Action
                </span>
                <button
                  onClick={() => {
                    setEnrollForm({ studentId: '', programId: '', duration: '1 Month', track: 'Internship' });
                    setActiveTab('enrollStudent');
                  }}
                  className="btn-primary"
                  style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem' }}
                >
                  + Enroll New Candidate
                </button>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main style={{ minHeight: '600px' }}>
            
            {/* ======================================================== */}
            {/* TAB 1: ENROLLED STUDENTS & PROGRAMS DIRECTORY (NEW!) */}
            {/* ======================================================== */}
            {activeTab === 'enrollments' && (
              <div className="corporate-card" style={{ padding: '2rem', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', color: '#0b0f19', marginBottom: '0.2rem' }}>
                      Enrolled Students & Assigned Programs ({filteredApplications.length})
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
                      Manage which student is assigned which program. Edit tracks, modify durations, update statuses, or unenroll candidates.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('enrollStudent')}
                    className="btn-primary"
                    style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
                  >
                    + Enroll Student
                  </button>
                </div>

                {/* Filters & Search Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {['all', 'internship', 'training', 'certification', 'approved', 'in-progress'].map((f) => (
                      <button
                        key={f}
                        onClick={() => setEnrollmentFilter(f)}
                        className={enrollmentFilter === f ? 'btn-primary' : 'btn-secondary'}
                        style={{ padding: '0.35rem 0.8rem', fontSize: '0.78rem', textTransform: 'capitalize' }}
                      >
                        {f === 'all' ? 'All Enrollments' : f}
                      </button>
                    ))}
                  </div>

                  <div style={{ minWidth: '260px' }}>
                    <input
                      type="text"
                      placeholder="Search student, email, domain..."
                      value={enrollmentSearch}
                      onChange={(e) => setEnrollmentSearch(e.target.value)}
                      style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem', width: '100%', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                </div>

                {/* Table of Enrollments */}
                {loading && applications.length === 0 ? (
                  <SkeletonTable rows={4} columns={6} />
                ) : filteredApplications.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3.5rem 1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                    <h4 style={{ fontSize: '1.15rem', color: '#0b0f19', marginBottom: '0.4rem' }}>
                      No Enrolled Students Found
                    </h4>
                    <p style={{ color: '#64748b', fontSize: '0.88rem', maxWidth: '400px', margin: '0 auto 1.25rem auto' }}>
                      No active student enrollments match your current search or filter. Click below to enroll a candidate into a program.
                    </p>
                    <button
                      onClick={() => setActiveTab('enrollStudent')}
                      className="btn-primary"
                      style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}
                    >
                      Enroll First Student
                    </button>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b', fontSize: '0.82rem' }}>
                          <th style={{ padding: '0.8rem' }}>Student Candidate</th>
                          <th style={{ padding: '0.8rem' }}>Assigned Domain / Program</th>
                          <th style={{ padding: '0.8rem' }}>Track & Duration</th>
                          <th style={{ padding: '0.8rem' }}>Status</th>
                          <th style={{ padding: '0.8rem' }}>Assigned By</th>
                          <th style={{ padding: '0.8rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredApplications.map((app) => (
                          <tr key={app.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            
                            {/* Student info */}
                            <td style={{ padding: '1rem 0.8rem' }}>
                              <strong style={{ color: '#0b0f19', display: 'block' }}>{app.studentName || 'Student'}</strong>
                              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{app.studentEmail}</span>
                            </td>

                            {/* Program info */}
                            <td style={{ padding: '1rem 0.8rem' }}>
                              <strong style={{ color: '#2563eb', display: 'block' }}>{app.programTitle}</strong>
                              <span className="badge badge-blue" style={{ fontSize: '0.72rem', marginTop: '0.2rem' }}>
                                {app.domain}
                              </span>
                            </td>

                            {/* Track & Duration */}
                            <td style={{ padding: '1rem 0.8rem' }}>
                              <span style={{ fontWeight: '700', color: '#0b0f19', display: 'block' }}>
                                {app.programTrack || 'Internship'}
                              </span>
                              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                                Duration: {app.selectedDuration || '1 Month'}
                              </span>
                            </td>

                            {/* Status */}
                            <td style={{ padding: '1rem 0.8rem' }}>
                              <span className={`badge ${
                                app.status === 'Approved' ? 'badge-green' :
                                app.status === 'In-Progress' ? 'badge-blue' :
                                app.status === 'Completed' ? 'badge-gold' : 'badge-coral'
                              }`} style={{ fontSize: '0.75rem' }}>
                                {app.status}
                              </span>
                            </td>

                            {/* Enrolled By */}
                            <td style={{ padding: '1rem 0.8rem', color: '#64748b', fontSize: '0.82rem' }}>
                              {app.enrolledBy || 'Administrator'}
                            </td>

                            {/* Actions: Edit, Assign Task, Delete */}
                            <td style={{ padding: '1rem 0.8rem', textAlign: 'right' }}>
                              <div style={{ display: 'inline-flex', gap: '0.4rem', alignItems: 'center' }}>
                                <button
                                  onClick={() => handleOpenEditModal(app)}
                                  style={{
                                    background: '#eff6ff',
                                    color: '#2563eb',
                                    border: '1px solid #93c5fd',
                                    padding: '0.35rem 0.65rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    fontWeight: '700',
                                    cursor: 'pointer'
                                  }}
                                  title="Edit or Change Assigned Program"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    setAssignForm(prev => ({ ...prev, applicationId: app.id }));
                                    setActiveTab('assignTask');
                                  }}
                                  style={{
                                    background: '#ecfdf5',
                                    color: '#059669',
                                    border: '1px solid #a7f3d0',
                                    padding: '0.35rem 0.65rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    fontWeight: '700',
                                    cursor: 'pointer'
                                  }}
                                  title="Assign Task & Deliverable"
                                >
                                  Task
                                </button>
                                <button
                                  onClick={() => setAppToDelete(app)}
                                  style={{
                                    background: '#fff5f5',
                                    color: '#dc2626',
                                    border: '1px solid #fca5a5',
                                    padding: '0.35rem 0.65rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    fontWeight: '700',
                                    cursor: 'pointer'
                                  }}
                                  title="Unenroll Student"
                                >
                                  Unenroll
                                </button>
                              </div>
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 2: REGISTERED USERS DIRECTORY */}
            {/* ======================================================== */}
            {activeTab === 'users' && (
              <div className="corporate-card" style={{ padding: '2rem', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', color: '#0b0f19', marginBottom: '0.2rem' }}>Registered Users Directory</h3>
                    <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
                      Real-time database directory of all registered student candidates and corporate clients.
                    </p>
                  </div>

                  {/* User Type Filters */}
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <button 
                      onClick={() => setUserFilter('all')}
                      className={userFilter === 'all' ? 'btn-primary' : 'btn-secondary'}
                      style={{ padding: '0.35rem 0.8rem', fontSize: '0.78rem' }}
                    >
                      All Accounts ({users.length})
                    </button>
                    <button 
                      onClick={() => setUserFilter('student')}
                      className={userFilter === 'student' ? 'btn-primary' : 'btn-secondary'}
                      style={{ padding: '0.35rem 0.8rem', fontSize: '0.78rem' }}
                    >
                      Students ({studentCount})
                    </button>
                    <button 
                      onClick={() => setUserFilter('client')}
                      className={userFilter === 'client' ? 'btn-primary' : 'btn-secondary'}
                      style={{ padding: '0.35rem 0.8rem', fontSize: '0.78rem' }}
                    >
                      Clients ({clientCount})
                    </button>
                  </div>
                </div>

                {loading && users.length === 0 ? (
                  <SkeletonTable rows={5} columns={5} />
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b', fontSize: '0.82rem' }}>
                          <th style={{ padding: '0.8rem' }}>User / Candidate</th>
                          <th style={{ padding: '0.8rem' }}>Account Type</th>
                          <th style={{ padding: '0.8rem' }}>Institution / Company</th>
                          <th style={{ padding: '0.8rem' }}>Enrolled Program Track</th>
                          <th style={{ padding: '0.8rem', textAlign: 'right' }}>Management</th>
                        </tr>
                      </thead>
                    <tbody>
                      {users
                        .filter(u => {
                          if (userFilter === 'student') return u.userType === 'student' || u.userType === 'user' || !u.userType;
                          if (userFilter === 'client') return u.userType === 'client';
                          return true;
                        })
                        .map((u) => {
                          const userEnrollments = applications.filter(a => 
                            ((u.id && a.studentId === u.id) || (u.email && a.studentEmail && a.studentEmail.toLowerCase() === u.email.toLowerCase())) &&
                            (a.status === 'Approved' || a.status === 'In-Progress' || a.status === 'Enrolled' || a.status === 'Completed')
                          );
                          const isEnrolled = userEnrollments.length > 0;
                          const activeEnrollment = userEnrollments[0];

                          return (
                            <tr key={u.id || u.email} style={{ borderBottom: '1px solid #f1f5f9' }}>
                              <td style={{ padding: '1rem 0.8rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                  <img 
                                    src={u.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + encodeURIComponent(u.name)} 
                                    alt={u.name}
                                    style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1px solid #cbd5e1', objectFit: 'cover' }}
                                  />
                                  <div>
                                    <strong style={{ color: '#0b0f19', display: 'block' }}>{u.name}</strong>
                                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{u.email}</span>
                                  </div>
                                </div>
                              </td>
                              <td style={{ padding: '1rem 0.8rem' }}>
                                <span className={`badge ${
                                  u.userType === 'superadmin' || u.userType === 'admin' ? 'badge-coral' :
                                  u.userType === 'client' ? 'badge-blue' : 'badge-green'
                                }`} style={{ fontSize: '0.75rem' }}>
                                  {u.userType === 'client' ? 'Corporate Client' : u.userType === 'superadmin' ? 'Super Admin' : 'Student Candidate'}
                                </span>
                              </td>
                              <td style={{ padding: '1rem 0.8rem', color: '#475569', fontSize: '0.85rem' }}>
                                {u.companyName || u.university || 'General'}
                              </td>
                              <td style={{ padding: '1rem 0.8rem' }}>
                                {isEnrolled ? (
                                  <div>
                                    <span style={{ padding: '0.15rem 0.55rem', borderRadius: '4px', background: '#ecfdf5', color: '#059669', fontSize: '0.75rem', fontWeight: '800', border: '1px solid #a7f3d0', display: 'inline-block', marginBottom: '0.2rem' }}>
                                      ✓ Enrolled: {activeEnrollment.programTitle}
                                    </span>
                                    <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>
                                      {activeEnrollment.selectedDuration || '1 Month'} • {activeEnrollment.programTrack || 'Internship'}
                                    </span>
                                  </div>
                                ) : (
                                  <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>
                                    Not Enrolled
                                  </span>
                                )}
                              </td>
                              <td style={{ padding: '1rem 0.8rem', textAlign: 'right' }}>
                                <div style={{ display: 'inline-flex', gap: '0.4rem', alignItems: 'center' }}>
                                  {(u.userType === 'student' || u.userType === 'user' || !u.userType) && (
                                    isEnrolled ? (
                                      <>
                                        <button
                                          onClick={() => {
                                            setEnrollmentSearch(u.email || u.name);
                                            setActiveTab('enrollments');
                                          }}
                                          style={{ background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', padding: '0.35rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer' }}
                                          title="Manage Student Program Assignment"
                                        >
                                          Manage
                                        </button>
                                        <button
                                          onClick={() => {
                                            setAssignForm(prev => ({ ...prev, applicationId: activeEnrollment.id }));
                                            setActiveTab('assignTask');
                                          }}
                                          style={{ background: '#eff6ff', color: '#2563eb', border: '1px solid #93c5fd', padding: '0.35rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer' }}
                                          title="Assign Project Deliverable"
                                        >
                                          Task
                                        </button>
                                      </>
                                    ) : (
                                      <button
                                        onClick={() => {
                                          setEnrollForm(prev => ({ ...prev, studentId: u.id || u.email }));
                                          setActiveTab('enrollStudent');
                                        }}
                                        style={{ background: '#eff6ff', color: '#2563eb', border: '1px solid #93c5fd', padding: '0.35rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer' }}
                                        title="Enroll Student Candidate"
                                      >
                                        + Enroll
                                      </button>
                                    )
                                  )}
                                  <button 
                                    onClick={() => setUserToDelete(u)}
                                    style={{ background: '#fff5f5', color: '#e03131', border: '1px solid #ff6b6b', padding: '0.35rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer' }}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                )}
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 3: STUDENT ENROLLMENT DESK */}
            {/* ======================================================== */}
            {activeTab === 'enrollStudent' && (
              <div className="corporate-card" style={{ padding: '2rem', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', maxWidth: '750px', margin: '0 auto' }}>
                <h3 style={{ fontSize: '1.4rem', color: '#0b0f19', marginBottom: '0.35rem' }}>Student Program Enrollment Desk</h3>
                <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                  Assign and officially enroll registered student candidates into internship tracks and domain programs.
                </p>

                <form onSubmit={handleEnrollStudent} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '600' }}>Select Registered Student *</label>
                    <select 
                      required
                      value={enrollForm.studentId}
                      onChange={(e) => setEnrollForm({...enrollForm, studentId: e.target.value})}
                      style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    >
                      <option value="">-- Choose Student Candidate --</option>
                      {users
                        .filter(u => u.userType === 'student' || u.userType === 'user' || !u.userType)
                        .map((u) => (
                          <option key={u.id || u.email} value={u.id || u.email}>
                            {u.name} ({u.email}) — {u.university || 'Student'}
                          </option>
                        ))
                      }
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '600' }}>Select Domain / Program *</label>
                    <select 
                      required
                      value={enrollForm.programId}
                      onChange={(e) => setEnrollForm({...enrollForm, programId: e.target.value})}
                      style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    >
                      <option value="">-- Choose Domain --</option>
                      {programs.map((p) => (
                        <option key={p.id} value={p.id}>
                          {getCleanDomainTitle(p.title, p.domain)}
                        </option>
                      ))}
                      {programs.length === 0 && (
                        <>
                          <option value="prog-fe-1">Frontend Development</option>
                          <option value="prog-be-1">Backend Development</option>
                          <option value="prog-fs-1">Full Stack Development with AI</option>
                          <option value="prog-ai-1">Artificial Intelligence & Machine Learning</option>
                          <option value="prog-ds-1">Data Science</option>
                          <option value="prog-mob-1">Mobile App Development</option>
                          <option value="prog-sec-1">Cybersecurity</option>
                          <option value="prog-ui-1">UI/UX Design</option>
                          <option value="prog-cld-1">Cloud & DevOps</option>
                          <option value="prog-qa-1">Software Testing & QA</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '600' }}>Program Track Type</label>
                      <select 
                        value={enrollForm.track}
                        onChange={(e) => setEnrollForm({...enrollForm, track: e.target.value})}
                        style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                      >
                        <option value="Internship">Practical Internship</option>
                        <option value="Training">Intensive Training</option>
                        <option value="Certification">Executive Certification</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '600' }}>Duration / Access Window</label>
                      <select 
                        value={enrollForm.duration}
                        onChange={(e) => setEnrollForm({...enrollForm, duration: e.target.value})}
                        style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                      >
                        <option value="1 Week">1 Week</option>
                        <option value="2 Weeks">2 Weeks</option>
                        <option value="1 Month">1 Month</option>
                        <option value="2 Months">2 Months</option>
                        <option value="3 Months">3 Months</option>
                        <option value="6 Months">6 Months</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary" style={{ padding: '0.85rem', marginTop: '0.5rem' }}>
                    Officially Enroll Student Candidate
                  </button>
                </form>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 4: TASK ASSIGNER DESK */}
            {/* ======================================================== */}
            {activeTab === 'assignTask' && (
              <div className="corporate-card" style={{ padding: '2rem', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', maxWidth: '750px', margin: '0 auto' }}>
                <h3 style={{ fontSize: '1.4rem', color: '#0b0f19', marginBottom: '0.35rem' }}>Assign Domain Task to Student</h3>
                <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                  Select an enrolled candidate and assign specific project deliverables and deadlines.
                </p>

                <form onSubmit={handleAssignTask} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '600' }}>Select Enrolled Candidate</label>
                    <select 
                      required
                      value={assignForm.applicationId}
                      onChange={(e) => setAssignForm({...assignForm, applicationId: e.target.value})}
                      style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
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
                      style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '600' }}>Due Date</label>
                    <input 
                      type="date" 
                      required
                      value={assignForm.dueDate}
                      onChange={(e) => setAssignForm({...assignForm, dueDate: e.target.value})}
                      style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '600' }}>Project Requirements</label>
                    <textarea 
                      rows={4}
                      required
                      value={assignForm.description}
                      onChange={(e) => setAssignForm({...assignForm, description: e.target.value})}
                      style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    />
                  </div>

                  <button type="submit" className="btn-coral" style={{ padding: '0.85rem' }}>
                    Assign Task
                  </button>
                </form>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 5: POST NEW INTERNSHIP */}
            {/* ======================================================== */}
            {activeTab === 'programs' && (
              <div className="corporate-card" style={{ padding: '2rem', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', maxWidth: '750px', margin: '0 auto' }}>
                <h3 style={{ fontSize: '1.4rem', color: '#0b0f19', marginBottom: '0.35rem' }}>Post New Internship Opportunity</h3>
                <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
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
                        style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '600' }}>Domain</label>
                      <select 
                        value={newProgram.domain}
                        onChange={(e) => setNewProgram({...newProgram, domain: e.target.value})}
                        style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
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
                      style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    />
                  </div>

                  <button type="submit" className="btn-coral" style={{ padding: '0.85rem' }}>
                    Publish Internship Opportunity
                  </button>
                </form>
              </div>
            )}

          </main>
        </div>

      </div>

      {/* ======================================================== */}
      {/* EDIT ENROLLMENT MODAL */}
      {/* ======================================================== */}
      {editingApp && (
        <div className="modal-overlay" onClick={() => setEditingApp(null)} style={{ zIndex: 99999 }}>
          <div 
            className="modal-content corporate-card" 
            onClick={(e) => e.stopPropagation()} 
            style={{ maxWidth: '600px', width: '90%', padding: '2rem', borderRadius: '16px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', color: '#0b0f19', margin: 0 }}>Edit Student Program Assignment</h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0.25rem 0 0 0' }}>
                  Student: <strong style={{ color: '#2563eb' }}>{editingApp.studentName}</strong> ({editingApp.studentEmail})
                </p>
              </div>
              <button 
                onClick={() => setEditingApp(null)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEditEnrollment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '600' }}>Program Title</label>
                <input 
                  type="text" 
                  required
                  value={editForm.programTitle}
                  onChange={(e) => setEditForm({...editForm, programTitle: e.target.value})}
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '600' }}>Domain Category</label>
                  <input 
                    type="text" 
                    required
                    value={editForm.domain}
                    onChange={(e) => setEditForm({...editForm, domain: e.target.value})}
                    style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '600' }}>Track Type</label>
                  <select 
                    value={editForm.programTrack}
                    onChange={(e) => setEditForm({...editForm, programTrack: e.target.value})}
                    style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  >
                    <option value="Internship">Practical Internship</option>
                    <option value="Training">Intensive Training</option>
                    <option value="Certification">Executive Certification</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '600' }}>Access Duration</label>
                  <select 
                    value={editForm.selectedDuration}
                    onChange={(e) => setEditForm({...editForm, selectedDuration: e.target.value})}
                    style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  >
                    <option value="1 Week">1 Week</option>
                    <option value="2 Weeks">2 Weeks</option>
                    <option value="1 Month">1 Month</option>
                    <option value="2 Months">2 Months</option>
                    <option value="3 Months">3 Months</option>
                    <option value="6 Months">6 Months</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.35rem', fontWeight: '600' }}>Enrollment Status</label>
                  <select 
                    value={editForm.status}
                    onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                    style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  >
                    <option value="Approved">Approved / Active</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending Review</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.75rem' }}>
                <button 
                  type="button" 
                  onClick={() => setEditingApp(null)}
                  className="btn-secondary"
                  style={{ padding: '0.65rem 1.25rem' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                  style={{ padding: '0.65rem 1.5rem' }}
                >
                  Save Changes
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* CUSTOM IN-APP UNENROLL CONFIRMATION MODAL */}
      {/* ======================================================== */}
      {appToDelete && (
        <div className="modal-overlay" onClick={() => setAppToDelete(null)} style={{ zIndex: 99999 }}>
          <div 
            className="modal-content corporate-card" 
            onClick={(e) => e.stopPropagation()} 
            style={{ maxWidth: '480px', width: '90%', textAlign: 'center', padding: '2rem', borderRadius: '16px' }}
          >
            <h3 style={{ fontSize: '1.35rem', color: '#0b0f19', marginBottom: '0.5rem' }}>
              Remove Student Enrollment
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              Are you sure you want to unenroll <strong>{appToDelete.studentName}</strong> from <strong>{appToDelete.programTitle}</strong>?
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button 
                onClick={() => setAppToDelete(null)}
                className="btn-secondary"
                style={{ padding: '0.65rem 1.5rem' }}
              >
                Cancel
              </button>
              <button 
                onClick={confirmDeleteApplication}
                className="btn-coral"
                style={{ padding: '0.65rem 1.5rem', background: '#dc2626', borderColor: '#b91c1c' }}
              >
                Yes, Unenroll Student
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* CUSTOM IN-APP USER DELETION MODAL */}
      {/* ======================================================== */}
      {userToDelete && (
        <div className="modal-overlay" onClick={() => setUserToDelete(null)} style={{ zIndex: 99999 }}>
          <div 
            className="modal-content corporate-card" 
            onClick={(e) => e.stopPropagation()} 
            style={{ maxWidth: '480px', width: '90%', textAlign: 'center', padding: '2rem', borderRadius: '16px' }}
          >
            <h3 style={{ fontSize: '1.35rem', color: '#0b0f19', marginBottom: '0.5rem' }}>
              Remove Account from Database
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              Are you sure you want to permanently delete <strong>{userToDelete.name}</strong> (<span style={{ color: '#2563eb' }}>{userToDelete.email}</span>)?
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
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
                Yes, Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* PROJECT EVALUATION MODAL */}
      {/* ======================================================== */}
      {selectedTask && (
        <div className="modal-overlay" onClick={() => setSelectedTask(null)} style={{ zIndex: 99999 }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px', borderRadius: '16px' }}>
            <button 
              onClick={() => setSelectedTask(null)}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: '#f1f5f9', color: '#64748b', borderRadius: '50%', width: '32px', height: '32px', border: 'none', cursor: 'pointer' }}
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
                <textarea rows={3} required value={evalScores.feedback} onChange={(e) => setEvalScores({...evalScores, feedback: e.target.value})} style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setSelectedTask(null)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-coral">
                  Approve Grade & Issue Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

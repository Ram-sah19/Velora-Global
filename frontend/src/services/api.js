const API_BASE = 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.warn(`API call failed for ${endpoint}:`, err.message);
    throw err;
  }
}

export const api = {
  // Health
  getHealth: () => request('/health'),

  // Users & Leadership
  getFounders: () => request('/users/founders'),
  registerStudent: (data) => request('/users/register', { method: 'POST', body: JSON.stringify(data) }),

  // Programs
  getPrograms: (domain = '', search = '') => request(`/programs?domain=${encodeURIComponent(domain)}&search=${encodeURIComponent(search)}`),
  getProgramById: (id) => request(`/programs/${id}`),
  createProgram: (data) => request('/programs', { method: 'POST', body: JSON.stringify(data) }),

  // Applications
  getApplications: (studentId = '', status = '') => request(`/applications?studentId=${encodeURIComponent(studentId)}&status=${encodeURIComponent(status)}`),
  submitApplication: (data) => request('/applications', { method: 'POST', body: JSON.stringify(data) }),
  updateApplicationStatus: (id, status) => request(`/applications/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),

  // Tasks & Submissions
  getTasks: (studentId = '', applicationId = '') => request(`/tasks?studentId=${encodeURIComponent(studentId)}&applicationId=${encodeURIComponent(applicationId)}`),
  assignTask: (data) => request('/tasks/assign', { method: 'POST', body: JSON.stringify(data) }),
  submitTask: (taskId, submissionData) => request(`/tasks/${taskId}/submit`, { method: 'PUT', body: JSON.stringify(submissionData) }),

  // Evaluations
  getEvaluations: () => request('/evaluations'),
  evaluateTask: (data) => request('/evaluations', { method: 'POST', body: JSON.stringify(data) }),

  // Certificates
  getCertificates: (studentId = '') => request(`/certificates?studentId=${encodeURIComponent(studentId)}`),
  verifyCertificate: (certId) => request(`/certificates/verify/${encodeURIComponent(certId)}`),

  // Client Inquiries
  submitClientInquiry: (data) => request('/client-inquiries', { method: 'POST', body: JSON.stringify(data) }),

  // Stats
  getStats: () => request('/stats')
};

import axios from 'axios';

// Create Axios instance with base configuration
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to automatically attach JWT token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('dsa_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle expired sessions
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized on a protected route, token is invalid or expired
      if (
        !error.config.url.includes('/auth/login') &&
        !error.config.url.includes('/auth/register')
      ) {
        localStorage.removeItem('dsa_token');
        localStorage.removeItem('dsa_user');
      }
    }
    return Promise.reject(error);
  }
);

// Auth Services
export const authService = {
  login: async (credentials) => {
    const response = await API.post('/auth/login', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await API.post('/auth/register', userData);
    return response.data;
  },
  getMe: async () => {
    const response = await API.get('/auth/me');
    return response.data;
  }
};

// Problem Services
export const problemService = {
  getProblems: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.topic && filters.topic !== 'All') params.append('topic', filters.topic);
    if (filters.difficulty && filters.difficulty !== 'All') params.append('difficulty', filters.difficulty);
    if (filters.status && filters.status !== 'All') params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);
    if (filters.sort) params.append('sort', filters.sort);

    const response = await API.get(`/problems?${params.toString()}`);
    return response.data;
  },
  getProblemById: async (id) => {
    const response = await API.get(`/problems/${id}`);
    return response.data;
  },
  createProblem: async (problemData) => {
    const response = await API.post('/problems', problemData);
    return response.data;
  },
  updateProblem: async (id, problemData) => {
    const response = await API.put(`/problems/${id}`, problemData);
    return response.data;
  },
  toggleProblemStatus: async (id) => {
    const response = await API.patch(`/problems/${id}/toggle`);
    return response.data;
  },
  deleteProblem: async (id) => {
    const response = await API.delete(`/problems/${id}`);
    return response.data;
  },
  seedStarterProblems: async () => {
    const response = await API.post('/problems/seed');
    return response.data;
  }
};

// Progress Services
export const progressService = {
  getProgress: async () => {
    const response = await API.get('/progress');
    return response.data;
  }
};

// Profile Services
export const profileService = {
  getProfile: async () => {
    const response = await API.get('/profile');
    return response.data;
  },
  updateProfile: async (profileData) => {
    const response = await API.put('/profile', profileData);
    return response.data;
  }
};

export default API;

import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// News API
export const newsAPI = {
  getAll: () => axios.get(`${API}/admin/news`, { headers: getAuthHeaders() }),
  create: (data) => axios.post(`${API}/admin/news`, data, { headers: getAuthHeaders() }),
  update: (id, data) => axios.put(`${API}/admin/news/${id}`, data, { headers: getAuthHeaders() }),
  delete: (id) => axios.delete(`${API}/admin/news/${id}`, { headers: getAuthHeaders() })
};

// Services API
export const servicesAPI = {
  getAll: () => axios.get(`${API}/admin/services`, { headers: getAuthHeaders() }),
  create: (data) => axios.post(`${API}/admin/services`, data, { headers: getAuthHeaders() }),
  update: (id, data) => axios.put(`${API}/admin/services/${id}`, data, { headers: getAuthHeaders() }),
  delete: (id) => axios.delete(`${API}/admin/services/${id}`, { headers: getAuthHeaders() })
};

// Categories API
export const categoriesAPI = {
  getAll: () => axios.get(`${API}/admin/categories`, { headers: getAuthHeaders() }),
  create: (data) => axios.post(`${API}/admin/categories`, data, { headers: getAuthHeaders() }),
  update: (id, data) => axios.put(`${API}/admin/categories/${id}`, data, { headers: getAuthHeaders() }),
  delete: (id) => axios.delete(`${API}/admin/categories/${id}`, { headers: getAuthHeaders() })
};

// Products API
export const productsAPI = {
  getAll: () => axios.get(`${API}/admin/products`, { headers: getAuthHeaders() }),
  create: (data) => axios.post(`${API}/admin/products`, data, { headers: getAuthHeaders() }),
  update: (id, data) => axios.put(`${API}/admin/products/${id}`, data, { headers: getAuthHeaders() }),
  delete: (id) => axios.delete(`${API}/admin/products/${id}`, { headers: getAuthHeaders() })
};

// Projects API
export const projectsAPI = {
  getAll: () => axios.get(`${API}/admin/projects`, { headers: getAuthHeaders() }),
  create: (data) => axios.post(`${API}/admin/projects`, data, { headers: getAuthHeaders() }),
  update: (id, data) => axios.put(`${API}/admin/projects/${id}`, data, { headers: getAuthHeaders() }),
  delete: (id) => axios.delete(`${API}/admin/projects/${id}`, { headers: getAuthHeaders() })
};

// User submissions API
export const submissionsAPI = {
  getCallbacks: () => axios.get(`${API}/admin/callbacks`, { headers: getAuthHeaders() }),
  updateCallbackStatus: (id, status) => axios.put(`${API}/admin/callbacks/${id}/status?status=${status}`, {}, { headers: getAuthHeaders() }),
  
  getOrders: () => axios.get(`${API}/admin/orders`, { headers: getAuthHeaders() }),
  updateOrderStatus: (id, status) => axios.put(`${API}/admin/orders/${id}/status?status=${status}`, {}, { headers: getAuthHeaders() }),
  
  getMessages: () => axios.get(`${API}/admin/messages`, { headers: getAuthHeaders() }),
  updateMessageStatus: (id, status) => axios.put(`${API}/admin/messages/${id}/status?status=${status}`, {}, { headers: getAuthHeaders() })
};

// Public forms API
export const formsAPI = {
  submitCallback: (data) => axios.post(`${API}/callback`, data),
  submitOrder: (data) => axios.post(`${API}/order`, data),
  submitContact: (data) => axios.post(`${API}/contact`, data)
};

// Carousel API
export const carouselAPI = {
  getAll: () => axios.get(`${API}/admin/carousel`, { headers: getAuthHeaders() }),
  create: (data) => axios.post(`${API}/admin/carousel`, data, { headers: getAuthHeaders() }),
  update: (id, data) => axios.put(`${API}/admin/carousel/${id}`, data, { headers: getAuthHeaders() }),
  delete: (id) => axios.delete(`${API}/admin/carousel/${id}`, { headers: getAuthHeaders() })
};

// Advantages API
export const advantagesAPI = {
  getAll: () => axios.get(`${API}/admin/advantages`, { headers: getAuthHeaders() }),
  create: (data) => axios.post(`${API}/admin/advantages`, data, { headers: getAuthHeaders() }),
  update: (id, data) => axios.put(`${API}/admin/advantages/${id}`, data, { headers: getAuthHeaders() }),
  delete: (id) => axios.delete(`${API}/admin/advantages/${id}`, { headers: getAuthHeaders() })
};

// About API
export const aboutAPI = {
  get: () => axios.get(`${API}/admin/about`, { headers: getAuthHeaders() }),
  update: (data) => axios.put(`${API}/admin/about`, data, { headers: getAuthHeaders() })
};

// Settings API
export const settingsAPI = {
  get: () => axios.get(`${API}/admin/settings`, { headers: getAuthHeaders() }),
  update: (data) => axios.put(`${API}/admin/settings`, data, { headers: getAuthHeaders() })
};

// Auth API
export const authAPI = {
  login: (credentials) => axios.post(`${API}/admin/login`, credentials),
  verify: () => axios.get(`${API}/admin/verify`, { headers: getAuthHeaders() })
};

const api = {
  newsAPI,
  servicesAPI,
  categoriesAPI,
  productsAPI,
  projectsAPI,
  submissionsAPI,
  formsAPI,
  carouselAPI,
  advantagesAPI,
  aboutAPI,
  settingsAPI,
  authAPI
};

export default api;
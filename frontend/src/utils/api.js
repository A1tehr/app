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
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);

// Projects
export const getProjects         = ()         => api.get('/projects');
export const getFeaturedProjects = ()         => api.get('/projects/featured');
export const getProjectBySlug    = (slug)     => api.get(`/projects/${slug}`);
export const toggleFeatured      = (id)       => api.patch(`/projects/${id}/featured`);
export const createProject = (formData, config = {}) => api.post('/projects', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
  timeout: 60000,
  ...config,
});
export const updateProject = (id, formData, config = {}) => api.put(`/projects/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
  timeout: 60000,
  ...config,
});
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// Certifications
export const getCertifications = () => api.get('/certifications');
export const createCertification = (formData) => api.post('/certifications', formData, { 
  headers: { 'Content-Type': 'multipart/form-data' },
  timeout: 30000
});
export const updateCertification = (id, formData) => api.put(`/certifications/${id}`, formData, { 
  headers: { 'Content-Type': 'multipart/form-data' },
  timeout: 30000
});
export const deleteCertification = (id) => api.delete(`/certifications/${id}`);

// Skills
export const getSkills = () => api.get('/skills');
export const createSkill = (data) => api.post('/skills', data);
export const updateSkill = (id, data) => api.put(`/skills/${id}`, data);
export const deleteSkill = (id) => api.delete(`/skills/${id}`);

// Gallery
export const getGallery = (category) => api.get('/gallery', { params: { category } });
export const createGalleryItem = (formData) => api.post('/gallery', formData, { 
  headers: { 'Content-Type': 'multipart/form-data' },
  timeout: 30000
});
export const deleteGalleryItem = (id) => api.delete(`/gallery/${id}`);

// About
export const getAbout = () => api.get('/about');
export const updateAbout = (formData) => api.put('/about', formData, { 
  headers: { 'Content-Type': 'multipart/form-data' },
  timeout: 30000
});

export default api;

// Blogs
export const getBlogs = (params) => api.get('/blogs', { params });
export const getBlogBySlug = (slug) => api.get(`/blogs/${slug}`);
export const getRelatedBlogs = (slug) => api.get(`/blogs/${slug}/related`);
export const createBlog = (formData) => api.post('/blogs', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateBlog = (id, formData) => api.put(`/blogs/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const toggleBlogPublish = (id) => api.patch(`/blogs/${id}/publish`);
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);

// src/services/api.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://travel-planner-0sg1.onrender.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 60000, // Render cold start için 60sn
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor — JWT token ekle
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('wandersticker_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor — Hata yönetimi
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token süresi dolmuş veya geçersiz
      localStorage.removeItem('wandersticker_token');
      window.dispatchEvent(new CustomEvent('auth:expired'));
    }

    // Render uyku modundan uyanma mesajı
    if (error.code === 'ECONNABORTED' || error.response?.status === 503) {
      error.isRenderWakeUp = true;
    }

    return Promise.reject(error);
  }
);

// ---- API Çağrıları ----

// Rota oluştur (AI destekli)
export const createItinerary = (data) =>
  api.post('/routes/generate', data);

// Kullanıcının rotalarını getir
export const getMyItineraries = () =>
  api.get('/routes/my');

// Belirli bir rotayı getir
export const getItineraryById = (id) =>
  api.get(`/routes/${id}`);

// Rotayı kaydet (auth gerekli)
export const saveItinerary = (data) =>
  api.post('/routes/save', data);

// Rotayı sil
export const deleteItinerary = (id) =>
  api.delete(`/routes/${id}`);

export default api;
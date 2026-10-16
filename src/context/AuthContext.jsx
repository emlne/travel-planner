// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('wandersticker_token'));
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'signup'

  // Token varsa kullanıcı bilgisini çek
  useEffect(() => {
    const fetchMe = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get('/auth/me');
        setUser(res.data.user || res.data);
      } catch {
        // Token geçersiz, temizle
        localStorage.removeItem('wandersticker_token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, [token]);

  const login = useCallback(async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { token: newToken, user: userData } = res.data;
    localStorage.setItem('wandersticker_token', newToken);
    setToken(newToken);
    setUser(userData);
    setAuthModalOpen(false);
    toast.success(`Hoş geldin, ${userData.name || userData.email}! 🎉`);
    return userData;
  }, []);

  const signup = useCallback(async (email, password) => {
    const res = await api.post('/auth/register', { email, password });
    const { token: newToken, user: userData } = res.data;
    localStorage.setItem('wandersticker_token', newToken);
    setToken(newToken);
    setUser(userData);
    setAuthModalOpen(false);
    toast.success(`Hesabın oluşturuldu! Haydi seyahate! ✈️`);
    return userData;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('wandersticker_token');
    setToken(null);
    setUser(null);
    toast.success('Güle güle! Tekrar görüşürüz 👋');
  }, []);

  const openAuthModal = useCallback((mode = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthModalOpen(false);
  }, []);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    authModalOpen,
    authModalMode,
    openAuthModal,
    closeAuthModal,
    setAuthModalMode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

export default AuthContext;
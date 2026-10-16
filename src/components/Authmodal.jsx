// src/components/AuthModal.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import styles from './Authmodal.module.css';

const AuthModal = () => {
  const { authModalOpen, authModalMode, closeAuthModal, login, signup, setAuthModalMode } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const isLogin = authModalMode === 'login';

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      if (isLogin) {
        await login(form.email, form.password);
      } else {
        if (!form.name.trim()) {
          toast.error('İsim alanı zorunlu!');
          return;
        }
        await signup(form.name, form.email, form.password);
      }
      setForm({ name: '', email: '', password: '' });
    } catch (err) {
      const msg = err?.response?.data?.message || (isLogin ? 'Giriş başarısız.' : 'Kayıt başarısız.');
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setAuthModalMode(isLogin ? 'signup' : 'login');
    setForm({ name: '', email: '', password: '' });
  };

  return (
    <AnimatePresence>
      {authModalOpen && (
        <div className={styles.modalContainer}>
          {/* Karanlık Arka Plan */}
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAuthModal}
          />

          {/* Cam Efektli (Glassmorphism) Modal */}
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Kapat Butonu */}
            <button className={styles.closeBtn} onClick={closeAuthModal}>
              ✕
            </button>

            {/* Header */}
            <div className={styles.header}>
              <h2 className={styles.title}>
                {isLogin ? 'Hoş Geldiniz' : 'Aramıza Katılın'}
              </h2>
              <p className={styles.subtitle}>
                {isLogin
                  ? 'Kaldığınız yerden rotalarınızı planlamaya devam edin.'
                  : 'Fethiye seyahat hayallerinizi gerçeğe dönüştürün.'}
              </p>
            </div>

            {/* Form */}
            <form className={styles.form} onSubmit={handleSubmit}>
              <AnimatePresence>
                {!isLogin && (
                  <motion.div
                    className={styles.field}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className={styles.label}>Adınız Soyadınız</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Ahmet Yılmaz"
                      className={styles.input}
                      required={!isLogin}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className={styles.field}>
                <label className={styles.label}>E-posta Adresi</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="ornek@mail.com"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Şifre</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={styles.input}
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={loading}
              >
                {loading ? 'İşlem yapılıyor... ⏳' : isLogin ? 'Giriş Yap' : 'Kayıt Ol ✨'}
              </button>
            </form>

            {/* Geçiş */}
            <div className={styles.switchArea}>
              <span className={styles.switchText}>
                {isLogin ? 'Hesabınız yok mu?' : 'Zaten üye misiniz?'}
              </span>
              <button type="button" className={styles.switchBtn} onClick={switchMode}>
                {isLogin ? 'Hemen kaydolun' : 'Giriş yapın'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default AuthModal;
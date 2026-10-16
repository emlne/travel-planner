// src/components/Navbar.jsx
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';
import { useState } from 'react';
import MyItinerariesSidebar from './MyItinerariesSidebar';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();

  // Sidebar'ın açık/kapalı durumunu tutan State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <> {/* Bütün her şeyi sarmalayan boş bir Fragment */}
      <nav className={styles.navbar}>
        {/* Sol Taraf: Marka Logosu */}
        <div className={styles.logoContainer}>
          <Link to="/" className={styles.logoLink} >
            <h1 className={styles.brandName}>ROSERY</h1>
          </Link>
        </div>

        {/* Sağ Taraf: Kullanıcı/Giriş İşlemleri */}
        <div className={styles.actions}>
          {isAuthenticated ? (
            <div className={styles.userProfile}>
              <div className={styles.avatar}>
                {(user?.name || user?.email || 'U')[0].toUpperCase()}
              </div>
              <span className={styles.greeting}>Merhaba, {user?.name || 'Gezgin'}</span>

              {/* --- YENİ EKLENEN KISIM: Rotalarım Butonu --- */}
              <button
                className={styles.myRoutesBtn}
                onClick={() => setIsSidebarOpen(true)}
              >
                🗺️ Rotalarım
              </button>

              <button className={styles.logoutBtn} onClick={logout}>
                Çıkış
              </button>
            </div>
          ) : (
            <div className={styles.authButtons}>
              <button
                className={styles.loginBtn}
                onClick={() => openAuthModal('login')}
              >
                Giriş Yap
              </button>
              <button
                className={styles.registerBtn}
                onClick={() => openAuthModal('signup')}
              >
                Kayıt Ol ✨
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* --- YENİ EKLENEN KISIM: Sidebar Bileşeni --- */}
      {/* isOpen true olduğunda ekrana gelir, onClose tetiklendiğinde kapanır */}
      <MyItinerariesSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
};

export default Navbar;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getMyItineraries, deleteItinerary } from '../services/api';
import toast from 'react-hot-toast';
import styles from './MyItinerariesSidebar.module.css';

const MyItinerariesSidebar = ({ isOpen, onClose }) => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Sidebar her açıldığında verileri taze çek
  useEffect(() => {
    if (isOpen) {
      fetchMyRoutes();
    }
  }, [isOpen]);

  const fetchMyRoutes = async () => {
    setLoading(true);
    try {
      const response = await getMyItineraries();
      setItineraries(response.data.data || response.data || []);
    } catch (error) {
      toast.error('Rotalarınız yüklenemedi.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm('Bu rotayı silmek istediğinize emin misiniz?')) {
      try {
        await deleteItinerary(id);
        setItineraries(itineraries.filter(route => route._id !== id));
        toast.success('Rota silindi. 🗑️');
      } catch (error) {
        toast.error('Rota silinemedi.');
      }
    }
  };

  const handleRouteClick = (id) => {
    onClose(); // Sidebar'ı kapat
    navigate(`/itinerary/${id}`); // Rotaya git
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Karanlık Arka Plan (Overlay) - Tıklayınca kapanır */}
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sağdan Açılan Çekmece */}
          <motion.div
            className={styles.sidebar}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className={styles.header}>
              <h2>Kayıtlı Rotalarım</h2>
              <button className={styles.closeBtn} onClick={onClose}>✕</button>
            </div>

            <div className={styles.content}>
              {loading ? (
                <div className={styles.message}>Rotalarınız getiriliyor... ⏳</div>
              ) : itineraries.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>🗺️</div>
                  <p>Henüz hiç rotanız yok!</p>
                  <button className={styles.createBtn} onClick={() => { onClose(); navigate('/'); }}>
                    İlk Rotanı Çiz
                  </button>
                </div>
              ) : (
                <div className={styles.list}>
                  {itineraries.map((route) => (
                    <motion.div 
                      key={route._id} 
                      className={styles.card}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleRouteClick(route._id)}
                    >
                      <div className={styles.cardHeader}>
                        <h4 className={styles.cardTitle}>{route.routeTitle || route.destination || 'İsimsiz Rota'}</h4>
                        <button 
                          className={styles.deleteBtn} 
                          onClick={(e) => handleDelete(e, route._id)}
                        >
                          ✕
                        </button>
                      </div>
                      <div className={styles.cardBody}>
                        <span className={styles.badge}>📅 {route.totalDays || 3} Gün</span>
                        <span className={styles.badge}>📍 {route.dailyPlans?.reduce((acc, day) => acc + (day.placesToVisit?.length || 0), 0) || 0} Mekan</span>
                      </div>
                      <div className={styles.cardFooter}>
                        {new Date(route.createdAt).toLocaleDateString('tr-TR')}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MyItinerariesSidebar;
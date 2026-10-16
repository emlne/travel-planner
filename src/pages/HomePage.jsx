// src/pages/HomePage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItinerary } from '../services/api';
import styles from './HomePage.module.css';
import bgImage from '../assets/bg-fethiye.png';

const HomePage = () => {
  const navigate = useNavigate();
  
  // Form State'leri
  const [destination, setDestination] = useState('');
  const [selectedDay, setSelectedDay] = useState(3);
  const [selectedVehicle, setSelectedVehicle] = useState('car');
  
  // YENİ 1: Kategoriler için state ekledik
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  // Yüklenme ve Hata State'leri
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const days = [1, 2, 3, 5, 7, 10];
  const vehicles = [
    { id: 'car', icon: '🚗', label: 'Araba' },
    { id: 'walking', icon: '🚶', label: 'Yürüyüş' },
    { id: 'bus', icon: '🚌', label: 'Otobüs' }
  ];

  // YENİ 2: Fethiye konseptine uygun kategoriler dizisi
  const categoriesList = [
    { id: 'deniz', label: '🏖️ Deniz' },
    { id: 'tarih', label: '🏛️ Tarih' },
    { id: 'doğa', label: '🌲 Doğa' },
    { id: 'adrenalin', label: '🪂 Macera' },
    { id: 'eğlence', label: '🍹 Gece' }
  ];

  // YENİ 3: Kategori seçme/kaldırma fonksiyonu (Çoklu seçim)
  const toggleCategory = (catId) => {
    setSelectedCategories(prev => 
      prev.includes(catId) 
        ? prev.filter(c => c !== catId) 
        : [...prev, catId]
    );
  };

  const handleGenerateRoute = async () => {
    if (!destination.trim()) {
      setErrorMessage('Lütfen hedef rotanızı yazın (Örn: Saklıkent)');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    try {
      // YENİ 4: Backend'in güncellenmiş modeline BİREBİR uygun veri yapısı
      const payload = {
        destination: destination,
        days: selectedDay,          
        vehicle: selectedVehicle,    // hasCar yerine vehicle yaptık
        categories: selectedCategories // Seçilen kategoriler dizisi
      };

      const response = await createItinerary(payload);
      const generatedRouteData = response.data.data; 

      navigate('/itinerary/preview', { state: { routeData: generatedRouteData } });
    } catch (error) {
      console.error("Rota oluşturma hatası:", error);
      
      if (error.isRenderWakeUp) {
        setErrorMessage('Yapay zeka motoru uykudan uyanıyor, bu işlem 1 dakika kadar sürebilir. Lütfen tekrar tıkla. ⏳');
      } else {
        setErrorMessage('Rotanız oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className={styles.homeContainer}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(10, 25, 47, 0.4) 0%, rgba(10, 25, 47, 0.75) 50%, rgba(10, 25, 47, 0.9) 100%), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className={styles.heroSection}>
        <span className={styles.subtitle}>AI-Powered Fethiye Travel Planner</span>
        <h1 className={styles.mainTitle}>
          Seyahat Rüyalarını <br />
          <span className={styles.gradientText}>Gerçeğe Dönüştür</span>
        </h1>
        <p className={styles.description}>
          Gemini AI ile kişiselleştirilmiş rotanı saniyeler içinde oluştur. Her
          mekana özel sticker, her güne özel macera! ✨
        </p>
      </div>

      <div className={styles.glassCard}>
        <div className={styles.cardHeader}>
          <span className={styles.planeIcon}>✈️</span> Rota Planlayıcısı
        </div>

        <div className={styles.inputGroup}>
          <label>📍 Nereye gitmek istiyorsun?</label>
          <input
            type="text"
            className={styles.destinationInput}
            placeholder="Ölüdeniz, Saklıkent, Kelebekler Vadisi..."
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              setErrorMessage('');
            }}
            disabled={isLoading}
          />
        </div>

        {/* YENİ 5: Kategori Seçim Arayüzü */}
        <div className={styles.filterGroup} style={{ marginBottom: '20px' }}>
          <label>🎯 Neler yapmak istersin? (Çoklu seçebilirsin)</label>
          <div className={styles.categoriesWrapper}>
            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.categoryBadge} ${selectedCategories.includes(cat.id) ? styles.activeCategory : ''}`}
                onClick={() => toggleCategory(cat.id)}
                disabled={isLoading}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filtersRow}>
          <div className={styles.filterGroup}>
            <label>🗓️ Kaç gün?</label>
            <div className={styles.buttonGroup}>
              {days.map((day) => (
                <button
                  key={day}
                  className={`${styles.circleBtn} ${selectedDay === day ? styles.activeDay : ''}`}
                  onClick={() => setSelectedDay(day)}
                  disabled={isLoading}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label>🚙 Ulaşım Aracı</label>
            <div className={styles.buttonGroup}>
              {vehicles.map((v) => (
                <button
                  key={v.id}
                  className={`${styles.boxBtn} ${selectedVehicle === v.id ? styles.activeVehicle : ''}`}
                  onClick={() => setSelectedVehicle(v.id)}
                  title={v.label}
                  disabled={isLoading}
                >
                  {v.icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {errorMessage && (
          <div style={{ color: '#ff758c', fontSize: '14px', marginTop: '10px', textAlign: 'center' }}>
            {errorMessage}
          </div>
        )}

        <button 
          className={styles.generateBtn} 
          onClick={handleGenerateRoute}
          disabled={isLoading}
          style={{ opacity: isLoading ? 0.7 : 1 }}
        >
          {isLoading ? 'Yapay Zeka Planlıyor... ⏳' : 'Rotamı Çiz ✨'}
        </button>
      </div>
    </div>
  );
};

export default HomePage;
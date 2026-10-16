// src/components/ItineraryDetails.jsx
import { useState, useMemo, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useAuth } from '../context/AuthContext';
import { saveItinerary, getItineraryById } from '../services/api';
import toast from 'react-hot-toast';
import styles from './Itinerarydetails.module.css';

const mapContainerStyle = { width: '100%', height: '100%', borderRadius: '20px' };
const fethiyeCenter = { lat: 36.6217, lng: 29.1415 };

// Harita için havalı karanlık tema
const options = { 
  disableDefaultUI: true, 
  zoomControl: true, 
  styles: [ { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#193341" } ] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [ { "color": "#2c5a71" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#29768a" }, { "lightness": -37 } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#406d80" } ] }, { "featureType": "transit", "elementType": "geometry", "stylers": [ { "color": "#406d80" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "visibility": "on" }, { "color": "#3e606f" }, { "weight": 2 }, { "gamma": 0.84 } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#ffffff" } ] } ] 
};

const ItineraryDetails = () => {
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const locationInfo = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const [activeMarker, setActiveMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState(fethiyeCenter);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (locationInfo.state?.routeData) {
      setItinerary(locationInfo.state.routeData);
      setLoading(false);
    } else if (id && id !== 'preview') {
      const fetchRoute = async () => {
        try {
          const res = await getItineraryById(id);
          setItinerary(res.data.data);
          setSaved(true);
        } catch (error) {
          toast.error("Rota bulunamadı veya silinmiş.");
          navigate('/');
        } finally {
          setLoading(false);
        }
      };
      fetchRoute();
    } else {
      navigate('/');
    }
  }, [id, locationInfo.state, navigate]);

  // Rotadaki tüm mekanları (koordinatları varsa) harita için düz bir listeye çevir
  const allLocations = useMemo(() => {
    if (!itinerary) return [];
    const days = itinerary.dailyPlans || itinerary.itinerary || itinerary.days || [];
    let locs = [];
    
    days.forEach((day, dayIndex) => {
      const places = day.locations || day.placesToVisit || day.activities || [];
      
      places.forEach((place) => {
        // Yapay zeka bize objeyi ve koordinatı doğru döndürdüyse listeye ekle
        if (typeof place === 'object' && place.coordinates && place.coordinates.lat) {
          locs.push({ 
            name: place.name, 
            coordinates: place.coordinates, 
            dayNumber: dayIndex + 1,
            description: place.description
          });
        }
      });
    });
    
    return locs;
  }, [itinerary]);

  const handleSave = async () => {
    if (!isAuthenticated) {
      toast('Rotayı kaydetmek için giriş yapın!', { icon: 'ℹ️' });
      openAuthModal('login');
      return;
    }
    if (saving || saved) return;
    setSaving(true);
    try {
      const payload = {
        routeTitle: itinerary.routeTitle || itinerary.destination || "Harika Rotanız",
        totalDays: itinerary.totalDays || itinerary.duration || 3,
        dailyPlans: itinerary.dailyPlans || itinerary.itinerary || itinerary.days,
        preferences: itinerary.preferences
      };
      const response = await saveItinerary(payload);
      setSaved(true);
      toast.success('Rota hesabınıza kaydedildi! 🎉');
      navigate(`/itinerary/${response.data.data._id}`, { replace: true });
    } catch (error) {
      toast.error('Kayıt başarısız oldu.');
    } finally {
      setSaving(false);
    }
  };

  const handleLocationClick = (loc) => {
    if (loc.coordinates?.lat) {
      setMapCenter(loc.coordinates);
      setActiveMarker(loc.name);
    }
  };

  if (loading) return <div className={styles.loadingScreen}>Harita çiziliyor... 🗺️</div>;
  if (!itinerary) return null;

  const days = itinerary.dailyPlans || itinerary.itinerary || itinerary.days || [];
  const isItineraryOwner = isAuthenticated && itinerary.user && String(itinerary.user) === String(user?._id);

  return (
    <div className={styles.splitContainer}>
      {/* SOL TARAF: LİSTE */}
      <div className={styles.listSection}>
        <div className={styles.headerGlass}>
          <button className={styles.backBtn} onClick={() => navigate('/')}>
            ← Ana Sayfaya Dön
          </button>
          <div className={styles.headerTop}>
            <h1 className={styles.title}>{itinerary.routeTitle || 'Keşif Rotası'}</h1>
            {!isItineraryOwner ? (
              <button className={`${styles.saveBtn} ${saved ? styles.saveBtnSaved : ''}`} onClick={handleSave}>
                {saved ? '✅ Kaydedildi' : '💾 Kaydet'}
              </button>
            ) : (
              <div className={styles.ownerBadge}>✅ Senin Rotan</div>
            )}
          </div>
          <div className={styles.metaInfo}>
            <span>📅 {itinerary.totalDays || days.length} Gün</span>
            {itinerary.preferences?.vehicle && (
              <span>🚙 {itinerary.preferences.vehicle === 'bus' ? 'Toplu Taşıma' : itinerary.preferences.vehicle === 'walking' ? 'Yürüyüş' : 'Özel Araç'}</span>
            )}
            <span>📍 {allLocations.length} Mekan</span>
          </div>
        </div>

        <div className={styles.daysTimeline}>
          {days.map((day, i) => {
            const places = day.locations || day.placesToVisit || day.activities || [];
            return (
              <div key={i} className={styles.dayBlock}>
                <div className={styles.dayHeader}>
                  <div className={styles.dayBadge}>Gün {i + 1}</div>
                  <h3 className={styles.dayTitle}>{day.title || day.theme}</h3>
                </div>
                {day.description && <p className={styles.dayDesc}>{day.description}</p>}
                
                <div className={styles.placesList}>
                  {places.map((place, j) => {
                    // Eğer place eski sistem string geldiyse çökmeyi önle, obje geldiyse direkt kullan
                    const placeObj = typeof place === 'string' ? { name: place } : place;
                    
                    return (
                      <motion.div 
                        key={j} 
                        className={styles.placeCard}
                        whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.08)' }}
                        onClick={() => handleLocationClick(placeObj)}
                      >
                        <div className={styles.placeIcon}>📍</div>
                        <div className={styles.placeInfo}>
                          <h4 className={styles.placeName}>{placeObj.name}</h4>
                          {placeObj.description && <p className={styles.placeDetail}>{placeObj.description}</p>}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* SAĞ TARAF: HARİTA */}
      <div className={styles.mapSection}>
        <div className={styles.mapWrapper}>
          {loadError ? (
            <div className={styles.mapError}>Harita yüklenemedi.</div>
          ) : !isLoaded ? (
            <div className={styles.mapLoading}>Google Haritalar Başlatılıyor...</div>
          ) : (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={12}
              center={mapCenter}
              options={options}
            >
              {allLocations.map((loc, i) => loc.coordinates?.lat && (
                <Marker
                  key={i}
                  position={loc.coordinates}
                  onClick={() => {
                    setActiveMarker(loc.name);
                    setMapCenter(loc.coordinates);
                  }}
                  icon={{
                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ff7eb3" width="36px" height="36px"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>'),
                    scaledSize: new window.google.maps.Size(40, 40)
                  }}
                >
                  {activeMarker === loc.name && (
                    
                    <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                      <div className={styles.infoWindow}>
                      <h4>{loc.name}</h4>
                      <p>{loc.dayNumber}. Gün Rotası</p>
    
                      {/* YENİ EKLENEN YOL TARİFİ BUTONU */}
                      <a 
                        href={`https://www.google.com/maps/dir/?api=1&destination=${loc.coordinates.lat},${loc.coordinates.lng}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.directionsBtn}
                       >
                        Yol Tarifi Al 🗺️
                      </a>
                      </div>
                    </InfoWindow>
                  )}
                </Marker>
              ))}
            </GoogleMap>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItineraryDetails;
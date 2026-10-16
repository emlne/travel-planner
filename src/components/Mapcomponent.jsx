// src/components/MapComponent.jsx
import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Polyline, OverlayView } from '@react-google-maps/api';
import { getCategoryColor } from '../utils/stickerUtils';
import styles from './MapComponent.module.css';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

const MAP_STYLES = [
  { elementType: 'geometry', stylers: [{ color: '#f8f4ed' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#6b5c45' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#fdfaf5' }] },
  { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#c9b99a' }] },
  { featureType: 'administrative.land_parcel', elementType: 'labels.text.fill', stylers: [{ color: '#ae9e90' }] },
  { featureType: 'landscape.natural', elementType: 'geometry', stylers: [{ color: '#dde6c3' }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#dde6c3' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#93817c' }] },
  { featureType: 'poi.park', elementType: 'geometry.fill', stylers: [{ color: '#a5c87a' }] },
  { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#447530' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#f5efe6' }] },
  { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#fdfcf8' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#f8c967' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#e9bc62' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#dfe2e3' }] },
  { featureType: 'water', elementType: 'geometry.fill', stylers: [{ color: '#b3d1ff' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#92998d' }] },
];

const mapContainerStyle = { width: '100%', height: '100%' };

// Tüm lokasyonlardan koordinatlar
const getAllLocations = (itinerary) => {
  if (!itinerary?.days) return [];
  return itinerary.days.flatMap((day, di) =>
    (day.locations || day.activities || []).map((loc, li) => ({
      ...loc,
      dayIndex: di,
      locIndex: li,
      id: `${di}-${li}`,
    }))
  ).filter(l => l.lat && l.lng);
};

const StickerMarker = ({ location, isSelected, onClick, dayIndex }) => {
  const color = getCategoryColor(location.category || location.type);
  const dayColors = ['#ff6b6b', '#4ecdc4', '#ffd93d', '#a8e063', '#9b59b6', '#ff8c42', '#74b9ff'];
  const markerColor = dayColors[dayIndex % dayColors.length] || color;

  return (
    <OverlayView
      position={{ lat: location.lat, lng: location.lng }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div
        className={`${styles.stickerMarker} ${isSelected ? styles.selected : ''}`}
        onClick={onClick}
        style={{ '--marker-color': markerColor }}
      >
        <div className={styles.markerEmoji}>
          {location.emoji || getCategoryEmoji(location.category)}
        </div>
        <div className={styles.markerLabel}>{location.name}</div>
        <div className={styles.markerPin} />
      </div>
    </OverlayView>
  );
};

const getCategoryEmoji = (category) => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('doğa') || cat.includes('nature')) return '🌿';
  if (cat.includes('tarih') || cat.includes('history')) return '🏛️';
  if (cat.includes('macera') || cat.includes('adventure')) return '🧗';
  if (cat.includes('kültür') || cat.includes('culture')) return '🎨';
  if (cat.includes('yemek') || cat.includes('food')) return '🍽️';
  if (cat.includes('plaj') || cat.includes('beach')) return '🏖️';
  if (cat.includes('şehir') || cat.includes('city')) return '🌆';
  return '📍';
};

const MapComponent = ({ itinerary, selectedLocation, onLocationSelect }) => {
  const [map, setMap] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const locations = getAllLocations(itinerary);

  // Haritayı rotaya göre ayarla
  useEffect(() => {
    if (!map || !locations.length) return;
    const bounds = new window.google.maps.LatLngBounds();
    locations.forEach(loc => bounds.extend({ lat: loc.lat, lng: loc.lng }));
    map.fitBounds(bounds, { top: 60, bottom: 60, left: 60, right: 60 });
  }, [map, itinerary]);

  // Seçili lokasyona pan et
  useEffect(() => {
    if (map && selectedLocation?.lat && selectedLocation?.lng) {
      map.panTo({ lat: selectedLocation.lat, lng: selectedLocation.lng });
      map.setZoom(15);
    }
  }, [selectedLocation, map]);

  const handleMarkerClick = useCallback((loc) => {
    setInfoWindow(loc);
    onLocationSelect?.(loc);
  }, [onLocationSelect]);

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  // Polyline için koordinatlar
  const polylinePath = locations.map(l => ({ lat: l.lat, lng: l.lng }));

  if (loadError) {
    return (
      <div className={styles.errorState}>
        <div className={styles.errorEmoji}>🗺️</div>
        <p>Harita yüklenemedi.</p>
        <p className={styles.errorSub}>Google Maps API anahtarı gerekli.</p>
      </div>
    );
  }

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className={styles.noApiKey}>
        <div className={styles.noApiEmoji}>🗺️</div>
        <h3 className={styles.noApiTitle}>Harita İçin API Anahtarı Gerekli</h3>
        <p className={styles.noApiText}>
          Google Maps'i etkinleştirmek için <code>.env</code> dosyasına
          <code> VITE_GOOGLE_MAPS_API_KEY</code> ekleyin.
        </p>
        {locations.length > 0 && (
          <div className={styles.locationList}>
            <p className={styles.locationListTitle}>📍 Rota Noktaları:</p>
            {locations.map((loc, i) => (
              <div key={i} className={styles.locationItem}>
                <span className={styles.locationEmoji}>{getCategoryEmoji(loc.category)}</span>
                <span>{loc.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.mapLoadingPins}>
          {['🗺️', '📍', '✈️'].map((em, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
              style={{ fontSize: '2rem' }}
            >
              {em}
            </motion.span>
          ))}
        </div>
        <p className={styles.loadingText}>Harita yükleniyor...</p>
      </div>
    );
  }

  const defaultCenter = locations.length > 0
    ? { lat: locations[0].lat, lng: locations[0].lng }
    : { lat: 39.9334, lng: 32.8597 }; // Türkiye merkezi

  return (
    <div className={styles.mapWrapper}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={12}
        onLoad={onLoad}
        options={{
          styles: MAP_STYLES,
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          clickableIcons: false,
        }}
        onClick={() => setInfoWindow(null)}
      >
        {/* Rota çizgisi */}
        {polylinePath.length > 1 && (
          <Polyline
            path={polylinePath}
            options={{
              strokeColor: '#ff6b6b',
              strokeOpacity: 0.7,
              strokeWeight: 3,
              icons: [{
                icon: {
                  path: window.google?.maps?.SymbolPath?.CIRCLE || 0,
                  scale: 4,
                  strokeColor: '#ff6b6b',
                  fillColor: '#ff6b6b',
                  fillOpacity: 1,
                },
                offset: '0',
                repeat: '40px',
              }],
            }}
          />
        )}

        {/* Sticker Markerlar */}
        {locations.map((loc) => (
          <StickerMarker
            key={loc.id}
            location={loc}
            isSelected={infoWindow?.id === loc.id}
            onClick={() => handleMarkerClick(loc)}
            dayIndex={loc.dayIndex}
          />
        ))}

        {/* Info Window */}
        <AnimatePresence>
          {infoWindow && (
            <InfoWindow
              position={{ lat: infoWindow.lat, lng: infoWindow.lng }}
              onCloseClick={() => setInfoWindow(null)}
              options={{ pixelOffset: new window.google.maps.Size(0, -50) }}
            >
              <div className={styles.infoWindowContent}>
                <div className={styles.infoEmoji}>{getCategoryEmoji(infoWindow.category)}</div>
                <h4 className={styles.infoName}>{infoWindow.name}</h4>
                {infoWindow.description && (
                  <p className={styles.infoDesc}>{infoWindow.description}</p>
                )}
                {infoWindow.quote && (
                  <blockquote className={styles.infoQuote}>
                    "{infoWindow.quote}"
                  </blockquote>
                )}
                {infoWindow.duration && (
                  <span className={styles.infoDuration}>⏱️ {infoWindow.duration}</span>
                )}
              </div>
            </InfoWindow>
          )}
        </AnimatePresence>
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
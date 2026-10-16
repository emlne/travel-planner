// src/utils/stickerUtils.js

// Gün etiketlerini sticker formatında döndürür
export const getDayLabel = (dayNumber) => {
  return `${dayNumber}. Gün Macerası 📍`;
};

// Kategoriye göre renk ver
export const getCategoryColor = (category) => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('doğa') || cat.includes('nature') || cat.includes('park')) return '#a8e063';
  if (cat.includes('tarih') || cat.includes('history') || cat.includes('müze')) return '#c9a96e';
  if (cat.includes('macera') || cat.includes('adventure') || cat.includes('spor')) return '#ff8c42';
  if (cat.includes('kültür') || cat.includes('culture') || cat.includes('sanat')) return '#9b59b6';
  if (cat.includes('plaj') || cat.includes('beach') || cat.includes('deniz')) return '#4ecdc4';
  if (cat.includes('şehir') || cat.includes('city')) return '#74b9ff';
  return '#ff6b6b';
};

// Rastgele hafif rotation (sticker efekti)
export const getStickerRotation = (index) => {
  const rotations = [-3, 2, -1.5, 3.5, -2.5, 1, -3.5, 2.5, -1, 3, -2, 1.5];
  return rotations[index % rotations.length];
};

// İlgi alanı etiket ve emoji eşleştirme
export const INTEREST_OPTIONS = [
  { value: 'nature', label: 'Doğa', emoji: '🌿' },
  { value: 'history', label: 'Tarih', emoji: '🏛️' },
  { value: 'adventure', label: 'Macera', emoji: '🧗' },
  { value: 'culture', label: 'Kültür', emoji: '🎨' },
  { value: 'beach', label: 'Plaj', emoji: '🏖️' },
  { value: 'city', label: 'Şehir', emoji: '🌆' },
  { value: 'photography', label: 'Fotoğraf', emoji: '📸' },
  { value: 'relaxation', label: 'Dinlenme', emoji: '🧘' },
];

export const TRANSPORT_OPTIONS = [
  { value: 'araba', label: 'Araba', emoji: '🚗' },
  { value: 'yürüyüş', label: 'Yürüyüş', emoji: '🚶' },
  { value: 'otobüs', label: 'Otobüs', emoji: '🚌' },
];

// Rastgele sticker slogans
export const LOADING_MESSAGES = [
  'Gemini haritaları inceliyor... 🗺️',
  'En iyi rotalar derleniyor... ✨',
  'Gizli mekanlar keşfediliyor... 🔍',
  'Sticker\'lar hazırlanıyor... 🌟',
  'Rüya rotanız yolda... 🚀',
  'Yerel sırlar araştırılıyor... 🤫',
];
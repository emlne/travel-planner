// src/assets/icons/StickerIcons.jsx
// Kategori bazlı vektörel sticker ikonlar

export const NatureIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Çam Ağacı */}
    <circle cx="24" cy="24" r="22" fill="#a8e063" stroke="#6abf2b" strokeWidth="2"/>
    <polygon points="24,8 34,28 14,28" fill="#2d7a2d" stroke="#1a5c1a" strokeWidth="1.5" strokeLinejoin="round"/>
    <polygon points="24,16 36,34 12,34" fill="#3a9c3a" stroke="#1a5c1a" strokeWidth="1.5" strokeLinejoin="round"/>
    <rect x="21" y="34" width="6" height="7" rx="2" fill="#8B5E3C" stroke="#5c3a1e" strokeWidth="1.5"/>
    <circle cx="18" cy="20" r="2" fill="#ffd93d" opacity="0.8"/>
    <circle cx="30" cy="26" r="1.5" fill="#ff8c42" opacity="0.8"/>
  </svg>
);

export const HistoryIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Kale / Piramit */}
    <circle cx="24" cy="24" r="22" fill="#c9a96e" stroke="#a0784a" strokeWidth="2"/>
    <polygon points="24,9 37,36 11,36" fill="#d4a55a" stroke="#7a5520" strokeWidth="1.5" strokeLinejoin="round"/>
    <polygon points="24,14 32,30 16,30" fill="#e8c080" stroke="#7a5520" strokeWidth="1" strokeLinejoin="round"/>
    <line x1="24" y1="9" x2="24" y2="36" stroke="#7a5520" strokeWidth="1" opacity="0.5"/>
    <line x1="11" y1="36" x2="37" y2="36" stroke="#7a5520" strokeWidth="1.5" opacity="0.8"/>
    <rect x="18" y="30" width="4" height="6" rx="1" fill="#7a5520" opacity="0.7"/>
    <circle cx="24" cy="12" r="1.5" fill="#ffd93d" opacity="0.9"/>
  </svg>
);

export const AdventureIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Dağcı / Dağ */}
    <circle cx="24" cy="24" r="22" fill="#ff8c42" stroke="#e06a1a" strokeWidth="2"/>
    <polygon points="14,36 24,12 34,36" fill="#ff6b3d" stroke="#c04010" strokeWidth="1.5" strokeLinejoin="round"/>
    <polygon points="8,36 17,20 26,36" fill="#ff8c5a" stroke="#c04010" strokeWidth="1.5" strokeLinejoin="round"/>
    <polygon points="24,12 28,18 20,18" fill="white" opacity="0.7"/>
    <line x1="8" y1="36" x2="40" y2="36" stroke="#c04010" strokeWidth="1.5"/>
    <circle cx="30" cy="16" r="3" fill="#ffd93d" stroke="#e0a500" strokeWidth="1.5"/>
  </svg>
);

export const CultureIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Müze / Kültür */}
    <circle cx="24" cy="24" r="22" fill="#9b59b6" stroke="#7d3c98" strokeWidth="2"/>
    <rect x="10" y="36" width="28" height="3" rx="1" fill="#5a1e7a"/>
    <rect x="12" y="20" width="24" height="16" rx="2" fill="#c39bd3" stroke="#7d3c98" strokeWidth="1.5"/>
    <rect x="15" y="24" width="5" height="12" rx="1" fill="#7d3c98"/>
    <rect x="22" y="24" width="5" height="12" rx="1" fill="#7d3c98"/>
    <rect x="29" y="24" width="5" height="12" rx="1" fill="#7d3c98"/>
    <polygon points="24,10 36,20 12,20" fill="#a569bd" stroke="#7d3c98" strokeWidth="1.5"/>
    <circle cx="24" cy="13" r="2" fill="#ffd93d"/>
  </svg>
);

export const FoodIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Yemek */}
    <circle cx="24" cy="24" r="22" fill="#e74c3c" stroke="#c0392b" strokeWidth="2"/>
    <circle cx="24" cy="26" r="12" fill="#f1948a" stroke="#c0392b" strokeWidth="1.5"/>
    <path d="M16 22 Q20 14 24 22 Q28 14 32 22" stroke="#c0392b" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <circle cx="20" cy="26" r="3" fill="#e74c3c"/>
    <circle cx="28" cy="26" r="3" fill="#e74c3c"/>
    <circle cx="24" cy="30" r="3" fill="#e74c3c"/>
  </svg>
);

export const BeachIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Plaj */}
    <circle cx="24" cy="24" r="22" fill="#4ecdc4" stroke="#38b2aa" strokeWidth="2"/>
    <ellipse cx="24" cy="34" rx="18" ry="5" fill="#f4d06f"/>
    <circle cx="28" cy="20" r="10" fill="#ffd93d" stroke="#e0a500" strokeWidth="1.5"/>
    <path d="M8 30 Q14 24 20 30 Q26 24 32 30 Q38 24 44 30" stroke="#38b2aa" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7"/>
    <line x1="18" y1="34" x2="18" y2="18" stroke="#8B5E3C" strokeWidth="1.5"/>
    <path d="M18 18 Q26 14 30 20" fill="#ff6b6b" stroke="#cc3333" strokeWidth="1"/>
  </svg>
);

export const CityIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Şehir */}
    <circle cx="24" cy="24" r="22" fill="#74b9ff" stroke="#0984e3" strokeWidth="2"/>
    <rect x="10" y="26" width="8" height="14" rx="1" fill="#0984e3"/>
    <rect x="20" y="18" width="10" height="22" rx="1" fill="#2980b9"/>
    <rect x="32" y="22" width="8" height="18" rx="1" fill="#0984e3"/>
    <rect x="22" y="14" width="2" height="4" rx="1" fill="#e74c3c"/>
    <rect x="12" y="28" width="2" height="2" fill="#ffd93d" opacity="0.9"/>
    <rect x="15" y="28" width="2" height="2" fill="#ffd93d" opacity="0.9"/>
    <rect x="22" y="22" width="2" height="2" fill="#ffd93d" opacity="0.9"/>
    <rect x="26" y="22" width="2" height="2" fill="#ffd93d" opacity="0.9"/>
    <rect x="34" y="24" width="2" height="2" fill="#ffd93d" opacity="0.9"/>
  </svg>
);

export const DefaultPinIcon = ({ size = 48, color = '#ff6b6b' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="22" r="14" fill={color} stroke="white" strokeWidth="3"/>
    <circle cx="24" cy="22" r="6" fill="white"/>
    <path d="M24 36 L24 48" stroke={color} strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

export const PlaneIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="15" fill="#ff6b6b" stroke="white" strokeWidth="2"/>
    <path d="M22 10 L10 22 M10 10 L22 22 M8 16 L24 16 M16 8 L16 24" stroke="white" strokeWidth="1.5" opacity="0.3"/>
    <path d="M7 16 L13 11 L17 13 L25 8 L25 11 L17 16 L25 21 L25 24 L17 19 L13 21 Z" fill="white"/>
  </svg>
);

export const CarIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="15" fill="#4ecdc4" stroke="white" strokeWidth="2"/>
    <path d="M8 18 L10 13 Q11 11 13 11 L19 11 Q21 11 22 13 L24 18 L24 22 Q24 23 23 23 L9 23 Q8 23 8 22 Z" fill="white" stroke="#38b2aa" strokeWidth="1"/>
    <circle cx="12" cy="22" r="2" fill="#38b2aa"/>
    <circle cx="20" cy="22" r="2" fill="#38b2aa"/>
    <path d="M13 11 L14 15 L18 15 L19 11" stroke="#38b2aa" strokeWidth="1" fill="none"/>
  </svg>
);

export const TrainIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="15" fill="#a8e063" stroke="white" strokeWidth="2"/>
    <rect x="10" y="10" width="12" height="14" rx="3" fill="white" stroke="#6abf2b" strokeWidth="1.5"/>
    <rect x="12" y="12" width="4" height="4" rx="1" fill="#6abf2b"/>
    <rect x="17" y="12" width="4" height="4" rx="1" fill="#6abf2b"/>
    <line x1="12" y1="20" x2="20" y2="20" stroke="#6abf2b" strokeWidth="1"/>
    <circle cx="12" cy="24" r="1.5" fill="#6abf2b"/>
    <circle cx="20" cy="24" r="1.5" fill="#6abf2b"/>
    <line x1="8" y1="26" x2="24" y2="26" stroke="#6abf2b" strokeWidth="1.5"/>
  </svg>
);

export const WalkIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="15" fill="#ffd93d" stroke="white" strokeWidth="2"/>
    <circle cx="16" cy="9" r="3" fill="#8B5E3C"/>
    <path d="M16 12 L16 20 M16 20 L12 26 M16 20 L20 26 M13 16 L19 16" stroke="#8B5E3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Kategori → İkon eşleştirme
export const getCategoryIcon = (category, size = 48) => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('doğa') || cat.includes('nature') || cat.includes('park') || cat.includes('orman')) {
    return <NatureIcon size={size} />;
  }
  if (cat.includes('tarih') || cat.includes('history') || cat.includes('müze') || cat.includes('antik')) {
    return <HistoryIcon size={size} />;
  }
  if (cat.includes('macera') || cat.includes('adventure') || cat.includes('spor') || cat.includes('dağ')) {
    return <AdventureIcon size={size} />;
  }
  if (cat.includes('kültür') || cat.includes('culture') || cat.includes('sanat') || cat.includes('art')) {
    return <CultureIcon size={size} />;
  }
  if (cat.includes('yemek') || cat.includes('food') || cat.includes('mutfak') || cat.includes('restoran')) {
    return <FoodIcon size={size} />;
  }
  if (cat.includes('plaj') || cat.includes('beach') || cat.includes('deniz') || cat.includes('sea')) {
    return <BeachIcon size={size} />;
  }
  if (cat.includes('şehir') || cat.includes('city') || cat.includes('kent')) {
    return <CityIcon size={size} />;
  }
  return <DefaultPinIcon size={size} />;
};

export const getTransportIcon = (transport, size = 32) => {
  const t = (transport || '').toLowerCase();
  if (t.includes('uçak') || t.includes('plane') || t.includes('fly')) return <PlaneIcon size={size} />;
  if (t.includes('araba') || t.includes('car') || t.includes('araç')) return <CarIcon size={size} />;
  if (t.includes('tren') || t.includes('train') || t.includes('rail')) return <TrainIcon size={size} />;
  return <WalkIcon size={size} />;
};
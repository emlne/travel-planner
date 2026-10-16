# 🌍 Smart Travel Planner (Akıllı Rota Planlama Asistanı)

Smart Travel Planner, kullanıcıların tatil süreleri, ulaşım tercihleri ve kişisel ilgi alanlarına göre tamamen kişiselleştirilmiş, gün gün planlanmış seyahat rotaları oluşturan **Yapay Zeka destekli** bir full-stack web uygulamasıdır.

Sistem, lokasyon verilerini gerçek dünya koordinatlarına dönüştürmek için **Google Maps Geocoding API**'yi kullanırken, en mantıklı ve optimize seyahat rotasını çizmek için Google'ın gelişmiş yapay zeka motorunu kullanır.

---

## 🌐 Canlı Sistem Bağlantıları
Projenin hem arayüzü hem de arka uç servisleri canlı olarak yayınlanmaktadır:

- 🎨 **Canlı Arayüz (Frontend - Vercel):** [https://travel-planner-three-theta.vercel.app](https://travel-planner-three-theta.vercel.app)
- ⚙️ **Canlı Sunucu (Backend API - Render):** [https://travel-planner-0sg1.onrender.com](https://travel-planner-0sg1.onrender.com)

---

## 🚀 Öne Çıkan Özellikler

- 🤖 **AI Destekli Akıllı Rota Yapılanması:** Yapay zeka modeliyle dinamik, saf JSON formatında seyahat rotaları üretir.
- 🗺️ **Otomatik Coğrafi Konumlandırma:** Girilen adresleri Google Maps altyapısıyla otomatik olarak enlem ve boylam koordinatlarına dönüştürür.
- 👑 **Rol Bazlı Erişim Kontrolü (RBAC):** Yönetici ve kullanıcı yetkilendirmeleriyle güvenli bir altyapı sunar.
- 🔗 **Freemium ve Paylaşım Kurgusu:** Ziyaretçiler yapay zekaya ücretsiz rota ürettirebilir, rotalarını kaydedebilir ve paylaşabilir.

---

## 🛠️ Teknoloji Yığını (Tech Stack)

- **Frontend:** React (Vite), React Router DOM, CSS Modules
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)
- **AI Engine:** Google Generative AI
- **Maps Service:** Google Maps Platform (Geocoding Services)
- **Authentication:** JWT (JSON Web Token) & Bcrypt.js

---

## 📁 Git Dallanma (Branch) Mimarisi

Projenin sürdürülebilirliği ve kod düzeni adına bileşenler farklı dallarda (branch) yönetilmektedir:

- 📌 **`main`**: Projenin genel vizyonunu, mimari özetini ve canlı bağlantılarını barındırır.
- ⚙️ **`backend`**: Node.js, Express, AI ve veritabanı bağlantılarının yer aldığı arka yüz kaynak kodlarını barındırır.
- 🎨 **`frontend`**: React tabanlı arayüz kaynak kodlarını barındırır.

---

*Developed with ❤️ as a cutting-edge AI integration project.*

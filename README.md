# ⚙️ Smart Travel Planner - Backend API

Smart Travel Planner projesinin arka yüz (backend) servisidir. Node.js ve Express.js altyapısıyla geliştirilen bu sistem; kullanıcı kimlik doğrulasyonunu yönetir, Google Maps Geocoding API ile mekanları coğrafi koordinatlara dönüştürür ve Google Gemini 3 yapay zeka motorunu kullanarak kişiselleştirilmiş seyahat rotaları üretir.

---

## 🌐 Canlı Sunucu (Live API)
Projenin backend servisi Render üzerinde canlı olarak yayınlanmaktadır. API testlerinizi doğrudan aşağıdaki kök (base) URL üzerinden gerçekleştirebilirsiniz:

👉 **[https://travel-planner-0sg1.onrender.com](https://travel-planner-0sg1.onrender.com)**

---

## 🚀 Öne Çıkan Backend Özellikleri

- 🤖 **AI Entegrasyonu:** En yeni `gemini-3-flash-preview` modelini kullanarak dinamik, saf JSON formatında seyahat rotaları üretir.
- 🗺️ **Coğrafi Konumlandırma:** Girilen adresleri Google Maps altyapısıyla otomatik olarak enlem (`lat`) ve boylam (`lng`) koordinatlarına çevirir.
- 👑 **Rol Bazlı Erişim Kontrolü (RBAC):** Admin ve User yetkilendirmeleriyle mekan ekleme/düzenleme işlemlerini koruma altına alır.
- 🔐 **Güvenli Kimlik Doğrulama:** JWT (JSON Web Token) ve Bcrypt.js tabanlı güvenli oturum yönetimi sunar.

---

## 🛠️ Teknoloji Yığını (Tech Stack)

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)
- **AI SDK:** Google Generative AI (Gemini 3)
- **Maps API:** Google Maps Platform (Geocoding Services)
- **Security:** JWT & Bcrypt.js

---

## 🔌 API Uç Noktaları (Endpoints)

### 🔑 Kimlik Doğrulama (Auth)
| Metot | Uç Nokta | Açıklama | Erişim Yetkisi |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Yeni kullanıcı hesabı oluşturur. | Herkese Açık |
| `POST` | `/api/auth/login` | Giriş yapar ve JWT Token döner. | Herkese Açık |
| `GET`  | `/api/auth/me`        | Anlık giriş yapmış kullanıcı bilgilerini getirir. | Sadece Üyeler (Token) |

### 📍 Mekan Yönetimi (Locations)
| Metot | Uç Nokta | Açıklama | Erişim Yetkisi |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/locations` | Sistemdeki tüm kayıtlı mekanları listeler. | Herkese Açık |
| `POST` | `/api/locations/add` | Yeni mekan ekler (Adresi koordinata çevirir). | **Sadece Admin** |
| `PUT` | `/api/locations/:id` | Mevcut bir mekanın bilgilerini günceller. | **Sadece Admin** |
| `DELETE`| `/api/locations/:id` | Mevcut bir mekanı veritabanından siler. | **Sadece Admin** |

### 🧭 Akıllı Rota Motoru (Smart Routes)
| Metot | Uç Nokta | Açıklama | Erişim Yetkisi |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/routes/generate` | Yapay zeka ile rota üretir (Veritabanına KAYDETMEZ). | Herkese Açık |
| `POST` | `/api/routes/save` | Üretilen rotayı "Seyahat Defterine" kaydeder. | Sadece Üyeler (Token) |
| `GET` | `/api/routes/my` | Kullanıcının kendi kaydettiği rotaları listeler. | Sadece Üyeler (Token) |
| `GET` | `/api/routes/:id` | Rotayı ID ile getirir (Link paylaşımı için). | Herkese Açık |
| `DELETE`| `/api/routes/:id` | Kaydedilmiş rotayı siler. | **Sadece Rotanın Sahibi** |

---

## 📑 Postman Koleksiyonu

Sistemi yerelde veya canlı sunucuda (Render) test etmek için hazırlanan güncel API isteklerine (Auth, Admin Kontrolleri, Rota Senaryoları) aşağıdaki bağlantıdan doğrudan ulaşabilirsiniz:

👉 **[Postman Koleksiyonuna Buradan Bakabilirsiniz](./rotabul.postman_collection.json)**

Bu bağlantı üzerinden koleksiyon dosyasını bilgisayarınıza indirip Postman uygulamasına `Import` ederek tüm senaryoları saniyeler içinde simüle edebilirsiniz.

## 💻 Kurulum ve Yerel Çalıştırma

### Gereksinimler
- Node.js (v18+ tavsiye edilir)
- MongoDB Atlas Hesabı
- Google Cloud Console Hesabı (Geocoding API aktif edilmiş)
- Google AI Studio Hesabı (Gemini 3 API Anahtarı)

### Adımlar

1. **Projeyi Klonlayın ve Backend Dalına Geçin:**
   ```bash
   git clone [https://github.com/emlne/travel-planner.git](https://github.com/emlne/travel-planner.git)
   cd travel-planner
   git checkout backend

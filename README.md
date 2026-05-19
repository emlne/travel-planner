# 🌍 Smart Travel Planner (Akıllı Rota Planlama Asistanı)

Smart Travel Planner, kullanıcıların tatil süreleri, araç sahiplik durumları ve kişisel ilgi alanlarına göre tamamen kişiselleştirilmiş, gün gün planlanmış seyahat rotaları oluşturan **Yapay Zeka destekli** bir full-stack web/mobil uygulaması altyapısıdır.

Sistem, lokasyon verilerini gerçek dünya koordinatlarına dönüştürmek için **Google Maps Geocoding API**'yi kullanırken, en mantıklı ve optimize seyahat rotasını çizmek için Google'ın en yeni nesil **Gemini 3 (Flash Preview)** yapay zeka motorunu kullanır. Yeni SaaS mimarisi sayesinde kullanıcılar rotalarını oluşturabilir, defterlerine kaydedebilir ve arkadaşlarıyla paylaşabilir.

---

## 🌐 Canlı Sunucu (Live API)
Projenin backend servisi Render üzerinde canlı olarak yayınlanmaktadır. API testlerinizi doğrudan aşağıdaki kök (base) URL üzerinden gerçekleştirebilirsiniz:

👉 **[https://travel-planner-0sg1.onrender.com](https://travel-planner-0sg1.onrender.com)**

---

## 🚀 Öne Çıkan Özellikler

* 🤖 **AI Destekli Akıllı Rota Yapılanması:** En yeni `gemini-3-flash-preview` modelini kullanarak, gevezelikten uzak, tamamen sisteme entegre edilebilir dinamik saf JSON rotaları üretir.
* 🗺️ **Otomatik Coğrafi Konumlandırma:** Girilen metinsel adresleri, Google Maps altyapısıyla otomatik olarak enlem (`lat`) ve boylam (`lng`) koordinatlarına dönüştürerek veritabanına kaydeder.
* 👑 **Rol Bazlı Erişim Kontrolü (RBAC):** Yönetici (Admin) ve Kullanıcı (User) yetkilendirmeleriyle sistem güvenliğini en üst düzeye çıkarır. Mekan ekleme/düzenleme işlemleri sadece yöneticilere özeldir.
* 🔗 **Freemium ve Paylaşım Kurgusu:** Ziyaretçiler yapay zekaya ücretsiz rota ürettirebilir. Bu rotayı kaydetmek istediklerinde üyelik sistemine dahil olurlar. Oluşturulan rotalar, paylaşıma açık benzersiz linklerle (ID) arkadaşlara gönderilebilir.
* 🔐 **Gelişmiş Güvenlik Duvarı:** JWT (JSON Web Token) tabanlı kimlik doğrulama mimarisi ile kullanıcı verilerini ve hassas API uç noktalarını koruma altında tutar.

---

## 🛠️ Teknoloji Yığını (Tech Stack)

* **Runtime Environment:** Node.js
* **Backend Framework:** Express.js
* **Database:** MongoDB Atlas (Mongoose ODM)
* **AI Engine:** Google Generative AI (Gemini 3 SDK)
* **Maps Service:** Google Maps Platform (Geocoding Services)
* **Authentication:** JWT (JSON Web Token) & Bcrypt.js

---

## 🔌 API Uç Noktaları (Endpoints)

### 🔑 Kimlik Doğrulama (Auth)
| Metot | Uç Nokta | Açıklama | Erişim Yetkisi |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Yeni kullanıcı hesabı oluşturur. | Herkese Açık |
| `POST` | `/api/auth/login` | Giriş yapar ve JWT Token döner. | Herkese Açık |
| `GET`  | `/api/auth/me`       | Anlık giriş yapmış kullanıcı bilgilerini getirir. | Sadece Üyeler (Token) |

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

## 📁 Git Dallanma (Branch) Mimarisi

Projenin sürdürülebilirliği ve karmaşıklığı önlemek adına kaynak kodları ve dökümantasyonlar birbirinden tamamen bağımsız dallarda (branch) yönetilmektedir:

* 📌 **`main`**: Sadece projenin genel gereksinimleri, Postman koleksiyonları ve mimari dökümantasyonunu barındırır. Kaynak kod içermez.
* ⚙️ **`backend`**: Node.js, Express, Gemini 3 ve MongoDB Atlas bağlantılarının yer aldığı tüm arka yüz kaynak kodlarını barındırır.
* 🎨 **`frontend`**: Kullanıcıların etkileşime geçeceği React tabanlı arayüz kaynak kodlarını barındırır.

---

## 💻 Kurulum ve Yerel Çalıştırma

### Gereksinimler
* Node.js (v18+ tavsiye edilir)
* MongoDB Atlas Hesabı
* Google Cloud Console Hesabı (Geocoding API aktif edilmiş)
* Google AI Studio Hesabı (Gemini 3 API Anahtarı)

### Adımlar

1.  **Projeyi Klonlayın ve Backend Dalına Geçin:**
    ```bash
    git clone https://github.com/emlne/travel-planner.git
    cd travel-planner
    git checkout backend
    ```

2.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    ```

3.  **Çevre Değişkenlerini Ayarlayın:**
    Ana dizinde bir `.env` dosyası oluşturun ve aşağıdaki değişkenleri kendi anahtarlarınızla doldurun:
    ```env
    PORT=3000
    MONGO_URI=your_mongodb_atlas_connection_string
    JWT_SECRET=your_super_secret_key
    JWT_EXPIRES_IN=90d
    GOOGLE_MAPS_API_KEY=your_google_maps_geocoding_api_key
    GEMINI_API_KEY=your_gemini_3_api_key
    ```

4.  **Uygulamayı Başlatın:**
    * Geliştirici (Development) Modu:
        ```bash
        npm run dev
        ```
    * Üretim (Production) Modu:
        ```bash
        npm start
        ```

---

## 📑 Postman Koleksiyonu

Sistemi yerelde veya canlı sunucuda (Render) test etmek için hazırlanan güncel API isteklerine (Auth, Admin Kontrolleri, Rota Senaryoları) aşağıdaki bağlantıdan doğrudan ulaşabilirsiniz:

👉 **[Postman Koleksiyonuna Buradan Bakabilirsiniz](./rotabul.postman_collection.json)**

Bu bağlantı üzerinden koleksiyon dosyasını bilgisayarınıza indirip Postman uygulamasına `Import` ederek tüm senaryoları saniyeler içinde simüle edebilirsiniz.

---
*Developed with ❤️ as a cutting-edge AI integration project.*

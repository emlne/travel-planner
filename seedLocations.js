// backend/seedLocations.js
require('dotenv').config(); 
const mongoose = require('mongoose');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Location = require('./src/models/Location'); // Kendi dosya yoluna göre düzenle

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/fethiye_planner';
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateLocations = async () => {
    try {
        console.log('🔄 Veritabanına bağlanılıyor...');
        await mongoose.connect(MONGO_URI);
        console.log('✅ Veritabanı bağlantısı başarılı!');

        console.log('🧠 Gemini yapay zekasından Fethiye mekanları isteniyor (Bu işlem 10-15 saniye sürebilir)...');
        
        // JSON çıktılarında daha tutarlı olan gemini-1.5-flash modelini kullanıyoruz
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

        const prompt = `
            Sen Fethiye bölgesini çok iyi bilen profesyonel bir tur rehberisin.
            Bana Fethiye ve çevresindeki en popüler, gizli kalmış ve güzel 30 turistik mekanı listeleyen bir JSON dizisi oluştur.
            
            KURALLAR:
            1. Sadece geçerli bir JSON dizisi (Array) döndür. Başına veya sonuna hiçbir açıklama, markdown ekleme.
            2. Her bir mekan objesi AŞAĞIDAKİ VERİ ŞEMASINA KESİNLİKLE UYMAK ZORUNDADIR:
               - "name": Mekanın adı (String)
               - "categories": SADECE ŞU KELİMELERDEN OLUŞAN BİR DİZİ OLABİLİR: ["doğa", "tarih", "deniz", "adrenalin", "eğlence"]. Başka hiçbir kategori ismi kullanma. Mekan birden fazla kategoriye girebilir.
               - "averageSpendingTime": Burada ortalama geçirilecek süre (SADECE DAKİKA CİNSİNDEN NUMBER OLACAK, Örn: 120, 240)
               - "carRequired": Buraya ulaşmak için özel araç şart mı? (SADECE BOOLEAN: true veya false)
               - "coordinates": { "lat": Number (Enlem), "lng": Number (Boylam) }
               - "googleMapsUrl": Mekanın Google Haritalar linki (String)
               - "regionalAdvice": Mekan hakkında kısa bir ipucu veya tavsiye (String)
            
            Örnek Çıktı:
            [
              {
                "name": "Ölüdeniz Belcekız Plajı",
                "categories": ["deniz", "doğa"],
                "averageSpendingTime": 240,
                "carRequired": false,
                "coordinates": {
                  "lat": 36.5458,
                  "lng": 29.1177
                },
                "googleMapsUrl": "https://goo.gl/maps/orneklink1",
                "regionalAdvice": "Sabah erken saatlerde gitmek, kalabalıktan kaçınmak ve sakin bir deniz bulmak için idealdir."
              },
              {
                "name": "Saklıkent Kanyonu",
                "categories": ["doğa", "adrenalin"],
                "averageSpendingTime": 180,
                "carRequired": true,
                "coordinates": {
                  "lat": 36.4735,
                  "lng": 29.4034
                },
                "googleMapsUrl": "https://goo.gl/maps/orneklink2",
                "regionalAdvice": "Kanyonun suyu yazın bile buz gibidir, kaymayan bir deniz ayakkabısı getirmeyi unutmayın."
              }
            ]
        `;

        const result = await model.generateContent(prompt);
        let responseText = result.response.text();
        
        // Markdown işaretlerini temizle
        responseText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();

        const locationsData = JSON.parse(responseText);
        console.log(`✨ Gemini ${locationsData.length} adet mekan üretti! Veritabanına kaydediliyor...`);

        // İSTEĞE BAĞLI: Her çalıştırdığında eski mekanları silip sıfırdan eklemek istersen alttaki 2 satırı açabilirsin
        // await Location.deleteMany({}); 
        // console.log('🗑️ Eski mekanlar temizlendi.');

        await Location.insertMany(locationsData);
        
        console.log('🎉 Bütün mekanlar veritabanına başarıyla eklendi! Artık rotalar daha akıllı çizilecek.');
        process.exit(0);

    } catch (error) {
        console.error('❌ Bir hata oluştu:', error);
        process.exit(1);
    }
};

generateLocations();
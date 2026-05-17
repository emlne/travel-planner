const { GoogleGenerativeAI } = require('@google/generative-ai');

// Gemini API'yi .env dosyamızdaki anahtarla başlatıyoruz
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateSmartRoute = async (locations, preferences) => {
    try {
        // Kullanacağımız modeli seçiyoruz (gemini-1.5-flash modeli JSON üretimi ve hız konusunda mükemmeldir)
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

        // 1. Adım: Yapay Zekaya vereceğimiz o sihirli komutu (Prompt Engineering) hazırlıyoruz
        const prompt = `
            Sen Türkiye'de uzmanlaşmış profesyonel bir tatil ve rota planlama asistanısın.
            Aşağıdaki "Mevcut Mekanlar" listesini kullanarak, kullanıcının "Tercihlerine" uygun bir tatil rotası oluştur.

            TERCİHLER:
            - Tatil Süresi: ${preferences.days} gün
            - Araba Var Mı?: ${preferences.hasCar ? 'Evet' : 'Hayır'}
            - İstenen Kategoriler: ${preferences.categories ? preferences.categories.join(', ') : 'Farketmez'}

            MEVCUT MEKANLAR:
            ${JSON.stringify(locations)}

            KURALLAR:
            1. Sadece "Mevcut Mekanlar" listesindeki verileri kullan. Listede olmayan hiçbir yeri uydurma.
            2. Rota mantıklı olmalı (Örn: Arabası yoksa birbirine uzak yerleri aynı güne koyma).
            3. CEVABINI SADECE AŞAĞIDAKİ GİBİ BİR JSON FORMATINDA VER. Başka hiçbir açıklama, selamlama veya markdown karakteri kullanma.

            Örnek Çıktı Formatı:
            {
                "routeTitle": "Fethiye Tarih ve Doğa Turu",
                "totalDays": 3,
                "dailyPlans": [
                    {
                        "day": 1,
                        "title": "Tarihe Yolculuk",
                        "placesToVisit": ["Mekan Adı 1", "Mekan Adı 2"],
                        "description": "Bugün çevredeki tarihi yerleri gezeceğiz."
                    }
                ]
            }
        `;

        console.log("Yapay zeka rotayı hesaplıyor, lütfen bekleyin...");

        // 2. Adım: İsteği Google sunucularına fırlatıyoruz
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // 3. Adım: Gelen metni JSON'a çeviriyoruz. 
        // Bazen yapay zeka cevap verirken başına ve sonuna markdown (```json ) ekleyebilir, 
        // kodumuzun çökmemesi için önce bu işaretleri temizliyoruz.
        const cleanedText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
        
        const routeJSON = JSON.parse(cleanedText);

        return routeJSON;

    } catch (error) {
        console.error('Yapay Zeka Hatası:', error);
        throw new Error('Yapay zeka rota oluştururken bir hata yaşadı: ' + error.message);
    }
};
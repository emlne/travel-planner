const Location = require('../models/Location');
const aiService = require('../services/aiService');
const Route = require('../models/Route');

// 1. ROTAYI SADECE ÜRET (VERİTABANINA KAYDETMEZ) - POST /api/routes/generate
exports.createSmartRoute = async (req, res) => {
    try {
        const { days, hasCar, categories } = req.body;

        const locations = await Location.find();

        if (locations.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Sistemde henüz kayıtlı mekan yok. Lütfen önce mekan ekleyin.'
            });
        }

        // Yapay Zekadan rotayı al
        const smartRoute = await aiService.generateSmartRoute(locations, { days, hasCar, categories });


        // Veriyi kaydetmeden, sadece ön yüzde (frontend) gösterilmesi için doğrudan JSON olarak fırlatıyoruz.
        res.status(200).json({
            success: true,
            data: {
                routeTitle: smartRoute.routeTitle,
                totalDays: smartRoute.totalDays,
                dailyPlans: smartRoute.dailyPlans,
                preferences: { hasCar, categories }
            }
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Akıllı rota oluşturulurken bir hata yaşandı.',
            error: err.message
        });
    }
};

// 2. ÖN YÜZDE BEĞENİLEN ROTAYI KAYDET - POST /api/routes/save
exports.saveRoute = async (req, res) => {
    try {
        // Ön yüzdeki (frontend) "Kaydet" butonundan gelen rota verilerini alıyoruz
        const { routeTitle, totalDays, dailyPlans, preferences } = req.body;

        // Veritabanına yeni rota belgesi oluşturuyoruz (Artık SAHİPLİ)
        const savedRoute = await Route.create({
            user: req.user.id, // 🔑 Şemamıza eklediğimiz user alanı. Bu ID bize authMiddleware'den (JWT) gelecek!
            routeTitle,
            totalDays,
            dailyPlans,
            preferences
        });

        res.status(201).json({
            success: true,
            message: 'Rota seyahat defterine başarıyla kaydedildi! 🎨',
            data: savedRoute
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Rota kaydedilirken bir hata oluştu.',
            error: err.message
        });
    }
};

// 3. KULLANICININ KENDİ ROTALARINI GETİR - GET /api/routes/my
exports.getMyRoutes = async (req, res) => {
    try {
        // En yeni rotalar en üstte gelecek şekilde sıralıyoruz
        const routes = await Route.find({ user: req.user.id }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: routes.length,
            data: routes
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Rotalarınız getirilirken bir hata oluştu.',
            error: err.message
        });
    }
};

// KAYDEDİLMİŞ BİR ROTAYI İD İLE GETİR (GET /api/routes/:id)
exports.getRoute = async (req, res) => {
    try {
        const route = await Route.findById(req.params.id);

        if (!route) {
            return res.status(404).json({
                success: false,
                message: 'Bu ID ile eşleşen bir rota bulunamadı.'
            });
        }

        res.status(200).json({
            success: true,
            data: route
        });
        
    } catch (err) {
        res.status(400).json({ success: false, message: 'Geçersiz ID formatı veya sunucu hatası.' });
    }
};

// 5. KENDİ ROTASINI SİL - DELETE /api/routes/:id
exports.deleteRoute = async (req, res) => {
    try {
        const route = await Route.findById(req.params.id);

        if (!route) {
            return res.status(404).json({
                success: false,
                message: 'Silinmek istenen rota bulunamadı.'
            });
        }

        // 🛡️ GÜVENLİK: Sadece rotanın sahibi silebilir
        if (route.user.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'Bu rotayı silmek için yetkiniz yok!'
            });
        }

        await route.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Rota seyahat defterinden başarıyla silindi. 🗑️'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Rota silinirken bir hata oluştu.',
            error: err.message
        });
    }
};
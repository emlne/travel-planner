const Location = require('../models/Location');
const aiService = require('../services/aiService');
const Route = require('../models/Route');

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

        // YENİ: Gelen JSON'ı Veritabanına Kaydet
        const savedRoute = await Route.create({
            routeTitle: smartRoute.routeTitle,
            totalDays: smartRoute.totalDays,
            dailyPlans: smartRoute.dailyPlans,
            preferences: {
                hasCar: hasCar,
                categories: categories
            }
        });

        // Artık frontend'e veritabanına kaydedilmiş, kendine ait bir _id'si olan rotayı gönderiyoruz
        res.status(201).json({
            success: true,
            data: savedRoute
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Akıllı rota oluşturulurken bir hata yaşandı.',
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
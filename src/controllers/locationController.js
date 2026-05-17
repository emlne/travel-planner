// Önce az önce yazdığımız şemayı (Model) buraya çağırıyoruz
const Location = require('../models/Location');
const googleService = require('../services/googleMapsService');

// Yeni mekan oluşturma fonksiyonu (POST /api/locations)
exports.createLocation = async (req, res) => {
    try {
        if (req.body.address) {
            const coords = await googleService.getCoordinatesFromAddress(req.body.address);
            
            // Çekilen koordinatları MongoDB'ye kaydedilecek olan verinin içine yerleştir
            req.body.coordinates = coords;
        }
        // Ön yüzden (React veya Postman'den) gelen veriyi (req.body) alıp yeni bir model oluşturuyoruz
        const newLocation = new Location(req.body);

        // Bu veriyi MongoDB'ye kaydetmesini söylüyoruz (await ile işlemin bitmesini bekleriz)
        const savedLocation = await newLocation.save();

        // İşlem başarılıysa kullanıcıya (frontend'e) 201 (Oluşturuldu) koduyla veriyi geri gönderiyoruz
        res.status(201).json({
            success: true,
            message: 'Mekan başarıyla eklendi!',
            data: savedLocation
        });
        
    } catch (error) {
        // Eğer isim girilmezse veya yanlış kategori seçilirse Mongoose hata fırlatır, burada yakalarız
        res.status(400).json({
            success: false,
            message: 'Mekan eklenirken bir hata oluştu.',
            error: error.message
        });
    }
};

// Tüm mekanları getirme fonksiyonu (GET /api/locations )
exports.getAllLocations = async (req, res) => {
    try {
        // Location.find() veritabanındaki tüm mekanları bir dizi (array) olarak getirir
        const locations = await Location.find(); 
        
        res.status(200).json({
            success: true,
            count: locations.length, // Kaç mekan geldiğini görmek ön yüzde işe yarar
            data: locations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Mekanlar getirilirken bir hata oluştu.',
            error: error.message
        });
    }
};

// Belirli bir mekanı güncelleme (PUT)
exports.updateLocation = async (req, res) => {
    try {

        const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!location) {
            return res.status(404).json({ success: false, message: 'Bu ID ile eşleşen mekan bulunamadı.' });
        }

        res.status(200).json({
            success: true,
            message: 'Mekan başarıyla güncellendi.',
            data: location
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Belirli bir mekanı silme (DELETE)
exports.deleteLocation = async (req, res) => {
    try {
        const location = await Location.findByIdAndDelete(req.params.id);

        if (!location) {
            return res.status(404).json({ success: false, message: 'Silinecek mekan bulunamadı.' });
        }

        res.status(200).json({
            success: true,
            message: 'Mekan başarıyla silindi.'
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
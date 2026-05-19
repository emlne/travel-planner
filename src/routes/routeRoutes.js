const express = require('express');
const router = express.Router();

// Az önce yazdığımız controller'ı içeri alıyoruz
const { createSmartRoute, saveRoute, getRoute, deleteRoute, getMyRoutes } = require('../controllers/routeController');
const { protect } = require('../middleware/authMiddleware');
// Akıllı rota oluşturma kapısı (POST isteği)
// Misafir giriş yapmadan da rota oluşturabilsin diye şimdilik protect (fedai) koymuyoruz.
router.post('/generate', createSmartRoute);

// 2. KORUMALI UÇ NOKTA: Sadece giriş yapmış (token'ı olan) kullanıcılar rotayı kaydedebilir
router.post('/save', protect, saveRoute); // Buraya authMiddleware ekledik!
// 3. KORUMALI UÇ NOKTA: Kullanıcının kendi rotalarını getir
router.get('/my', protect, getMyRoutes);
// 4. Kaydedilmiş Rotayı Getirme 
router.get('/:id', getRoute);
// 5. KORUMALI UÇ NOKTA: Kullanıcının kendi rotasını sil
router.delete('/:id', protect, deleteRoute);

module.exports = router;
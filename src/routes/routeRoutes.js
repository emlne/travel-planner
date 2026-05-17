const express = require('express');
const router = express.Router();

// Az önce yazdığımız controller'ı içeri alıyoruz
const { createSmartRoute, getRoute } = require('../controllers/routeController');

// Akıllı rota oluşturma kapısı (POST isteği)
// Misafir giriş yapmadan da rota oluşturabilsin diye şimdilik protect (fedai) koymuyoruz.
router.post('/generate', createSmartRoute);
// 2. Kaydedilmiş Rotayı Getirme 
router.get('/:id', getRoute);

module.exports = router;
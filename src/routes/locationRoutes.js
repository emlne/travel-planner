const { protect, adminMiddleware } = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();
// Controller dosyamızdaki fonksiyonları buraya çağırıyoruz
const {
    createLocation,
    getAllLocations,
    updateLocation,
    deleteLocation
} = require('../controllers/locationController');

// 1. Yeni Mekan Ekleme -> POST /api/locations
router.post('/', protect, adminMiddleware, createLocation);

// 2. Tüm Mekanları Listeleme -> GET /api/locations
router.get('/', getAllLocations);

// 3. Mekan Güncelleme -> PUT /api/locations/:id
router.put('/:id', protect, adminMiddleware, updateLocation);

// 4. Mekan Silme -> DELETE /api/locations/:id
router.delete('/:id', protect, adminMiddleware, deleteLocation);

module.exports = router;
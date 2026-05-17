const express = require('express');
const router = express.Router();
const { register, login , getMe} = require('../controllers/authController');
// Fedaimizi (middleware) çağırıyoruz
const { protect } = require('../middleware/authMiddleware');
// 1. İlk Yöneticiyi Kaydetme -> POST /api/auth/register
// (Unutma, bu kapı bir kez kullanıldıktan sonra kendini kilitleyecek şekilde kodladık!)
router.post('/register', register);

// 2. Yönetici Girişi -> POST /api/auth/login
router.post('/login', login);

// 3. Korumalı /me rotası
router.get('/me', protect, getMe);

module.exports = router;
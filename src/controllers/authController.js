const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Dijital Anahtar (Token) Üretme Fonksiyonu
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

// YENİ KAYIT (Register)
exports.register = async (req, res) => {
    try {
        // KRİTİK KONTROL: Veritabanında herhangi bir kullanıcı var mı?
        const userCount = await User.countDocuments();

        // Eğer zaten bir kullanıcı (admin) varsa, kapıyı kapat!
        if (userCount > 0) {
            return res.status(403).json({
                success: false,
                message: 'Kayıt işlemi artık kapalıdır. Sadece mevcut yönetici giriş yapabilir.'
            });
        }

        const newUser = await User.create({
            email: req.body.email,
            password: req.body.password
        });

        const token = signToken(newUser._id);

        res.status(201).json({
            success: true,
            token,
            message: 'İlk yönetici hesabı başarıyla oluşturuldu.'
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// GİRİŞ YAP (Login)
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1) Email ve şifre girilmiş mi kontrol et
        if (!email || !password) {
            return res.status(400).json({ message: 'Lütfen email ve şifre giriniz' });
        }

        // 2) Kullanıcıyı bul ve şifresini kontrol et (select: false dediğimiz için şifreyi elle seçmeliyiz)
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({ message: 'Hatalı email veya şifre' });
        }

        // 3) Her şey tamamsa Token gönder
        const token = signToken(user._id);
        res.status(200).json({ success: true, token });

    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
// MEVCUT KULLANICIYI GETİR (Get Me)
exports.getMe = async (req, res) => {
    try {

        res.status(200).json({
            success: true,
            data: {
                user: req.user
            }
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

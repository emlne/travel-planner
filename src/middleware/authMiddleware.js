const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    try {
        let token;
        
        // 1) İsteğin başlığında (Header) anahtar var mı kontrol et
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Lütfen önce giriş yapınız.' });
        }

        // 2) Anahtarı doğrula (Süresi dolmuş mu? Bizim anahtarımız mı?)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3) Anahtarın sahibi olan kullanıcı hala veritabanında var mı?
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({ message: 'Bu anahtara sahip kullanıcı artık mevcut değil.' });
        }

        // 4) Her şey yolunda! Kullanıcı bilgisini isteğe (req) ekle ve devam et
        req.user = currentUser;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Geçersiz veya süresi dolmuş anahtar.' });
    }
};

exports.adminMiddleware = (req, res, next) => {
    // req.user zaten yukarıdaki protect (authMiddleware) tarafından dolduruluyor
    if (req.user && req.user.role === 'admin') {
        next(); // Admin ise geçebilir
    } else {
        return res.status(403).json({ 
            success: false,
            message: 'Erişim engellendi! Bu işlem için yönetici (admin) yetkisi gerekiyor.' 
        });
    }
};
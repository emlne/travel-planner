const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Kullanıcı modelini kaydettiğin isimle (büyük-küçük harf dahil) birebir aynı olmalı
        required: [true, 'Bir rotanın kaydedilebilmesi için bir kullanıcıya ait olması zorunludur']
    },
    routeTitle: {
        type: String,
        required: [true, 'Rota için bir başlık gereklidir']
    },
    totalDays: {
        type: Number,
        required: true
    },
    // Misafirin bu rotayı hangi ayarlarla oluşturduğunu da bilelim
    preferences: {
        vehicle: {
            type: String,
            default: 'araba'
        },
        categories: [String]
    },
    // Gemini'den dönecek gün gün planlanan asıl kısım
    dailyPlans: [{
        day: Number,
        title: String,
        placesToVisit: [String],
        description: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Route', routeSchema);
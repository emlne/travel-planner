const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
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
        hasCar: {
            type: Boolean,
            default: false
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
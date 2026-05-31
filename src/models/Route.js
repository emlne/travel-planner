const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
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
    preferences: {
        vehicle: {
            type: String,
            default: 'araba'
        },
        categories: [String]
    },
    
    // 🚀 İŞTE SİHİRLİ DOKUNUŞ: 
    // İçeriği Mongoose'a denetletmiyoruz. "Ne gelirse gelsin Dizi olarak kaydet" diyoruz.
    dailyPlans: {
        type: [mongoose.Schema.Types.Mixed],
        default: []
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Route', routeSchema);
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // .env dosyasındaki MONGO_URI adresine bağlanmayı dener
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Bağlantısı Başarılı: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Bağlantı Hatası: ${error.message}`);
        process.exit(1); // Hata varsa sunucuyu durdur
    }
};

module.exports = connectDB;
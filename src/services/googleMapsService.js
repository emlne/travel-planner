const axios = require('axios');

exports.getCoordinatesFromAddress = async (address) => {
    try {
        // Google Geocoding API uç noktası
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

        const response = await axios.get(url);

        // Google'dan başarılı bir sonuç döndü mü kontrolü
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            // API anahtarı geçersizse veya adres bulunamazsa buraya düşer
            console.error('Google Maps API Hatası:', response.data.status);
            
            // Sistem çökmesin diye şimdilik manuel koordinat (Örn: Fethiye Merkez) döndürüyoruz
            // Canlıya alırken burayı 'throw new Error(...)' olarak değiştirmeliyiz
            return { lat: 36.6217, lng: 29.1415 }; 
        }

    } catch (error) {
        console.error('Google Servisine bağlanılamadı:', error.message);
        // Hata durumunda varsayılan koordinat
        return { lat: 36.6217, lng: 29.1415 };
    }
};
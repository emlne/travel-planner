const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  categories: {
    type: [String],
    enum: ['doğa', 'tarih', 'deniz', 'adrenalin', 'eğlence'], // Mekanın kategorileri
    required: true
  },
  averageSpendingTime: {
    type: Number, // dakika cinsinden
    required: true
  },
  carRequired: {
    type: Boolean,
    default: false
  },
  coordinates: {
    lat: { type: Number }, // Enlem (Örn: 36.6217)
    lng: { type: Number }  // Boylam (Örn: 29.1415)
  },
  googleMapsUrl: { 
    type: String // Misafire rotada doğrudan tıklayabileceği linki vermek için
  },
  regionalAdvice: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Location', locationSchema);

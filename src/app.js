require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const locationRoutes = require('./routes/locationRoutes');
const authRoutes = require('./routes/authRoutes');
const routeRoutes = require('./routes/routeRoutes');

const app = express();
connectDB();
const PORT = process.env.PORT || 3000;

// Middleware'ler
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/locations', locationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/routes', routeRoutes);

// Basit Bir Test Route'u
app.get('/', (req, res) => {
  res.json({ message: 'Rotabul Backend API Çalışıyor!' });
});

// Sunucuyu Ayağa Kaldırma
app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} portunda çalışıyor.`);
});

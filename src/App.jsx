import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import PrivateRoute from './routes/PrivateRoute';
import Navbar from './components/Navbar';
import AuthModal from './components/Authmodal';
import ItineraryDetails from './components/Itinerarydetails';

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* Tüm uygulamada sticker temalı pofuduk bildirimler için Toaster */}
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: 'rgba(10, 25, 47, 0.95)', /* Derin lacivert şeffaf arka plan */
              backdropFilter: 'blur(10px)', /* Cam efekti */
              border: '1px solid rgba(100, 255, 218, 0.2)', /* Zarif turkuaz çerçeve */
              borderRadius: '16px', /* Modern yuvarlatılmış köşeler */
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)', /* Yumuşak ve derin gölge */
              fontFamily: '"Inter", system-ui, sans-serif', /* Projenin ana fontu */
              fontWeight: '500',
              color: '#ccd6f6', /* Göz yormayan açık gri/mavi metin */
              padding: '16px 24px',
              letterSpacing: '0.3px',
            },
            success: {
              iconTheme: {
                primary: '#64ffda', /* Başarılı ikonu Fethiye Turkuazı */
                secondary: '#0a192f',
              },
            },
            error: {
              iconTheme: {
                primary: '#ff758c', /* Hata ikonu sıcak pembe */
                secondary: '#ffffff',
              },
            },
          }}
        />

        {/* Global Navigasyon Barı */}
        <Navbar />

        {/* Tetiklendiğinde her sayfanın üstünde pofuduk açılan gizli Auth Modalı */}
        <AuthModal />

        {/* Sayfa Yönlendirmeleri */}
        <Routes>
          {/* Herkese Açık Ana Sayfa */}
          <Route path="/" element={<HomePage />} />

          {/* YENİ 2: Misafirlerin rotayı kaydetmeden önce göreceği önizleme (Freemium) sayfası */}
          <Route path="/itinerary/preview" element={<ItineraryDetails />} />
          
          {/* YENİ 3: Kaydedilmiş gerçek rotaların ID ile açılacağı sayfa */}
          <Route path="/itinerary/:id" element={<ItineraryDetails />} />

          {/* Korumalı Rotalar (Gelecekte ekleyeceğin profil veya geçmiş rotalar için hazır altyapı) */}
          <Route element={<PrivateRoute />}>
            {/* <Route path="/my-itineraries" element={<MyItinerariesPage />} /> */}
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
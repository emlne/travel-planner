// src/routes/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                color: 'var(--color-text-light)',
                gap: '12px',
            }}>
                <span style={{ fontSize: '2rem', animation: 'spin-slow 2s linear infinite' }}>✈️</span>
                Yükleniyor...
            </div>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
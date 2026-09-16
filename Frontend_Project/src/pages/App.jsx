import { useState, useEffect } from 'react';
import LandingPage from './LandingPage';
import Login from './Login';
import Dashboard from './Dashboard';
import Register from './Register';

export default function App() {
    // 1. Ambil halaman awal berdasarkan Hash URL saat pertama kali dibuka
    const [currentPage, setCurrentPage] = useState(() => {
        const hash = window.location.hash.replace('#/', '');
        return hash || 'landing'; // Default ke landing page jika kososng
    });
    
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // 2. Efek untuk memantau tombol Back / Forward di Browser
    useEffect(() => {
        const handlePopState = () => {
            const hash = window.location.hash.replace('#/', '');
            setCurrentPage(hash || 'landing');
        };

        // Daftarkan event listener browser
        window.addEventListener('popstate', handlePopState);
        
        // Set hash awal di URL saat aplikasi pertama dimuat
        if (!window.location.hash) {
            window.history.replaceState(null, '', '#/landing');
        }

        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // 3. Fungsi navigasi dimodifikasi agar mendorong riwayat ke Browser History
    const navigateTo = (pageName) => {
        setCurrentPage(pageName);
        window.history.pushState(null, '', `#/${pageName}`);
    };

    const handleLoginSuccess = (authData) => {
        setUser(authData.user);
        navigateTo('dashboard');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigateTo('landing');
    };

    if (currentPage === 'landing') {
        return (
            <LandingPage 
                onNavigateToLogin={() => navigateTo('login')} 
                onNavigateToRegister={() => navigateTo('register')} 
            />
        );
    }

    if (currentPage === 'dashboard') {
        return <Dashboard user={user} onLogout={handleLogout} />;
    }

    if (currentPage === 'register') {
    return (
        <Register 
            onNavigateToLogin={() => navigateTo('login')} 
            onNavigateToLanding={() => navigateTo('landing')}
        />
    );
}

    return (
        <Login
            onLoginSuccess={handleLoginSuccess}
            onNavigateToRegister={() => navigateTo('register')}
            onNavigateToLanding={() => navigateTo('landing')}
        />
    );
}
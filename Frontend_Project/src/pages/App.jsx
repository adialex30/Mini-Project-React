import { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import Register from './Register';

export default function App() {
    const [currentPage, setCurrentPage] = useState('login');
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const navigateTo = (pageName) => {
        setCurrentPage(pageName);
    };

    const handleLoginSuccess = (authData) => {
        setUser(authData.user);
        navigateTo('dashboard');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigateTo('login');
    };

    if (currentPage === 'dashboard') {
        return <Dashboard user={user} onLogout={handleLogout} />;
    }

    if (currentPage === 'register') {
        return <Register onNavigateToLogin={() => navigateTo('login')} />;
    }

    return (
        <Login
            onLoginSuccess={handleLoginSuccess}
            onNavigateToRegister={() => navigateTo('register')}
        />
    );
}
import { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import Register from './Register';

export default function App() {
    const [currentPage, setCurrentPage] = useState('login');
    const navigateTo = (pageName) => {
        setCurrentPage(pageName);
    };

    if (currentPage === 'dashboard') {
        return <Dashboard onLogout={() => navigateTo('login')} />;
    }

    if (currentPage === 'register') {
        return <Register onNavigateToLogin={() => navigateTo('login')} />;
    }

    return (
        <Login
            onLoginSuccess={() => navigateTo('dashboard')}
            onNavigateToRegister={() => navigateTo('register')}
        />
    );
}
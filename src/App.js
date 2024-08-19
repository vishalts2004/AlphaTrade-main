import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import FinancialHoldings from './components/FinancialHoldings';
import Wallet from './components/Wallet';  // Import the Wallet component
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home'; 
import './styles.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <div className="App">
            {isAuthenticated && (
                <>
                    <Header />
                    <Navbar onLogout={handleLogout} />
                </>
            )}
            <main>
                <Routes>
                    {!isAuthenticated ? (
                        <>
                            <Route path="/login" element={<Login onLogin={handleLogin} />} />
                            <Route path="/signup" element={<SignUp onSignUp={handleLogin} />} />
                            <Route path="/" element={<Navigate to="/login" />} />
                        </>
                    ) : (
                        <>
                            <Route path="/home" element={<Home />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/holdings" element={<FinancialHoldings />} />
                            <Route path="/wallet" element={<Wallet />} />  {/* Add Wallet route */}
                            <Route path="/" element={<Navigate to="/home" />} />
                        </>
                    )}
                </Routes>
            </main>
            {isAuthenticated && <Footer />}
        </div>
    );
};

export default App;

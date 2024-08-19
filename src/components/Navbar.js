import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        onLogout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/" className="nav-link">Home</Link></li>
                <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
                <li><Link to="/holdings" className="nav-link">Holdings</Link></li>
                <li><Link to="/wallet" className="nav-link">Wallet</Link></li>
                <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
            </ul>
        </nav>
    );
};

export default Navbar;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">InsightFactory</Link>
      </div>

      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/about" onClick={() => setMenuOpen(false)}>О проекте</Link>
        <Link to="/materials" onClick={() => setMenuOpen(false)}>Материалы</Link>
        <Link to="/regression-chart" onClick={() => setMenuOpen(false)}>График</Link>
        {user ? (
          <>
            <Link to="/profile" onClick={() => setMenuOpen(false)}>Профиль</Link>
            <button className="logout" onClick={handleLogout}>Выйти</button>
          </>
        ) : (
          <Link to="/auth" onClick={() => setMenuOpen(false)}>Вход / Регистрация</Link>
        )}
      </div>

      <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
}

export default Navbar;

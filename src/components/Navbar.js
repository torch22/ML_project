import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaSun, FaMoon } from 'react-icons/fa';
import avatarPlaceholder from '../assets/avatar_default.JPG'; // Предполагаем аватар
import '../styles/Navbar.css';

function Navbar({ onAuthClick }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const justOpenedRef = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // Проверяем авторизацию

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleSidebar = () => {
    console.log('Toggling sidebar, new state:', !isSidebarOpen);
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      justOpenedRef.current = true;
    }
  };

  const handleUserClick = () => {
    if (user) {
      navigate('/profile'); // Переход на профиль, если авторизован
    } else {
      onAuthClick(); // Открытие модалки, если не авторизован
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 768) {
        setIsScrolled(window.scrollY > 0);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (justOpenedRef.current) {
        justOpenedRef.current = false;
        return;
      }

      if (isSidebarOpen && !event.target.closest('.sidebar') && !event.target.closest('.navbar-mobile')) {
        console.log('Closing sidebar due to outside click');
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isSidebarOpen]);

  const sidebarVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.7, transition: { duration: 0.3 } },
  };

  const topNavVariants = {
    hidden: { y: '-100%', opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const isSpecialPage = location.pathname === '/regression-chart' || location.pathname === '/profile';

  return (
    <>
      {!isSpecialPage && (
        <motion.div
          className="sidebar-static"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="sidebar-content">
            <nav className="sidebar-nav">
              <Link to="/" className="sidebar-link" onClick={() => window.scrollTo(0, 0)}>
                <span>Меню</span>
              </Link>
              <Link to="/about" className="sidebar-link" onClick={() => window.scrollTo(0, 0)}>
                <span>О продукте</span>
              </Link>
              <Link to="/materials" className="sidebar-link" onClick={() => window.scrollTo(0, 0)}>
                <span>Обучающие материалы</span>
              </Link>
            </nav>
            <div className="sidebar-auth">
              {user ? (
                <div className="user-section">
                  <div className="user-info" onClick={handleUserClick}>
                    <img src={avatarPlaceholder} alt="Аватар" className="user-avatar" />
                    <span>{user.name}</span>
                  </div>
                  <button onClick={handleLogout} className="logout-button">Выйти</button>
                </div>
              ) : (
                <button onClick={handleUserClick} className="auth-button">Вход / Регистрация</button>
              )}
              <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </div>
        </motion.div>
      )}
      <div className="navbar-mobile">
        {!isSidebarOpen && (
          <button
            className="menu-toggle"
            onClick={toggleSidebar}
            aria-label="Toggle navigation menu"
            style={{ zIndex: 1001 }}
          >
            <FaBars />
          </button>
        )}
      </div>
      {isSidebarOpen && (
        <>
          <motion.div
            className="sidebar-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={toggleSidebar}
          />
          <motion.div
            className="sidebar-mobile"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sidebar-content">
              <nav className="sidebar-nav">
                <Link to="/" className="sidebar-link" onClick={() => { toggleSidebar(); window.scrollTo(0, 0); }}>
                  <span>Меню</span>
                </Link>
                <Link to="/about" className="sidebar-link" onClick={() => { toggleSidebar(); window.scrollTo(0, 0); }}>
                  <span>О продукте</span>
                </Link>
                <Link to="/materials" className="sidebar-link" onClick={() => { toggleSidebar(); window.scrollTo(0, 0); }}>
                  <span>Обучающие материалы</span>
                </Link>
              </nav>
              <div className="sidebar-auth">
                {user ? (
                  <div className="user-section">
                    <div className="user-info" onClick={handleUserClick}>
                      <img src={avatarPlaceholder} alt="Аватар" className="user-avatar" />
                      <span>{user.name}</span>
                    </div>
                    <button onClick={handleLogout} className="logout-button">Выйти</button>
                  </div>
                ) : (
                  <button onClick={handleUserClick} className="auth-button">Вход / Регистрация</button>
                )}
                <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                  {theme === 'dark' ? <FaSun /> : <FaMoon />}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
      <motion.div
        className={`top-nav ${isSpecialPage ? 'static' : ''}`}
        variants={topNavVariants}
        initial="hidden"
        animate={isSpecialPage ? 'visible' : (isScrolled ? 'visible' : 'hidden')}
      >
        <nav className="top-nav-content">
          <Link to="/" className="top-nav-link" onClick={() => window.scrollTo(0, 0)}>Меню</Link>
          <Link to="/about" className="top-nav-link" onClick={() => window.scrollTo(0, 0)}>О продукте</Link>
          <Link to="/materials" className="top-nav-link" onClick={() => window.scrollTo(0, 0)}>Обучающие материалы</Link>
          {user ? (
            <div className="user-section">
              <div className="user-info" onClick={handleUserClick}>
                <img src={avatarPlaceholder} alt="Аватар" className="user-avatar" />
                <span>{user.name}</span>
              </div>
              <button onClick={handleLogout} className="logout-button">Выйти</button>
            </div>
          ) : (
            <button onClick={handleUserClick} className="top-auth-button">Вход / Регистрация</button>
          )}
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
        </nav>
      </motion.div>
    </>
  );
}

export default Navbar;
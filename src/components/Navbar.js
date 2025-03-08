import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../styles/Navbar.css';

function Navbar({ onAuthClick }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSidebarOpen && !event.target.closest('.sidebar') && !event.target.closest('.menu-toggle')) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isSidebarOpen]);

  const sidebarVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.7, transition: { duration: 0.3 } },
  };

  return (
    <nav>
      <div className="navbar-desktop">
        <div className="navbar-left">
          <Link to="/" className="nav-link">Меню</Link>
          <Link to="/about" className="nav-link">О продукте</Link>
          <Link to="/materials" className="nav-link">Обучающие материалы</Link>
        </div>
        <div className="navbar-right">
          <button onClick={onAuthClick} className="auth-button">Вход / Регистрация</button>
        </div>
      </div>
      <div className="navbar-mobile">
        <div className="navbar-mobile-left">
          <button onClick={onAuthClick} className="auth-button">Вход / Регистрация</button>
        </div>
        <div className="navbar-mobile-right">
          <button className="menu-toggle" onClick={toggleSidebar} aria-label="Toggle navigation menu" aria-expanded={isSidebarOpen} aria-hidden={false}>
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
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
            className="sidebar"
            variants={sidebarVariants}
            initial="hidden"
            animate={isSidebarOpen ? 'visible' : 'hidden'}
            exit="hidden"
          >
            <Link to="/" className="sidebar-link" onClick={toggleSidebar}>Меню</Link>
            <Link to="/about" className="sidebar-link" onClick={toggleSidebar}>О продукте</Link>
            <Link to="/materials" className="sidebar-link" onClick={toggleSidebar}>Обучающие материалы</Link>
          </motion.div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
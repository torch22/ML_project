import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthModal.css';

function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    if (!validateEmail(formData.email)) {
      setError('Пожалуйста, введите корректный email');
      return;
    }
    const user = { name: formData.email.split('@')[0], email: formData.email };
    localStorage.setItem('user', JSON.stringify(user));
    console.log('Вход:', formData.email, formData.password);
    onClose();
    setFormData({ email: '', password: '', name: '' });
    navigate('/profile');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    if (!validateEmail(formData.email)) {
      setError('Пожалуйста, введите корректный email');
      return;
    }
    if (formData.password.length < 6) {
      setError('Пароль должен быть минимум 6 символов');
      return;
    }
    const user = {
      name: formData.name,
      firstName: formData.name, // Копируем name в firstName
      lastName: '',
      email: formData.email,
      role: 'student',
      experience: 'novice',
      city: '',
      about: '',
    };
    localStorage.setItem('user', JSON.stringify(user));
    console.log('Регистрация:', formData.name, formData.email, formData.password);
    onClose();
    setFormData({ email: '', password: '', name: '' });
    navigate('/profile');
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="modal-overlay"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="close" onClick={onClose}>×</span>
        {isLogin ? (
          <div id="loginForm">
            <h2>Вход</h2>
            {error && <p className="error-message">{error}</p>}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Электронная почта"
              required
              className={error && !formData.email ? 'error-input' : ''}
              autoFocus
            />
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Пароль"
                required
                className={error && !formData.password ? 'error-input' : ''}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button id="loginBtn" onClick={handleLogin}>Войти</button>
            <span className="toggle-link" onClick={() => { setIsLogin(false); setError(''); }}>
              Нет аккаунта? Зарегистрироваться
            </span>
          </div>
        ) : (
          <div id="registerForm">
            <h2>Регистрация</h2>
            {error && <p className="error-message">{error}</p>}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Имя"
              required
              className={error && !formData.name ? 'error-input' : ''}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Электронная почта"
              required
              className={error && !formData.email ? 'error-input' : ''}
              autoFocus
            />
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Пароль"
                required
                className={error && !formData.password ? 'error-input' : ''}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button id="registerBtn" onClick={handleRegister}>Зарегистрироваться</button>
            <span className="toggle-link" onClick={() => { setIsLogin(true); setError(''); }}>
              Уже есть аккаунт? Войти
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default AuthModal;
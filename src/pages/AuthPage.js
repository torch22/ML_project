import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import '../styles/AuthPage.css';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!email || !password || (!isLogin && !name)) {
      setError('Заполните все поля');
      return;
    }

    if (!validateEmail(email)) {
      setError('Некорректный email');
      return;
    }

    if (!isLogin && password.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      return;
    }

    const user = isLogin
      ? { name: email.split('@')[0], email }
      : {
          name,
          email,
          firstName: name,
          lastName: '',
          role: 'student',
          experience: 'novice',
          city: '',
          about: '',
        };

    localStorage.setItem('user', JSON.stringify(user));
    navigate('/profile');
  };

  const handleModeSwitch = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ name: '', email: '', password: '' });
  };

  const handleOAuth = (provider) => {
    const user = {
      name: provider === 'google' ? 'Google User' : 'GitHub User',
      email: provider === 'google' ? 'google@example.com' : 'github@example.com',
      firstName: provider === 'google' ? 'Google' : 'GitHub',
      lastName: '',
      role: 'student',
      experience: 'novice',
      city: '',
      about: '',
    };
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/profile');
  };

  return (
    <div className="auth-page">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="auth-welcome"
            >
              <h2>{isLogin ? 'С возвращением!' : 'Добро пожаловать!'}</h2>
              <p>
                {isLogin
                  ? 'Войдите в свой аккаунт и продолжайте обучение.'
                  : 'Создайте аккаунт, чтобы начать путешествие в мир ML.'}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="auth-right">
          <h3>{isLogin ? 'Вход' : 'Регистрация'}</h3>
          {error && <p className="auth-error">{error}</p>}
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Имя"
                value={formData.name}
                onChange={handleChange}
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Электронная почта"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
          </form>

          <div className="oauth-divider">
            <span />
            <span>или</span>
            <span />
          </div>

          <div className="oauth-buttons">
            <button className="oauth google" onClick={() => handleOAuth('google')}>
              <FaGoogle /> Войти через Google
            </button>
            <button className="oauth github" onClick={() => handleOAuth('github')}>
              <FaGithub /> Войти через GitHub
            </button>
          </div>

          <span className="auth-switch" onClick={handleModeSwitch}>
            {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войти'}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default AuthPage;
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import avatarPlaceholder from '../assets/avatar_default.JPG'; 
import '../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const profileVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className="profile-wrapper">
      <motion.div
        className="profile-container"
        variants={profileVariants}
        initial="hidden"
        animate="visible"
      >
        <h1>Профиль пользователя</h1>
        <div className="profile-card">
          <img src={avatarPlaceholder} alt="Аватар" className="profile-avatar" />
          <h2>{user?.name || 'Пользователь'}</h2>
          <p>{user?.email || 'email@example.com'}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="logout-btn"
          >
            Выйти
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
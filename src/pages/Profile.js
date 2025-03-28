import React, { useEffect, useState, useRef } from 'react'; // Добавляем useRef
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPencilAlt } from 'react-icons/fa'; // Иконка карандаша из react-icons
import avatarPlaceholder from '../assets/avatar_default.JPG';
import '../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: 'student',
    experience: 'novice',
    city: '',
    about: '',
    avatar: null,
  });
  const fileInputRef = useRef(null); // Ссылка на скрытый input

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        role: user.role || 'student',
        experience: user.experience || 'novice',
        city: user.city || '',
        about: user.about || '',
        avatar: user.avatar || null,
      });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click(); // Активируем скрытый input по клику на аватар
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      const updatedUser = { ...user, ...formData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
    setIsEditing(!isEditing);
  };

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
          <div className="avatar-container" onClick={handleAvatarClick}>
            <img
              src={formData.avatar || avatarPlaceholder}
              alt="Аватар"
              className="profile-avatar"
            />
            {isEditing && (
              <>
                <FaPencilAlt className="edit-pencil" />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  className="avatar-input-hidden"
                />
              </>
            )}
          </div>
          <div className="profile-field">
            <span>Имя:</span>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Введите имя"
              />
            ) : (
              <span>{formData.firstName || 'Не указано'}</span>
            )}
          </div>
          <div className="profile-field">
            <span>Фамилия:</span>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Введите фамилию"
              />
            ) : (
              <span>{formData.lastName || 'Не указано'}</span>
            )}
          </div>
          <div className="profile-field">
            <span>Почта:</span>
            <span>{user?.email || 'email@example.com'}</span>
          </div>
          <div className="profile-field">
            <span>Роль:</span>
            {isEditing ? (
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="student">Студент</option>
                <option value="teacher">Учитель</option>
                <option value="manager">Руководитель</option>
                <option value="company">Компания</option>
              </select>
            ) : (
              <span>{formData.role === 'student' ? 'Студент' : formData.role === 'teacher' ? 'Учитель' : formData.role === 'manager' ? 'Руководитель' : 'Компания'}</span>
            )}
          </div>
          <div className="profile-field">
            <span>Опыт:</span>
            {isEditing ? (
              <select name="experience" value={formData.experience} onChange={handleChange}>
                <option value="novice">Новичок</option>
                <option value="intermediate">Средний</option>
                <option value="advanced">Продвинутый</option>
                <option value="expert">Эксперт</option>
              </select>
            ) : (
              <span>{formData.experience === 'novice' ? 'Новичок' : formData.experience === 'intermediate' ? 'Средний' : formData.experience === 'advanced' ? 'Продвинутый' : 'Эксперт'}</span>
            )}
          </div>
          <div className="profile-field">
            <span>Город:</span>
            {isEditing ? (
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Введите город"
              />
            ) : (
              <span>{formData.city || 'Не указан'}</span>
            )}
          </div>
          <div className="profile-field">
            <span>О себе:</span>
            {isEditing ? (
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                placeholder="Расскажите о себе"
              />
            ) : (
              <span>{formData.about || 'Не указано'}</span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEditToggle}
            className="edit-btn"
          >
            {isEditing ? 'Сохранить' : 'Настроить профиль'}
          </motion.button>
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
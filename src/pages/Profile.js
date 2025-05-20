import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPencilAlt } from 'react-icons/fa';
import GeneratedAvatar from '../components/GeneratedAvatar';
import '../styles/Profile.css';

function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
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
  const [historyOpen, setHistoryOpen] = useState(false);

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

  const materials = [
    { title: 'Ферисия', progress: 0.3 },
    { title: 'Классификация', progress: 0.6 },
    { title: 'Кластеризация', progress: 0.0 },
  ];

  return (
    <div className="profile-wrapper">
      <motion.div
        className="profile-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Профиль</h2>
        <div className="profile-avatar-container" onClick={() => isEditing && fileInputRef.current?.click()}>
          {formData.avatar ? (
            <img src={formData.avatar} alt="Аватар" className="profile-avatar" />
          ) : (
            <GeneratedAvatar email={user?.email || 'guest@example.com'} />
          )}
          {isEditing && (
            <>
              <FaPencilAlt className="avatar-edit-icon" />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                className="hidden-input"
              />
            </>
          )}
        </div>

        <div className="profile-grid">
          {[
            { label: 'Имя', name: 'firstName' },
            { label: 'Фамилия', name: 'lastName' },
            { label: 'Город', name: 'city' },
          ].map(({ label, name }) => (
            <div className="profile-field" key={name}>
              <span>{label}:</span>
              {isEditing ? (
                <input type="text" name={name} value={formData[name]} onChange={handleChange} />
              ) : (
                <span>{formData[name] || 'Не указано'}</span>
              )}
            </div>
          ))}

          <div className="profile-field">
            <span>Почта:</span>
            <span>{user?.email || '-'}</span>
          </div>

          <div className="profile-field">
            <span>Роль:</span>
            {isEditing ? (
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="student">Студент</option>
                <option value="teacher">Преподаватель</option>
                <option value="manager">Руководитель</option>
                <option value="company">Компания</option>
              </select>
            ) : (
              <span>{formData.role}</span>
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
              <span>{formData.experience}</span>
            )}
          </div>

          <div className="profile-field">
            <span>О себе:</span>
            {isEditing ? (
              <textarea name="about" value={formData.about} onChange={handleChange} />
            ) : (
              <span>{formData.about || '—'}</span>
            )}
          </div>
        </div>

        {!isEditing && (
          <div className="learning-progress">
            <h3>Прогресс обучения</h3>
            <div className="progress-cards">
              {materials.map((m, i) => (
                <div className="progress-card" key={i} role="button">
                  <span className="progress-title">{m.title}</span>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${m.progress * 100}%` }}
                    ></div>
                  </div>
                  <div className="progress-percent">{Math.round(m.progress * 100)}%</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isEditing && (
          <div className="dataset-history">
            <button
              className="toggle-history"
              onClick={() => setHistoryOpen((prev) => !prev)}
            >
              {historyOpen ? 'Скрыть историю' : 'Показать историю работы с датасетами'}
            </button>

            {historyOpen && (() => {
              const history = JSON.parse(localStorage.getItem('datasetHistory')) || [];
              if (!history.length) {
                return <p className="empty-history">Нет добавленных точек</p>;
              }
              return (
                <div className="history-cards">
                  {history.slice(-10).reverse().map((item, idx) => (
                    <div key={idx} className="history-card">
                      <p><strong>{item.fileName}</strong></p>
                      <p>Размер: {item.sizeKB} КБ</p>
                      <p>Тип: {item.type || 'неизвестен'}</p>
                      <p>Загружен: {item.timestamp}</p>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}

        <div className="profile-actions">
          <button onClick={handleEditToggle} className="edit-btn">
            {isEditing ? 'Сохранить' : 'Редактировать'}
          </button>
          <button onClick={handleLogout} className="logout">Выйти</button>
        </div>
      </motion.div>
    </div>
  );
}

export default Profile;

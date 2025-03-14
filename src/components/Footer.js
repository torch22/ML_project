import React from 'react';
import '../styles/Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>О нас</h3>
          <p>Информация о нашей компании и миссии.</p>
        </div>
        <div className="footer-section">
          <h3>Ссылки</h3>
          <ul>
            <li>
              <a href="/about">О продукте</a>
            </li>
            <li>
              <a href="/materials">Обучающие материалы</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Контакты</h3>
          <p>Email: support@InsightFactory.com</p>
          <p>Телефон: +7 (999) 999-99-99</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;
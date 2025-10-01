import React from 'react';
import '../styles/Footer.css';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaVk, FaGithub } from 'react-icons/fa';
import tiuLogo from '../assets/tiu_short_white.png';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Левая часть */}
        <div className="footer-left">
          <div className="footer-logo-block">
            <a href='https://www.tyuiu.ru/' target='_blank' rel='noopener noreferrer'>
              <img src={tiuLogo} alt="ТИУ" className="footer-logo" />
            </a>
            <div className="footer-support-text">Проект создан при поддержке ТИУ</div>
          </div>

          <div className="footer-address">
            <FaMapMarkerAlt className="footer-icon" />
            <a
              href="https://yandex.ru/maps/-/CHbY7PiJ"
              target="_blank"
              rel="noopener noreferrer"
            >
              ул. Мельникайте 70, Тюмень
            </a>
          </div>
        </div>

        <div className="footer-divider"></div>

        {/* Правая часть */}
        <div className="footer-right">
          <div className="footer-contact">
            <p><FaEnvelope /> <a href="mailto:support@example.com">support@example.com</a></p>
            <p><FaPhone /> <a href="tel:+79999999">+7 (999) 999-99-99</a></p>
          </div>

          <div className="footer-socials">
            <a href="https://vk.com" target="_blank" rel="noopener noreferrer">
              <FaVk /> ВКонтакте
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub /> GitHub
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
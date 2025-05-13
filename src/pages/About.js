import { motion } from 'framer-motion';
import '../styles/About.css';
import { FaGithub, FaTelegram, FaEnvelope, FaMapMarkerAlt, FaVk, FaPhone } from 'react-icons/fa';

function About() {
  const history = [
    { year: '2024', event: 'Основана команда с целью упростить доступ к ML-инструментам' },
    { year: '2025', event: 'Разработана первая версия Serennex' },
    { year: '2026', event: 'Запуск проекта на комерческий уровень' },
  ];

  const team = [
    { name: 'Елена Мясникова', role: 'Тимлид, бэкенд' },
    { name: 'Данил Булатов', role: 'Фронтенд' },
    { name: 'Валентин Вэнго', role: 'Контент' },
  ];

  return (
    <div className="about-wrapper">
      <motion.div className="about-hero">
        <motion.div className="about-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h1>О нас</h1>
          <p>
            InsightFactory — это команда энтузиастов машинного обучения, стремящихся сделать технологии доступными каждому. Мы создаём инструменты, которые упрощают путь от первого датасета до продвинутого анализа и визуализации.
          </p>
        </motion.div>
      </motion.div>

      <motion.div className="timeline-section" initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <h2>Этапы развития</h2>
        <div className="timeline-simple">
          {history.map((item, i) => (
            <motion.div key={i} className="timeline-entry" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-desc">{item.event}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div className="team-section" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <h2>Наша команда</h2>
        <p>Профессионалы, посвящённые развитию ИИ-технологий.</p>
        <div className="team-grid">
          {team.map((member, idx) => (
            <div className="team-member" key={idx}>
              <div className="team-placeholder">Фото</div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div className="contact-section" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <h2>Контакты</h2>
        <div className="contact-grid">
          <div className="contact-item">
            <FaEnvelope />
            <a href="mailto:support@insightfactory.com">support@insightfactory.com</a>
          </div>
          <div className="contact-item">
            <FaPhone />
            <a href="tel:+79999999999">+7 (999) 999-99-99</a>
          </div>
          <div className="contact-item">
            <FaMapMarkerAlt />
            <a href="https://yandex.ru/maps/?text=Тюмень ул. Мельникайте 70" target="_blank" rel="noreferrer">
              г. Тюмень ул. Мельникайте 70
            </a>
          </div>
          <div className="contact-item">
            <FaGithub />
            <a href="https://github.com/insightfactory" target="_blank" rel="noreferrer">github.com/insightfactory</a>
          </div>
          <div className="contact-item">
            <FaTelegram />
            <a href="https://t.me/insight_factory" target="_blank" rel="noreferrer">@insight_factory</a>
          </div>
          <div className="contact-item">
            <FaVk />
            <a href="https://vk.com/insightfactory" target="_blank" rel="noreferrer">vk.com/insightfactory</a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default About;
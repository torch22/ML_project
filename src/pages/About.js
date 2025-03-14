import { motion } from 'framer-motion';
import '../styles/About.css';
import Footer from '../components/Footer';

function About() {
  const timelineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="about-wrapper">
      <motion.div className="about-hero">
        <motion.div className="about-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h1>Insight Factory</h1>
          <p>Наша платформа создана для упрощения процесса внедрения ИИ-технологий в бизнес и научные проекты.
            Мы предлагаем полный спектр инструментов, необходимых для эффективного развертывания, мониторинга и анализа производительности ваших моделей.</p>
        </motion.div>
      </motion.div>
      <motion.div
        className="timeline-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        <h2>Наша история</h2>
        <div className="timeline">
          <motion.div className="timeline-item" variants={timelineVariants}>
            <div className="timeline-content">
              <h3>2024</h3>
              <p>Основание Insight Factory.</p>
            </div>
          </motion.div>
          <motion.div className="timeline-item" variants={timelineVariants}>
            <div className="timeline-content">
              <h3>2024</h3>
              <p>Исключение Постникова.</p>
            </div>
          </motion.div>
          <motion.div className="timeline-item" variants={timelineVariants}>
            <div className="timeline-content">
              <h3>2025</h3>
              <p>Переход на react.js.</p>
            </div>
          </motion.div>
          <motion.div className="timeline-item" variants={timelineVariants}>
            <div className="timeline-content">
              <h3>2026</h3>
              <p>Продажа проекта = много денег.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        className="team-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2>Наша команда</h2>
        <p>Профессионалы, посвящённые развитию ИИ-технологий.</p>
        <div className="team-grid">
          <div className="team-member">
            <div className="team-placeholder">Фото</div>
            <h3>Мясникова Елена</h3>
            <p>Тимлид, бэкенд</p>
          </div>
          <div className="team-member">
            <div className="team-placeholder">Фото</div>
            <h3>Булатов Данил</h3>
            <p>Фронтенд</p>
          </div>
          <div className="team-member">
            <div className="team-placeholder">Фото</div>
            <h3>Вэнго Валентин</h3>
            <p>Наполнение сайта</p>
          </div>
        </div>
      </motion.div>
      <Footer/>
    </div>
  );
}

export default About;
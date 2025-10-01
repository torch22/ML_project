import { motion } from 'framer-motion';
import '../styles/About.css';
 

function About() {
  const history = [
    { year: '2024', event: 'Основана команда с целью упростить доступ к ML-инструментам' },
    { year: '2025', event: 'Разработана первая версия проекта' },
    { year: '2026', event: 'Запуск проекта на комерческий уровень' },
  ];

  const team = [
    { name: 'Елена Мясникова', role: 'Тимлид, бэкенд' },
    { name: 'Данил Булатов', role: 'Фронтенд' },
    { name: 'Пустобаев Дмитрий', role: 'Бизнес аналитик' },
    { name: 'Рачёв Егор', role: 'Бизнес аналитик, бэкенд' },
    { name: 'Богданова Снежана', role: 'UX/UI дизайнер' },
  ];

  return (
    <div className="about-wrapper">
      <motion.div className="about-hero">
        <motion.div className="about-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h1>О нас</h1>
          <p>
            Это команда энтузиастов машинного обучения, стремящихся сделать технологии доступными каждому. Мы создаём инструменты, которые упрощают путь от первого датасета до продвинутого анализа и визуализации.
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

    </div>
  );
}

export default About;
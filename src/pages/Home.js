import { motion, useScroll, useTransform } from 'framer-motion';
import { FaBook, FaChartBar, FaUserFriends, FaLock, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/Home.css';

function Home({ onAuthClick }) {
  const { scrollY } = useScroll();
  const y2 = useTransform(scrollY, [0, 300], [0, -30], { clamp: true });
  const opacity = useTransform(scrollY, [0, 150], [1, 0.7]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="home-wrapper">
      <motion.div className="hero-section">
        <motion.div className="hero-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <motion.h2 style={{ y: y2, opacity }} className="parallax-text">
            От новичков до экспертов — начните прямо сейчас!
          </motion.h2>
          <Link to="/regression-chart">
            <motion.button
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Реализовать датасет
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
      <motion.div
        className="features-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        <h2>Наши преимущества</h2>
        <div className="features-grid">
          <motion.div className="feature-card" variants={cardVariants}>
            <FaBook className="feature-icon" />
            <h3>Обучающие Материалы</h3>
            <p>Доступ к обширной библиотеке материалов для обучения ИИ.</p>
          </motion.div>
          <motion.div className="feature-card" variants={cardVariants}>
            <FaChartBar className="feature-icon" />
            <h3>Точность в анализе данных</h3>
            <p>Высокая точность благодаря передовым алгоритмам.</p>
          </motion.div>
          <motion.div className="feature-card" variants={cardVariants}>
            <FaUserFriends className="feature-icon" />
            <h3>Интуитивный интерфейс</h3>
            <p>Простота использования для всех уровней пользователей.</p>
          </motion.div>
          <motion.div className="feature-card" variants={cardVariants}>
            <FaLock className="feature-icon" />
            <h3>Безопасность и масштабируемость</h3>
            <p>Надёжная защита данных и гибкость для роста.</p>
          </motion.div>
          <motion.div className="feature-card" variants={cardVariants}>
            <FaChartLine className="feature-icon" />
            <h3>Аналитика и мониторинг</h3>
            <p>Полный контроль над производительностью моделей.</p>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}

export default Home;
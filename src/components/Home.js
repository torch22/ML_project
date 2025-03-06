import React, { useState } from 'react';
import Navbar from './Navbar';
import AuthModal from './AuthModal';
import { motion } from 'framer-motion';
import { FaBook, FaChartBar, FaUserFriends, FaLock, FaChartLine } from 'react-icons/fa'; // Иконки для features
import '../styles/Home.css';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div>
      <Navbar onAuthClick={() => setIsModalOpen(true)} />
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <motion.div
        className="opis"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1>Наша платформа создана для упрощения процесса внедрения ИИ-технологий в бизнес и научные проекты.</h1>
        <h2>Мы предлагаем полный спектр инструментов, необходимых для эффективного развертывания, мониторинга и анализа производительности ваших моделей.</h2>
      </motion.div>
      <motion.div
        className="features"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        <motion.div className="feature-card" variants={cardVariants}>
          <FaBook /> <span>Обучающие Материалы</span>
        </motion.div>
        <motion.div className="feature-card" variants={cardVariants}>
          <FaChartBar /> <span>Точность В анализе Данных</span>
        </motion.div>
        <motion.div className="feature-card" variants={cardVariants}>
          <FaUserFriends /> <span>Интуитивно Понятный Интерфейс</span>
        </motion.div>
        <motion.div className="feature-card" variants={cardVariants}>
          <FaLock /> <span>Безопасность и Масштабируемость</span>
        </motion.div>
        <motion.div className="feature-card" variants={cardVariants}>
          <FaChartLine /> <span>Аналитика и Мониторинг</span>
        </motion.div>
      </motion.div>
      <motion.div
        className="data"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <button>Реализовать датасет</button>
      </motion.div>
    </div>
  );
}

export default Home;
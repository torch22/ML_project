import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Home.css';
import DatasetUploadModal from '../components/DatasetUploadModal';

function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="home-wrapper">
      <motion.section className="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <h1>Учитесь. Применяйте. Создавайте.</h1>
        <p>Машинное обучение доступно каждому. Начните с малого — загрузите свой датасет.</p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
        >
          Загрузить датасет
        </motion.button>
      </motion.section>

      <section className="features">
        {[
          { title: 'Обучение', desc: 'Пошаговые материалы по ML' },
          { title: 'Интерактив', desc: 'Работа с датасетами прямо в браузере' },
          { title: 'Профиль', desc: 'Персонализация, опыт, история' },
        ].map((f, i) => (
          <motion.div key={i} className="feature-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }}>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </motion.div>
        ))}
      </section>

      <DatasetUploadModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default Home;
import React from 'react';
import { motion } from 'framer-motion';
import { FaBookOpen } from 'react-icons/fa';
import '../styles/Materials.css';
import Footer from '../components/Footer';

function Materials() {
  const [activeCategory, setActiveCategory] = React.useState(null);

  const categories = [
    {
      title: 'С учителем',
      icon: <FaBookOpen />,
      links: [
        { label: 'Ферисия', url: 'ferisia.html' },
        { label: 'Классификация', url: 'classification.html' },
      ],
    },
    {
      title: 'Без учителя',
      icon: <FaBookOpen />,
      links: [
        { label: 'Кластеризация', url: 'clustering.html' },
        { label: 'Поиск правил', url: 'rule_search.html' },
        { label: 'Уменьшение размерности', url: 'dimensionality_reduction.html' },
      ],
    },
  ];

  const toggleCategory = (index) => {
    setActiveCategory(activeCategory === index ? null : index);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="materials-wrapper">
      <motion.div className="materials-hero">
        <motion.div className="materials-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h1>Обучающие Материалы</h1>
          <p>Изучите наши ресурсы для освоения ИИ-технологий.</p>
        </motion.div>
      </motion.div>
      <motion.div
        className="categories-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className={`category-card ${activeCategory === index ? 'active' : ''}`}
            variants={cardVariants}
            onClick={() => toggleCategory(index)}
          >
            <div className="category-header">
              <div className="category-icon">{category.icon}</div>
              <h3>{category.title}</h3>
            </div>
            {activeCategory === index && (
              <motion.div
                className="category-content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <ul className="clickable-list">
                  {category.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href={link.url}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
            {index < categories.length - 1 && <div className="category-separator" />}
          </motion.div>
        ))}
      </motion.div>
      <Footer />
    </div>
  );
}

export default Materials;
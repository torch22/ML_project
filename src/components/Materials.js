import React, { useState } from 'react';
import Navbar from './Navbar';
import AuthModal from './AuthModal';
import { motion } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa'; // Иконки для аккордеона
import '../styles/Materials.css';

function Materials() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeAccordions, setActiveAccordions] = useState({});
  const [activeNestedAccordions, setActiveNestedAccordions] = useState({});

  const toggleAccordion = (index) => {
    setActiveAccordions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleNestedAccordion = (index) => {
    setActiveNestedAccordions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const accordionVariants = {
    hidden: { 
      height: 0, 
      opacity: 0 
    },
    visible: { 
      height: 'auto', 
      opacity: 1, 
      transition: { 
        duration: 0.4, 
        ease: 'easeInOut' 
      }
    },
  };

  return (
    <div>
      <Navbar onAuthClick={() => setIsModalOpen(true)} />
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="content">
        <h1>Обучающие Материалы</h1>
        <div className="accordion">
          <div className="accordion-item">
            <motion.div
              className={`accordion-header ${activeAccordions[0] ? 'active' : ''}`}
              onClick={() => toggleAccordion(0)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <span>Классическое обучение</span>
              {activeAccordions[0] ? <FaMinus /> : <FaPlus />}
            </motion.div>
            <motion.div
              className="accordion-content"
              variants={accordionVariants}
              initial="hidden"
              animate={activeAccordions[0] ? 'visible' : 'hidden'}
            >
              <div className="accordion nested">
                <div className="nested-accordion-item">
                  <motion.div
                    className={`nested-accordion-header ${activeNestedAccordions[0] ? 'active' : ''}`}
                    onClick={() => toggleNestedAccordion(0)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>С учителем</span>
                    {activeNestedAccordions[0] ? <FaMinus /> : <FaPlus />}
                  </motion.div>
                  <motion.div
                    className="nested-accordion-content"
                    variants={accordionVariants}
                    initial="hidden"
                    animate={activeNestedAccordions[0] ? 'visible' : 'hidden'}
                  >
                    <ul className="clickable-list">
                      <li><a href="ferisia.html">Ферисия</a></li>
                      <li><a href="classification.html">Классификация</a></li>
                    </ul>
                  </motion.div>
                </div>
                <div className="nested-accordion-item">
                  <motion.div
                    className={`nested-accordion-header ${activeNestedAccordions[1] ? 'active' : ''}`}
                    onClick={() => toggleNestedAccordion(1)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>Без учителя</span>
                    {activeNestedAccordions[1] ? <FaMinus /> : <FaPlus />}
                  </motion.div>
                  <motion.div
                    className="nested-accordion-content"
                    variants={accordionVariants}
                    initial="hidden"
                    animate={activeNestedAccordions[1] ? 'visible' : 'hidden'}
                  >
                    <ul className="clickable-list">
                      <li><a href="clustering.html">Кластеризация</a></li>
                      <li><a href="rule_search.html">Поиск правил</a></li>
                      <li><a href="dimensionality_reduction.html">Уменьшение размерности</a></li>
                    </ul>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Materials;
import React, { useState } from 'react';
import '../styles/Materials.css';

const materials = [
  {
    title: 'С учителем',
    description: 'Методы, основанные на размеченных данных.',
    topics: [
      { label: 'Регрессия', url: '#' },
      { label: 'Классификация', url: '#' },
    ],
  },
  {
    title: 'Без учителя',
    description: 'Методы, находящие скрытые закономерности в данных.',
    topics: [
      { label: 'Кластеризация', url: '#' },
      { label: 'Уменьшение размерности', url: '#' },
    ],
  },
  {
    title: 'Полу-обучение',
    description: 'Комбинирование размеченных и неразмеченных данных.',
    topics: [
      { label: 'Pseudolabeling', url: '#' },
      { label: 'Consistency Training', url: '#' },
    ],
  },
];

function Materials() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="materials-wrapper">
      <h1>Обучающие материалы</h1>
      <p className="subtitle">Изучите различные подходы к машинному обучению</p>

      <div className="materials-grid">
        {materials.map((category, index) => (
          <div
            key={index}
            className={`material-card ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggle(index)}
          >
            <h2>{category.title}</h2>
            <p>{category.description}</p>

            {activeIndex === index && (
              <ul className="material-list">
                {category.topics.map((topic, idx) => (
                  <li key={idx}>
                    <a href={topic.url}>{topic.label}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Materials;
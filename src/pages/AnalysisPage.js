import React, { useEffect, useState } from 'react';
import '../styles/AnalysisPage.css';

function AnalysisPage() {
  const [datasetHistory, setDatasetHistory] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const rawHistory = JSON.parse(localStorage.getItem('datasetHistory')) || [];

    // Удаляем повторы по fileName, оставляем последние
    const unique = [];
    const seen = new Set();
    for (let i = rawHistory.length - 1; i >= 0; i--) {
      const entry = rawHistory[i];
      if (!seen.has(entry.fileName)) {
        unique.unshift(entry);
        seen.add(entry.fileName);
      }
    }

    setDatasetHistory(unique);
    if (unique.length > 0) setSelected(unique[0]); // по умолчанию — последний
  }, []);

  const handleSelectChange = (e) => {
    const file = datasetHistory.find(d => d.fileName === e.target.value);
    setSelected(file);
  };

  return (
    <div className="analysis-page">
      <h1>Результаты анализа</h1>

      {datasetHistory.length > 1 && (
        <div className="dataset-select">
          <label htmlFor="datasetPicker">Выберите датасет:</label>
          <select id="datasetPicker" onChange={handleSelectChange} value={selected?.fileName || ''}>
            {datasetHistory.map((item, idx) => (
              <option key={idx} value={item.fileName}>
                {item.fileName} — {item.timestamp}
              </option>
            ))}
          </select>
        </div>
      )}

      {selected ? (
        <>
          <div className="dataset-summary">
            <p><strong>Файл:</strong> {selected.fileName}</p>
            <p><strong>Размер:</strong> {selected.sizeKB} КБ</p>
            <p><strong>Дата загрузки:</strong> {selected.timestamp}</p>
          </div>

          <div className="metrics-grid">
            <div className="metric-card"><span className="metric-label">MAE</span><span className="metric-value">1.23</span></div>
            <div className="metric-card"><span className="metric-label">RMSE</span><span className="metric-value">2.45</span></div>
            <div className="metric-card"><span className="metric-label">R²</span><span className="metric-value">0.87</span></div>
          </div>

          <div className="graph-section">
            <h3>График предсказаний</h3>
            <div className="graph-placeholder">[График по {selected.fileName}]</div>
          </div>

          <div className="recommendations">
            <h3>Рекомендации</h3>
            <p>Модель демонстрирует хорошие результаты. Попробуйте улучшить качество, нормализовав данные и исключив выбросы.</p>
          </div>
        </>
      ) : (
        <p className="empty-message">Нет загруженных датасетов.</p>
      )}
    </div>
  );
}

export default AnalysisPage;
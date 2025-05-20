import React, { useState } from 'react';
import '../styles/UploadPage.css';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;
    setAnalyzing(true);

    // Имитация анализа
    setTimeout(() => {
      window.location.href = '/analysis'; // Переход на страницу анализа
    }, 2000);
  };

  return (
    <div className="upload-page-wrapper">
      {!analyzing ? (
        <div className="upload-box">
          <h2>Загрузка датасета</h2>
          <input type="file" accept=".csv,.tsv,.json,.xlsx" onChange={handleFileChange} />
          <button onClick={handleUpload} disabled={!file}>
            Загрузить
          </button>
        </div>
      ) : (
        <div className="loading">
          <div className="spinner" />
          <p>Анализируем датасет...</p>
        </div>
      )}
    </div>
  );
}

export default UploadPage;
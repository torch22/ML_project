import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Modal.css';

function DatasetUploadModal({ isOpen, onClose }) {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const isAuthorized = !!localStorage.getItem('user');

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleFileClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file || !isAuthorized) return;

    const prevHistory = JSON.parse(localStorage.getItem('datasetHistory')) || [];
    const alreadyExists = prevHistory.some(entry => entry.fileName === file.name);

    if (!alreadyExists) {
      const newEntry = {
        fileName: file.name,
        sizeKB: (file.size / 1024).toFixed(1),
        timestamp: new Date().toLocaleString(),
        type: file.type,
      };
      const updatedHistory = [...prevHistory, newEntry];
      localStorage.setItem('datasetHistory', JSON.stringify(updatedHistory));
    }

    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      onClose();
      window.location.href = '/analysis';
    }, 2000);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setFile(null);
      setAnalyzing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div
        className="modal"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        ref={modalRef}
      >
        {!analyzing ? (
          <>
            <h2>Загрузка датасета</h2>

            <div className="drop-zone" onClick={handleFileClick}>
              {file ? (
                <span>{file.name}</span>
              ) : (
                <span>
                  Перетащите файл сюда или нажмите для выбора<br />
                  (CSV, TSV, JSON, XLSX)
                </span>
              )}
              <input
                type="file"
                accept=".csv,.tsv,.json,.xlsx"
                ref={inputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>

            {file && !isAuthorized && (
              <p className="auth-warning">
                Чтобы загрузить датасет, пожалуйста,{' '}
                <span
                  className="auth-link"
                  onClick={() => {
                    onClose();
                    navigate('/auth');
                  }}
                >
                  войдите или зарегистрируйтесь
                </span>
              </p>
            )}

            <div className="modal-buttons">
              <button onClick={onClose}>Отмена</button>
              <button onClick={handleUpload} disabled={!file || !isAuthorized}>
                Загрузить
              </button>
            </div>
          </>
        ) : (
          <div className="loading">
            <div className="spinner" />
            <p>Анализируем датасет...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DatasetUploadModal;
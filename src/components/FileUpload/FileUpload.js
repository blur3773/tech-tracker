import React, { useRef } from 'react';
import './FileUpload.css';

const FileUpload = ({ onFileLoad, onExport }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = JSON.parse(e.target.result);
        onFileLoad(content);
        alert('Дорожная карта успешно загружена!');
      } catch (error) {
        alert('Ошибка: Неверный формат файла. Пожалуйста, выберите корректный JSON файл.');
      }
    };
    reader.readAsText(file);
    
    // Сбрасываем значение input чтобы можно было загрузить тот же файл снова
    event.target.value = '';
  };

  const handleExport = () => {
    onExport();
  };

  return (
    <div className="file-upload-container">
      <div className="file-upload-info">
        <h3>Управление дорожными картами</h3>
        <p>Загрузите свою дорожную карту или экспортируйте текущий прогресс</p>
      </div>
      
      <div className="file-upload-buttons">
        <input
          type="file"
          accept=".json"
          onChange={handleFileSelect}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <button 
          className="btn btn-primary"
          onClick={() => fileInputRef.current?.click()}
        >
          📁 Загрузить свою карту
        </button>
        <button 
          className="btn btn-secondary"
          onClick={handleExport}
        >
          💾 Экспортировать прогресс
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
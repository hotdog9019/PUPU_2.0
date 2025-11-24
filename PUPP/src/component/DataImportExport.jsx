// src/component/DataImportExport.jsx
import { useState } from 'react';

function DataImportExport({ technologies, setTechnologies }) {
  const [status, setStatus] = useState('');

  // Экспорт
  const handleExport = () => {
    const exportData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      technologies: technologies,
      stats: {
        total: technologies.length,
        completed: technologies.filter(t => t.status === 'completed').length,
        inProgress: technologies.filter(t => t.status === 'in-progress').length
      }
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tech-tracker-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setStatus(`Экспортировано ${technologies.length} технологий`);
  };

  // Импорт
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        if (!importedData.technologies || !Array.isArray(importedData.technologies)) {
          throw new Error('Неверный формат файла');
        }

        const validTechnologies = importedData.technologies
          .filter(tech => tech && tech.title && tech.description)
          .map(tech => ({
            ...tech,
            id: tech.id || Date.now() // гарантируем уникальный ID
          }));

        if (validTechnologies.length === 0) {
          throw new Error('Нет валидных технологий');
        }

        setTechnologies(prev => {
          const existingIds = new Set(prev.map(t => t.id));
          const newTechs = validTechnologies.filter(t => !existingIds.has(t.id));
          return [...prev, ...newTechs];
        });

        setStatus(`Импортировано ${validTechnologies.length} технологий`);
      } catch (error) {
        setStatus(`Ошибка импорта: ${error.message}`);
      }
    };
    reader.onerror = () => setStatus('Ошибка чтения файла');
    reader.readAsText(file);
    event.target.value = '';
  };

  // Тестовая технология
  const addSampleTechnology = () => {
    const newTech = {
      id: Date.now(),
      title: `Технология ${technologies.length + 1}`,
      description: 'Описание для демонстрации',
      status: 'not-started',
      category: 'other',
      createdAt: new Date().toISOString()
    };
    setTechnologies(prev => [...prev, newTech]);
    setStatus('Добавлена тестовая технология');
  };

  // Очистка
  const clearAllData = () => {
    setTechnologies([]);
    localStorage.removeItem('techTrackerData');
    setStatus('Все данные очищены');
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '20px auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2>Импорт и экспорт</h2>

      {status && (
        <div style={{
          padding: '10px',
          margin: '10px 0',
          backgroundColor: status.includes('Ошибка') ? '#ffebee' : '#e8f5e8',
          border: `1px solid ${status.includes('Ошибка') ? '#f44336' : '#4caf50'}`,
          borderRadius: '4px'
        }}>
          {status}
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <button onClick={addSampleTechnology} style={{ padding: '8px 12px', backgroundColor: '#2196f3', color: 'white', border: 'none', borderRadius: '4px' }}>
          + Тестовая технология
        </button>
        <button onClick={handleExport} disabled={!technologies.length} style={{ padding: '8px 12px', backgroundColor: technologies.length ? '#4caf50' : '#ccc', color: 'white', border: 'none', borderRadius: '4px' }}>
          📥 Экспорт ({technologies.length})
        </button>
        <label style={{ padding: '8px 12px', backgroundColor: '#ff9800', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>
          📤 Импорт
          <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
        </label>
        <button onClick={clearAllData} disabled={!technologies.length} style={{ padding: '8px 12px', backgroundColor: technologies.length ? '#f44336' : '#ccc', color: 'white', border: 'none', borderRadius: '4px' }}>
          🗑️ Очистить
        </button>
      </div>
    </div>
  );
}

export default DataImportExport;
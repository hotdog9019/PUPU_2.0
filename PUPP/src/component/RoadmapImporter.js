// components/RoadmapImporter.js
import { useState } from 'react';
import useTechnologiesApi from '../component/hooks/useTechnologiesApi';

function RoadmapImporter() {
  const { technologies, loading, error, addTechnology } = useTechnologiesApi();
  const [importing, setImporting] = useState(false);

  const handleImportRoadmap = async (roadmapUrl) => {
    try {
      setImporting(true);
      
      // Имитация загрузки дорожной карты из API
      const response = await fetch(roadmapUrl);
      if (!response.ok) throw new Error('Не удалось загрузить дорожную карту');
      
      const roadmapData = await response.json();
      
      // Добавляем каждую технологию из дорожной карты
      for (const tech of roadmapData.technologies) {
        await addTechnology(tech);
      }
      
      alert(`Успешно импортировано ${roadmapData.technologies.length} технологий`);
      
    } catch (err) {
      alert(`Ошибка импорта: ${err.message}`);
    } finally {
      setImporting(false);
    }
  };

  const handleExampleImport = () => {
    // Пример импорта из фиктивного API
    handleImportRoadmap('https://api.example.com/roadmaps/frontend');
  };

  return (
    <div className="roadmap-importer">
      <h3>Импорт дорожной карты</h3>
      
      <div className="import-actions">
        <button 
          onClick={handleExampleImport}
          disabled={importing}
          className="import-button"
        >
          {importing ? 'Импорт...' : 'Импорт пример дорожной карты'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
}

export default RoadmapImporter;
// components/RoadmapImporter.js
import { useState } from 'react';

function RoadmapImporter({ addTechnology, refetch }) {
  const [importing, setImporting] = useState(false);
  const [importedCount, setImportedCount] = useState(0);

  const handleImportRoadmap = async (roadmapData) => {
    try {
      setImporting(true);
      
      let technologiesToImport = [];
      
      // Если переданы готовые данные
      if (roadmapData.technologies) {
        technologiesToImport = roadmapData.technologies;
      } 
      // Если передан URL (для будущего расширения)
      else if (typeof roadmapData === 'string' && roadmapData.includes('example.com')) {
        technologiesToImport = [
          { title: 'HTML', description: 'Язык разметки', category: 'frontend', difficulty: 'beginner', resources: [] },
          { title: 'CSS', description: 'Каскадные таблицы стилей', category: 'frontend', difficulty: 'beginner', resources: [] },
          { title: 'JavaScript', description: 'Язык программирования', category: 'frontend', difficulty: 'intermediate', resources: [] },
          { title: 'React', description: 'Библиотека для интерфейсов', category: 'frontend', difficulty: 'intermediate', resources: [] },
          { title: 'Node.js', description: 'Серверный JavaScript', category: 'backend', difficulty: 'intermediate', resources: [] }
        ];
      }
      
      // Добавляем каждую технологию
      let successCount = 0;
      for (const tech of technologiesToImport) {
        try {
          await addTechnology(tech);
          successCount++;
        } catch (err) {
          console.error(`Ошибка добавления ${tech.title}:`, err);
        }
      }
      
      setImportedCount(successCount);
      alert(`Успешно импортировано ${successCount} технологий`);
      
      // Обновляем список
      if (refetch) {
        setTimeout(() => refetch(), 300);
      }
      
    } catch (err) {
      console.error('Ошибка импорта:', err);
      alert(`Ошибка импорта: ${err.message}`);
    } finally {
      setImporting(false);
    }
  };

  const handleExampleImport = () => {
    const exampleData = {
      technologies: [
        { title: 'HTML', description: 'Язык разметки веб-страниц', category: 'frontend', difficulty: 'beginner', resources: ['https://html.spec.whatwg.org/'] },
        { title: 'CSS', description: 'Стилизация веб-страниц', category: 'frontend', difficulty: 'beginner', resources: ['https://www.w3.org/Style/CSS/'] },
        { title: 'JavaScript', description: 'Язык программирования для веб-разработки', category: 'frontend', difficulty: 'intermediate', resources: ['https://developer.mozilla.org/ru/docs/Web/JavaScript'] },
        { title: 'React', description: 'Библиотека для создания пользовательских интерфейсов', category: 'frontend', difficulty: 'intermediate', resources: ['https://react.dev'] },
        { title: 'Node.js', description: 'Среда выполнения JavaScript на сервере', category: 'backend', difficulty: 'intermediate', resources: ['https://nodejs.org'] }
      ]
    };
    handleImportRoadmap(exampleData);
  };

  const handleLocalImport = () => {
    const localData = {
      technologies: [
        { title: 'Vue.js', description: 'Прогрессивный фреймворк', category: 'frontend', difficulty: 'intermediate', resources: ['https://vuejs.org/'] },
        { title: 'Angular', description: 'Платформа для веб-приложений', category: 'frontend', difficulty: 'advanced', resources: ['https://angular.io/'] },
        { title: 'TypeScript', description: 'Статически типизированное надмножество JavaScript', category: 'language', difficulty: 'intermediate', resources: ['https://www.typescriptlang.org/'] },
        { title: 'GraphQL', description: 'Язык запросов для API', category: 'api', difficulty: 'advanced', resources: ['https://graphql.org/'] }
      ]
    };
    handleImportRoadmap(localData);
  };

  return (
    <div className="roadmap-importer">
      <div className="import-actions">
        <button 
          onClick={handleExampleImport}
          disabled={importing}
          className="import-button"
        >
          {importing ? 'Импорт...' : '📥 Импорт Frontend Roadmap'}
        </button>
        
        <button 
          onClick={handleLocalImport}
          disabled={importing}
          className="import-button"
          style={{ marginLeft: '10px' }}
        >
          {importing ? 'Импорт...' : '📥 Импорт Advanced Tech'}
        </button>
        
        <button 
          onClick={refetch}
          disabled={importing}
          className="refresh-btn"
          style={{ marginLeft: '10px' }}
        >
          {importing ? 'Загрузка...' : '🔄 Обновить список'}
        </button>
      </div>
      
      {importedCount > 0 && (
        <div style={{ marginTop: '10px', color: 'green' }}>
          ✅ Последний импорт: {importedCount} технологий
        </div>
      )}
    </div>
  );
}

export default RoadmapImporter;
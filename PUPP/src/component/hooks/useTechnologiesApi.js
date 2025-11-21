// hooks/useTechnologiesApi.js
import { useState, useEffect } from 'react';

function useTechnologiesApi() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка технологий из API
  const fetchTechnologies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // В реальном приложении здесь будет запрос к вашему API
      // Сейчас имитируем задержку загрузки
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Получаем данные из localStorage (если есть)
      const savedTechnologies = localStorage.getItem('importedTechnologies');
      
      let mockTechnologies = [];
      
      if (savedTechnologies) {
        // Используем сохраненные технологии
        mockTechnologies = JSON.parse(savedTechnologies);
      } else {
        // Базовые mock данные
        mockTechnologies = [
          {
            id: 1,
            title: 'React',
            description: 'Библиотека для создания пользовательских интерфейсов',
            category: 'frontend',
            difficulty: 'beginner',
            resources: ['https://react.dev', 'https://ru.reactjs.org']
          },
          {
            id: 2,
            title: 'Node.js',
            description: 'Среда выполнения JavaScript на сервере',
            category: 'backend',
            difficulty: 'intermediate',
            resources: ['https://nodejs.org', 'https://nodejs.org/ru/docs/']
          },
          {
            id: 3,
            title: 'TypeScript',
            description: 'Типизированное надмножество JavaScript',
            category: 'language',
            difficulty: 'intermediate',
            resources: ['https://www.typescriptlang.org']
          }
        ];
        
        // Сохраняем базовые данные
        localStorage.setItem('importedTechnologies', JSON.stringify(mockTechnologies));
      }
      
      setTechnologies(mockTechnologies);
      
    } catch (err) {
      setError('Не удалось загрузить технологии');
      console.error('Ошибка загрузки:', err);
    } finally {
      setLoading(false);
    }
  };

  // Добавление новой технологии
  const addTechnology = async (techData) => {
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newTech = {
        id: Date.now(), // В реальном приложении ID генерируется на сервере
        ...techData,
        createdAt: new Date().toISOString()
      };
      
      // Обновляем состояние
      setTechnologies(prev => [...prev, newTech]);
      
      // Сохраняем в localStorage
      const updatedTechnologies = [...technologies, newTech];
      localStorage.setItem('importedTechnologies', JSON.stringify(updatedTechnologies));
      
      return newTech;
      
    } catch (err) {
      throw new Error('Не удалось добавить технологию');
    }
  };

  // Загружаем технологии при монтировании
  useEffect(() => {
    fetchTechnologies();
  }, []);

  return {
    technologies,
    loading,
    error,
    refetch: fetchTechnologies,
    addTechnology
  };
}

export default useTechnologiesApi;
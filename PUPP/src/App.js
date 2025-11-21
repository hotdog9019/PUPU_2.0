// App.js
import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Greeting from '../src/component/Greeting';
import UserCard from '../src/component/UseCard';
import TaskList from '../src/component/TaskList';
import TechnologyCard from '../src/component/TechologyCard.jsx';
import ProgressHeader from '../src/component/ProgressHeader.jsx';
import UserSettings from '../src/component/UserSettings.jsx';
import SimpleModalExample from '../src/component/SimpleModalExample.jsx';
import ProgressDashboard from '../src/component/ProgressDashboard.jsx';
import WindowSizeTracker from '../src/component/WindowSizeTracker';
import UserProfile from '../src/component/UserProfile';
import ContactForm from '../src/component/ContactForm';
import Counter from '../src/component/Counter';
import RegistrationForm from '../src/component/RegistrationForm';
import ColorPicker from '../src/component/ColorPicker';
import useTechnologiesApi from '../src/component/hooks/useTechnologiesApi';
import RoadmapImporter from '../src/component/RoadmapImporter';
import TechnologyList from '../src/pages/TechnologyList.js';
const POSSIBLE_STATUSES = ['not-started', 'in-progress', 'completed'];

const statusToProgress = (status) => {
  switch (status) {
    case 'completed': return 100;
    case 'in-progress': return 50;
    case 'not-started': return 0;
    default: return 0;
  }
};

function App() {
  const { technologies: apiTechnologies, loading, error, refetch, addTechnology } = useTechnologiesApi();

  const [localTechnologies, setLocalTechnologies] = useState([
    { id: 1, title: 'React Components ', description: 'Изучение базовых компонентов', status: 'completed' },
    { id: 2, title: 'JSX Syntax ', description: 'Освоение синтаксиса JSX', status: 'in-progress' },
    { id: 3, title: 'State Management ', description: 'Работа с состоянием компонентов', status: 'not-started' }
  ]);

  // Объединяем локальные технологии и технологии из API
  const allTechnologies = useMemo(() => {
    // Преобразуем API технологии в формат для отображения
    const apiTechWithStatus = apiTechnologies.map(tech => ({
      ...tech,
      status: 'not-started' // По умолчанию для импортированных технологий
    }));
    
    return [...localTechnologies, ...apiTechWithStatus];
  }, [localTechnologies, apiTechnologies]);

  const handleAddTechnology = async (techData) => {
    try {
      // Добавляем через API хук
      const newTech = await addTechnology(techData);
      
      // Также добавляем в локальное состояние для немедленного отображения
      setLocalTechnologies(prev => [
        ...prev,
        { 
          ...newTech, 
          status: 'not-started',
          id: newTech.id || Date.now()
        }
      ]);
      
      return newTech;
    } catch (err) {
      console.error('Ошибка добавления технологии:', err);
      throw err;
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setLocalTechnologies(prev =>
      prev.map(tech => (tech.id === id ? { ...tech, status: newStatus } : tech))
    );
  };

  const randomizeAllStatuses = () => {
    setLocalTechnologies(prev =>
      prev.map(tech => {
        const randomStatus = POSSIBLE_STATUSES[Math.floor(Math.random() * POSSIBLE_STATUSES.length)];
        return { ...tech, status: randomStatus };
      })
    );
  };

  const progressData = useMemo(() => {
    const techProgress = allTechnologies.map(tech => ({
      id: tech.id,
      title: tech.title,
      progress: statusToProgress(tech.status)
    }));

    const overall = techProgress.length > 0 
      ? Math.round(techProgress.reduce((sum, t) => sum + t.progress, 0) / techProgress.length)
      : 0;

    const frontendProgress = techProgress.find(t => t.title.toLowerCase().includes('react'))?.progress || 0;
    const backendProgress = techProgress.find(t => t.title.toLowerCase().includes('node'))?.progress || 0;
    const databaseProgress = techProgress.find(t => t.title.toLowerCase().includes('typescript'))?.progress || 0;

    return {
      overall,
      frontendProgress,
      backendProgress,
      databaseProgress
    };
  }, [allTechnologies]);

  if (loading) {
    return (
      <Router>
        <div className="app-loading">
          <div className="spinner"></div>
          <p>Загрузка технологий...</p>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className="app">
        {/* Навигационное меню */}
        <nav className="main-nav">
          <div className="nav-brand">
            <h2>Мое Приложение</h2>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <Link to="/about">О нас</Link>
            </li>
            <li>
              <Link to="/contact">Контакты</Link>
            </li>
          </ul>
        </nav>
        
        <Greeting />
        <UserCard
          name="Артём и Саня"
          role="Администратор"
          avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfVMhpKmVy_-iwfRLAiNiaDslMa-2oEz7KTw&s"
          isOnline={true}
        />

        {/* Основное содержимое */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <>
                {/* Оригинальная версия с заголовком и кнопкой обновления */}
                <header className="app-header">
                  <h1>🚀 Трекер изучения технологий</h1>
                  <button onClick={refetch} className="refresh-btn">
                    Обновить
                  </button>
                </header>

                {error && (
                  <div className="app-error">
                    <p>{error}</p>
                    <button onClick={refetch}>Попробовать снова</button>
                  </div>
                )}

                <main className="app-main">
                  {/* Импорт технологий */}
                  <div className="roadmap-importer-section">
                    <h3>Импорт дорожной карты</h3>
                    <RoadmapImporter 
                      addTechnology={handleAddTechnology}
                      refetch={refetch}
                    />
                  </div>

                  {/* Все технологии (локальные + API) */}
                  <div className="technology-list">
                    <h3>Все технологии ({allTechnologies.length}):</h3>
                    
                    {allTechnologies.map(tech => (
                      <TechnologyCard
                        key={tech.id}
                        title={tech.title}
                        description={tech.description}
                        status={tech.status}
                        onStatusChange={(newStatus) => handleStatusChange(tech.id, newStatus)}
                        category={tech.category}
                        difficulty={tech.difficulty}
                      />
                    ))}
                    
                    {/* Кнопка случайного прогресса */}
                    <button
                      onClick={randomizeAllStatuses}
                      style={{
                        margin: '20px 0',
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#000000ff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      Случайный прогресс
                    </button>

                    <ProgressDashboard
                      overallProgress={progressData.overall}
                      frontendProgress={progressData.frontendProgress}
                      backendProgress={progressData.backendProgress}
                      databaseProgress={progressData.databaseProgress}
                    />

                    <Counter />
                    <RegistrationForm />
                    <ColorPicker />
                    <WindowSizeTracker />
                    <UserProfile />
                    <ContactForm />
                    <UserSettings />
                    <SimpleModalExample />
                  </div>
                </main>
              </>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
// App.js
import React, { useState, useMemo } from 'react';
import 'C:/Users/v317admin/Pupu/src2/pupup/src/App.css';
import Greeting from 'C:/Users/v317admin/Pupu/src2/pupup/src/component/Greeting';
import UserCard from 'C:/Users/v317admin/Pupu/src2/pupup/src/component/UseCard';
import TaskList from 'C:/Users/v317admin/Pupu/src2/pupup/src/component/TaskList';
import TechnologyCard from 'C:/Users/v317admin/Pupu/src2/pupup/src/component/TechologyCard.jsx';
import ProgressHeader from 'C:/Users/v317admin/Pupu/src2/pupup/src/component/ProgressHeader';
import UserSettings from 'C:/Users/v317admin/Pupu/src2/pupup/src/component/UserSettings.jsx';
import SimpleModalExample from 'C:/Users/v317admin/Pupu/src2/pupup/src/component/SimpleModalExample.jsx';
import ProgressDashboard from 'C:/Users/v317admin/Pupu/src2/pupup/src/component/ProgressDashboard.jsx';
import WindowSizeTracker from 'C:/Users/v317admin/Pupu/src2/pupup/src/component/WindowSizeTracker';
import UserProfile from 'C:/Users/v317admin/Pupu/src2/pupup/src/component/UserProfile';
import ContactForm from 'C:/Users/v317admin/Pupu/src2/pupup/src/component/ContactForm';
import Counter from 'C:/Users/v317admin/Pupu/src2/pupup/src/component/Counter';
import RegistrationForm from 'C:/Users/v317admin/Pupu/src2/pupup/src/component/RegistrationForm';
import ColorPicker from 'C:/Users/v317admin/Pupu/src2/pupup/src/component/ColorPicker';

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
  const [technologies, setTechnologies] = useState([
    { id: 1, title: 'React Components ', description: 'Изучение базовых компонентов', status: 'completed' },
    { id: 2, title: 'JSX Syntax ', description: 'Освоение синтаксиса JSX', status: 'in-progress' },
    { id: 3, title: 'State Management ', description: 'Работа с состоянием компонентов', status: 'not-started' }
  ]);

  const handleStatusChange = (id, newStatus) => {
    setTechnologies(prev =>
      prev.map(tech => (tech.id === id ? { ...tech, status: newStatus } : tech))
    );
  };

  const randomizeAllStatuses = () => {
    setTechnologies(prev =>
      prev.map(tech => {
        const randomStatus = POSSIBLE_STATUSES[Math.floor(Math.random() * POSSIBLE_STATUSES.length)];
        return { ...tech, status: randomStatus };
      })
    );
  };

  const progressData = useMemo(() => {
    const techProgress = technologies.map(tech => ({
      id: tech.id,
      title: tech.title,
      progress: statusToProgress(tech.status)
    }));

    const overall = Math.round(
      techProgress.reduce((sum, t) => sum + t.progress, 0) / techProgress.length
    );

    const frontendProgress = techProgress.find(t => t.id === 1)?.progress || 0;
    const backendProgress = techProgress.find(t => t.id === 2)?.progress || 0;
    const databaseProgress = techProgress.find(t => t.id === 3)?.progress || 0;

    return {
      overall,
      frontendProgress,
      backendProgress,
      databaseProgress
    };
  }, [technologies]);

  return (
    <div className="App">
      <Greeting />
      
      <UserCard
        name="Артём и Саня"
        role="Администратор"
        avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfVMhpKmVy_-iwfRLAiNiaDslMa-2oEz7KTw&s"
        isOnline={true}
      />

      <div className="technology-list">
        {technologies.map(tech => (
          <TechnologyCard
            key={tech.id}
            title={tech.title}
            description={tech.description}
            status={tech.status}
            onStatusChange={(newStatus) => handleStatusChange(tech.id, newStatus)}
          />
        ))}

        {}
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
    </div>
  );
}

export default App;
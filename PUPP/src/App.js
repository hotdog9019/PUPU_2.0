// src/App.js
import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Box,
  Container,
  Button
} from '@mui/material';
import { List as ListIcon, Dashboard as DashboardIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { theme } from './styles/theme'; 


import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Greeting from './component/Greeting';
import UserCard from './component/UseCard';
import Counter from './component/Counter';
import RegistrationForm from './component/RegistrationForm';
import ColorPicker from './component/ColorPicker';
import WindowSizeTracker from './component/WindowSizeTracker';
import UserProfile from './component/UserProfile';
import ContactForm from './component/ContactForm';
import UserSettings from './component/UserSettings';
import SimpleModalExample from './component/SimpleModalExample';



import SimpleTechCard from './component/SimpleTechCard';
import Dashboard from './component/Dashboard';
import DataImportExport from './component/DataImportExport';
import useTechnologiesApi from './component/hooks/useTechnologiesApi';


console.log('SimpleTechCard:', SimpleTechCard);
const POSSIBLE_STATUSES = ['not-started', 'in-progress', 'completed'];

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const { technologies: apiTechnologies, loading, error, refetch } = useTechnologiesApi();

  const [localTechnologies, setLocalTechnologies] = useState([
    { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'completed' },
    { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'in-progress' },
    { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'not-started' }
  ]);

  const allTechnologies = useMemo(() => {
    const apiTechWithStatus = apiTechnologies.map(tech => ({
      ...tech,
      status: 'not-started'
    }));
    return [...localTechnologies, ...apiTechWithStatus];
  }, [localTechnologies, apiTechnologies]);
  const addLocalTechnology = (techData) => {
    const newTech = {
      id: Date.now(),
      ...techData,
      status: 'not-started',
      createdAt: new Date().toISOString()
    };
    setLocalTechnologies(prev => [...prev, newTech]);
  };
  const handleStatusChange = (id, newStatus) => {
    setLocalTechnologies(prev =>
      prev.map(tech => (tech.id === id ? { ...tech, status: newStatus } : tech))
    );
  };

  const [tabValue, setTabValue] = useState(0);

  if (loading) {
    return (
      <Router>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Typography variant="h6">Загрузка...</Typography>
        </div>
      </Router>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="app">
          {/* Навигация сайта */}
          <nav className="main-nav" style={{ padding: '10px', background: '#f5f5f5' }}>
            <div className="nav-brand">
              <h2>Мое Приложение</h2>
            </div>
            <ul className="nav-links" style={{ listStyle: 'none', display: 'flex', gap: '16px' }}>
              <li><Link to="/">Главная</Link></li>
              <li><Link to="/about">О нас</Link></li>
              <li><Link to="/contact">Контакты</Link></li>
            </ul>
          </nav>

          <Greeting />
          <UserCard
            name="Артём и Саня"
            role="Администратор"
            avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfVMhpKmVy_-iwfRLAiNiaDslMa-2oEz7KTw&s"
            isOnline={true}
          />

          <main className="main-content">
            <Routes>
              <Route path="/" element={
                <Container maxWidth="xl" sx={{ mt: 2 }}>
                  <header className="app-header">
                    <Typography variant="h4" gutterBottom>
                      🚀 Трекер изучения технологий
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<RefreshIcon />}
                      onClick={refetch}
                      size="small"
                    >
                      Обновить API
                    </Button>
                  </header>

                  {error && (
                    <Box sx={{ mb: 2, p: 1, bgcolor: 'error.light', borderRadius: 1 }}>
                      <Typography color="error">{error}</Typography>
                      <Button onClick={refetch} size="small">Повторить</Button>
                    </Box>
                  )}

                  {/* Табы: Список / Дашборд */}
                  <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 3 }}>
                    <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} aria-label="вкладки">
                      <Tab icon={<ListIcon />} label="Технологии" />
                      <Tab icon={<DashboardIcon />} label="Дашборд" />
                    </Tabs>
                  </AppBar>

                  {/* Вкладка: Список технологий */}
                  <TabPanel value={tabValue} index={0}>
                    {/* Кнопка добавления */}
                    <Box sx={{ textAlign: 'right', mb: 2 }}>
                      <Button
                        variant="contained"
                        onClick={() => addLocalTechnology({
                          title: `Новая технология ${allTechnologies.length + 1}`,
                          description: 'Описание новой технологии',
                          category: 'other',
                          difficulty: 'beginner'
                        })}
                      >
                        + Добавить
                      </Button>
                    </Box>

                    {/* Карточки */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
                      {allTechnologies.map(tech => (
                        <SimpleTechCard
                          key={tech.id}
                          technology={tech}
                          onStatusChange={handleStatusChange}
                        />
                      ))}
                    </Box>

                    {/* Импорт/экспорт */}
                    <Box sx={{ mt: 4, p: 2, border: '1px solid #eee', borderRadius: 2 }}>
                      <Typography variant="h6" gutterBottom>Импорт и экспорт</Typography>
                      <DataImportExport
                        technologies={localTechnologies}
                        setTechnologies={setLocalTechnologies}
                      />
                    </Box>

                    {/* Доп. компоненты */}
                    <Box sx={{ mt: 4 }}>
                      <Counter />
                      <RegistrationForm />
                      <ColorPicker />
                      <WindowSizeTracker />
                      <UserProfile />
                      <ContactForm />
                      <UserSettings />
                      <SimpleModalExample />
                    </Box>
                  </TabPanel>

                  {/* Вкладка: Дашборд */}
                  <TabPanel value={tabValue} index={1}>
                    <Dashboard technologies={allTechnologies} />
                  </TabPanel>
                </Container>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
// src/App.js
import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Container, Box, AppBar, Toolbar, Typography, Button, Grid, Tabs, Tab } from '@mui/material';
import { Add, List as ListIcon, Dashboard as DashboardIcon } from '@mui/icons-material';
import { theme } from './styles/theme';
import SimpleTechCard from '../src/component/SimpleTechCard';
import Dashboard from '../src/component/Dashboard';

// Вспомогательный компонент для табов
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`app-tabpanel-${index}`}
      aria-labelledby={`app-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function App() {
  const [tabValue, setTabValue] = useState(0);
  const [technologies, setTechnologies] = useState([
    {
      id: 1,
      title: 'React Components',
      description: 'Изучение компонентов',
      category: 'frontend',
      status: 'in-progress',
      createdAt: new Date().toISOString()
    }
  ]);

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  const handleStatusChange = (techId, newStatus) => {
    setTechnologies(prev =>
      prev.map(tech => (tech.id === techId ? { ...tech, status: newStatus } : tech))
    );
  };

  const addNewTechnology = () => {
    const newTech = {
      id: Date.now(),
      title: `Технология ${technologies.length + 1}`,
      description: 'Описание новой технологии',
      category: 'other',
      status: 'not-started',
      createdAt: new Date().toISOString()
    };
    setTechnologies(prev => [...prev, newTech]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            🚀 Трекер технологий
          </Typography>
        </Toolbar>
      </AppBar>

      <Tabs value={tabValue} onChange={handleTabChange} aria-label="основные вкладки">
        <Tab icon={<ListIcon />} label="Технологии" />
        <Tab icon={<DashboardIcon />} label="Дашборд" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Container maxWidth="lg" sx={{ mt: 3 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={addNewTechnology}
            sx={{ mb: 3 }}
          >
            Добавить технологию
          </Button>
          <Grid container spacing={3}>
            {technologies.map(tech => (
              <Grid item xs={12} sm={6} md={4} key={tech.id}>
                <SimpleTechCard technology={tech} onStatusChange={handleStatusChange} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Dashboard technologies={technologies} />
      </TabPanel>
    </ThemeProvider>
  );
}
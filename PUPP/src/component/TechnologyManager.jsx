// src/component/TechnologyManager.jsx
import { useState } from 'react';
import TechnologyForm from './TechnologyForm';

function TechnologyManager({ technologies, onAdd, onEdit, onStatusChange }) {
  const [showForm, setShowForm] = useState(false);
  const [editingTech, setEditingTech] = useState(null);

  const handleSaveTechnology = (techData) => {
    if (editingTech) {
      // Редактирование
      onEdit(editingTech.id, {
        ...techData,
        updatedAt: new Date().toISOString()
      });
    } else {
      // Добавление
      onAdd({
        ...techData,
        id: Date.now(),
        status: 'not-started',
        createdAt: new Date().toISOString(),
        notes: '',
        progress: 0
      });
    }
    setShowForm(false);
    setEditingTech(null);
  };

  const handleEdit = (tech) => {
    setEditingTech(tech);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTech(null);
  };

  return (
    <div className="technology-manager">
      <div className="manager-header">
        <h2>Управление технологиями ({technologies.length})</h2>
        <button 
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          + Добавить технологию
        </button>
      </div>

      {/* Список технологий */}
      <div className="technologies-list">
        {technologies.map(tech => (
          <div key={tech.id} className="technology-item">
            <h3>{tech.title}</h3>
            <p>{tech.description}</p>
            <p><strong>Статус:</strong> {tech.status}</p>
            <div className="tech-actions">
              <button onClick={() => handleEdit(tech)}>Редактировать</button>
              <button 
                onClick={() => onStatusChange(tech.id, 
                  tech.status === 'completed' ? 'not-started' :
                  tech.status === 'in-progress' ? 'completed' : 'in-progress'
                )}
              >
                Сменить статус
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно формы */}
      {showForm && (
        <div className="form-modal" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div className="modal-content" style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '600px',
            width: '90%'
          }}>
            <TechnologyForm
              onSave={handleSaveTechnology}
              onCancel={handleCancel}
              initialData={editingTech || {}}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TechnologyManager;
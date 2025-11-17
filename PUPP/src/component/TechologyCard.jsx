import React from 'react';
import './TechnologyCard.css';

// Порядок смены статусов
const STATUSES = ['not-started', 'in-progress', 'completed'];
const STATUS_ORDER = ['not-started', 'in-progress', 'completed'];

function TechnologyCard({ title, description, status, onStatusChange }) {
  const handleClick = () => {
    const currentIndex = STATUS_ORDER.indexOf(status);
    const nextIndex = (currentIndex + 1) % STATUS_ORDER.length;
    const nextStatus = STATUS_ORDER[nextIndex];
    onStatusChange(nextStatus);
  };
// Внутри TechnologyCard.jsx

  // Функция для получения текста и значка
  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Завершено';
      case 'in-progress':
        return 'В процессе';
      case 'not-started':
        return 'Не начато';
      default:
        return '';
    }
  };

  return (
    <div 
      className={`technology-card status-${status}`} 
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="status-indicator">
        {getStatusText(status)}
      </div>
    </div>
  );
}

export default TechnologyCard;
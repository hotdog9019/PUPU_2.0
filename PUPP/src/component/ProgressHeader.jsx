function ProgressHeader({ technologies }) {
  const total = technologies.length;
  const completed = technologies.filter(t => t.status === 'completed').length;
  const percentage = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="progress-header">
      <h2>Дорожная карта изучения</h2>
      <p>Всего: <strong>{total}</strong> | Завершено: <strong>{completed}</strong></p>
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p>Прогресс: <strong>{percentage}%</strong></p>
    </div>
  );
}
export default ProgressHeader;
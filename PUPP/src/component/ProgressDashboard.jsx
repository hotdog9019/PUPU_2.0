// ProgressDashboard.jsx - демонстрация разных вариантов прогресс-бара
import ProgressBar from './ProgressBar';
import './ProgressDashboard.css'; // Добавим файл со стилями

function ProgressDashboard({
  overallProgress = 0,
  frontendProgress = 0,
  backendProgress = 0,
  databaseProgress = 0
}) {
  // Прогресс по неделям — можно тоже динамически, но пока оставим как пример
  const weeklyProgress = [90, 75, 60, 45, 30, 15];

  return (
    <div className="progress-dashboard">
      <h2>Мой прогресс в изучении</h2>
      
      <ProgressBar 
        progress={overallProgress}
        label="Общий прогресс "
        color="#2196F3"
        height={25}
      />

      <ProgressBar 
        progress={frontendProgress}
        label="React Component "
        color="#4CAF50"
        showPercentage={true}
      />

      <ProgressBar 
        progress={backendProgress}
        label="JSX Syntax "
        color="#FF9800"
        showPercentage={true}
      />

      <ProgressBar 
        progress={databaseProgress}
        label="State Management "
        color="#F44336"
        height={15}
        showPercentage={true}
      />

      <div className="weekly-progress">
        <h3>Прогресс по неделям:</h3>
        <div className="weekly-bars">
          {weeklyProgress.map((progress, index) => (
            <div key={index} className="week-item">
              <span className="week-label">Неделя {index + 1}</span>
              <ProgressBar 
                progress={progress} 
                height={12} 
                showPercentage={false} 
                color="#9C27B0"
              />
              <span className="week-percentage">{progress}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProgressDashboard;
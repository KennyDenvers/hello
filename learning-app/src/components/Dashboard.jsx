import { useProficiency } from '../hooks/useProficiency';
import { useAdaptive } from '../hooks/useAdaptive';

const CATEGORY_NAMES = {
  powers: 'Potenzen',
  logarithms: 'Logarithmen',
  applications: 'Anwendungen'
};

function Dashboard({ onNavigate }) {
  const { getOverallProgress, getCategoryProgress } = useProficiency();
  const { getRecommendedAction } = useAdaptive();

  const overallProgress = getOverallProgress();
  const categoryProgress = getCategoryProgress();
  const recommendation = getRecommendedAction();

  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (overallProgress / 100) * circumference;

  return (
    <div className="dashboard fade-in">
      <div className="dashboard-header">
        <h1>Mathe Lernen</h1>
        <p>Potenzen & Logarithmen</p>
      </div>

      <div className="progress-ring">
        <div className="progress-circle">
          <svg width="160" height="160">
            <circle className="bg" cx="80" cy="80" r="70" />
            <circle
              className="progress"
              cx="80"
              cy="80"
              r="70"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <div className="progress-text">
            <div className="percentage">{overallProgress}%</div>
            <div className="label">Gesamtfortschritt</div>
          </div>
        </div>
      </div>

      <div className="recommendation">
        <h3>Empfehlung</h3>
        <p>{recommendation.message}</p>
        <button
          className="btn"
          onClick={() => {
            if (recommendation.conceptId) {
              onNavigate('practice', recommendation.conceptId);
            } else {
              onNavigate('practice');
            }
          }}
        >
          Jetzt lernen
        </button>
      </div>

      <div className="action-cards">
        <button className="action-card" onClick={() => onNavigate('learn')}>
          <div className="action-icon learn">📚</div>
          <div className="action-content">
            <h3>Lernen</h3>
            <p>Konzepte verstehen</p>
          </div>
        </button>

        <button className="action-card" onClick={() => onNavigate('practice')}>
          <div className="action-icon practice">✏️</div>
          <div className="action-content">
            <h3>Üben</h3>
            <p>Aufgaben lösen</p>
          </div>
        </button>

        <button className="action-card" onClick={() => onNavigate('test')}>
          <div className="action-icon test">📝</div>
          <div className="action-content">
            <h3>Testen</h3>
            <p>Wissen prüfen</p>
          </div>
        </button>
      </div>

      <div className="category-progress">
        <h2>Fortschritt nach Thema</h2>
        {Object.entries(categoryProgress).map(([key, data]) => {
          const percent = data.total > 0
            ? Math.round((data.achieved / data.total) * 100)
            : 0;
          return (
            <div className="category-item" key={key}>
              <div className="category-header">
                <span className="category-name">{CATEGORY_NAMES[key]}</span>
                <span className="category-percent">{percent}%</span>
              </div>
              <div className="category-bar">
                <div
                  className="category-bar-fill"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;

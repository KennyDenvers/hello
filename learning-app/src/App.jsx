import { useState } from 'react';
import Dashboard from './components/Dashboard';
import ConceptList from './components/learning/ConceptList';
import ConceptDetail from './components/learning/ConceptDetail';
import ExerciseMode from './components/exercises/ExerciseMode';
import TestMode from './components/assessment/TestMode';
import Settings from './components/Settings';
import './App.css';

const VIEWS = {
  DASHBOARD: 'dashboard',
  LEARN: 'learn',
  CONCEPT_DETAIL: 'concept_detail',
  PRACTICE: 'practice',
  TEST: 'test',
  SETTINGS: 'settings'
};

function App() {
  const [currentView, setCurrentView] = useState(VIEWS.DASHBOARD);
  const [selectedConcept, setSelectedConcept] = useState(null);

  const navigateTo = (view, concept = null) => {
    setCurrentView(view);
    if (concept) setSelectedConcept(concept);
  };

  const renderView = () => {
    switch (currentView) {
      case VIEWS.DASHBOARD:
        return <Dashboard onNavigate={navigateTo} />;
      case VIEWS.LEARN:
        return (
          <ConceptList
            onSelectConcept={(conceptId) => navigateTo(VIEWS.CONCEPT_DETAIL, conceptId)}
            onBack={() => navigateTo(VIEWS.DASHBOARD)}
          />
        );
      case VIEWS.CONCEPT_DETAIL:
        return (
          <ConceptDetail
            conceptId={selectedConcept}
            onBack={() => navigateTo(VIEWS.LEARN)}
            onPractice={() => navigateTo(VIEWS.PRACTICE, selectedConcept)}
          />
        );
      case VIEWS.PRACTICE:
        return (
          <ExerciseMode
            conceptId={selectedConcept}
            onBack={() => navigateTo(VIEWS.DASHBOARD)}
          />
        );
      case VIEWS.TEST:
        return (
          <TestMode
            onBack={() => navigateTo(VIEWS.DASHBOARD)}
          />
        );
      case VIEWS.SETTINGS:
        return (
          <Settings
            onBack={() => navigateTo(VIEWS.DASHBOARD)}
          />
        );
      default:
        return <Dashboard onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="app">
      {renderView()}

      {currentView === VIEWS.DASHBOARD && (
        <nav className="bottom-nav">
          <button
            className="nav-btn active"
            onClick={() => navigateTo(VIEWS.DASHBOARD)}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-label">Start</span>
          </button>
          <button
            className="nav-btn"
            onClick={() => navigateTo(VIEWS.LEARN)}
          >
            <span className="nav-icon">📚</span>
            <span className="nav-label">Lernen</span>
          </button>
          <button
            className="nav-btn"
            onClick={() => navigateTo(VIEWS.PRACTICE)}
          >
            <span className="nav-icon">✏️</span>
            <span className="nav-label">Üben</span>
          </button>
          <button
            className="nav-btn"
            onClick={() => navigateTo(VIEWS.TEST)}
          >
            <span className="nav-icon">📝</span>
            <span className="nav-label">Testen</span>
          </button>
          <button
            className="nav-btn"
            onClick={() => navigateTo(VIEWS.SETTINGS)}
          >
            <span className="nav-icon">⚙️</span>
            <span className="nav-label">Mehr</span>
          </button>
        </nav>
      )}
    </div>
  );
}

export default App;

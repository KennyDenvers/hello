import { useProficiency } from '../../hooks/useProficiency';
import conceptsData from '../../data/concepts.json';

const CATEGORY_NAMES = {
  powers: 'Potenzen',
  logarithms: 'Logarithmen',
  applications: 'Anwendungen'
};

const CATEGORY_ORDER = ['powers', 'logarithms', 'applications'];

function ConceptList({ onSelectConcept, onBack }) {
  const { isConceptUnlocked, getConceptProgress, getLevelName } = useProficiency();

  const conceptsByCategory = CATEGORY_ORDER.map(category => ({
    category,
    name: CATEGORY_NAMES[category],
    concepts: conceptsData.concepts.filter(c => c.category === category)
  }));

  const getStatusClass = (conceptId) => {
    if (!isConceptUnlocked(conceptId)) return 'locked';
    const progress = getConceptProgress(conceptId);
    if (!progress || progress.attempts.total === 0) return 'locked';
    if (progress.levelProgress.mastery.achieved) return 'mastered';
    return 'started';
  };

  const getStatusIcon = (conceptId) => {
    if (!isConceptUnlocked(conceptId)) return '🔒';
    const progress = getConceptProgress(conceptId);
    if (!progress || progress.attempts.total === 0) return '○';
    if (progress.levelProgress.mastery.achieved) return '✓';
    return '◐';
  };

  const getProgressText = (conceptId) => {
    if (!isConceptUnlocked(conceptId)) {
      const concept = conceptsData.concepts.find(c => c.id === conceptId);
      if (concept?.prerequisites.length > 0) {
        const prereq = conceptsData.concepts.find(c => c.id === concept.prerequisites[0]);
        return `Erst: ${prereq?.name || 'Voraussetzung'}`;
      }
      return 'Gesperrt';
    }
    const progress = getConceptProgress(conceptId);
    if (!progress || progress.attempts.total === 0) return 'Noch nicht begonnen';
    return `Stufe: ${getLevelName(progress.currentLevel)}`;
  };

  return (
    <div className="concept-list fade-in">
      <header className="header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Lernen</h1>
      </header>

      {conceptsByCategory.map(({ category, name, concepts }) => (
        <div className="concept-category" key={category}>
          <h2>{name}</h2>
          {concepts.map(concept => {
            const unlocked = isConceptUnlocked(concept.id);
            return (
              <button
                key={concept.id}
                className={`concept-card ${getStatusClass(concept.id)}`}
                onClick={() => unlocked && onSelectConcept(concept.id)}
                disabled={!unlocked}
              >
                <div className={`concept-status ${getStatusClass(concept.id)}`}>
                  {getStatusIcon(concept.id)}
                </div>
                <div className="concept-info">
                  <h3>{concept.name}</h3>
                  <p>{getProgressText(concept.id)}</p>
                </div>
                {unlocked && <span className="concept-arrow">›</span>}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default ConceptList;

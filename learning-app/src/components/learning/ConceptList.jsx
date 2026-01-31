import { useProficiency } from '../../hooks/useProficiency';
import conceptsData from '../../data/concepts.json';

const CATEGORY_NAMES = {
  powers: 'Potenzen',
  logarithms: 'Logarithmen',
  applications: 'Anwendungen'
};

const CATEGORY_ORDER = ['powers', 'logarithms', 'applications'];

function ConceptList({ onSelectConcept, onBack }) {
  const { isConceptUnlocked, getConceptProgress, getLevelName, getUnlockRequirements } = useProficiency();

  const conceptsByCategory = CATEGORY_ORDER.map(category => ({
    category,
    name: CATEGORY_NAMES[category],
    concepts: conceptsData.concepts.filter(c => c.category === category)
  }));

  const getStatusClass = (conceptId) => {
    if (!isConceptUnlocked(conceptId)) return 'locked';
    const progress = getConceptProgress(conceptId);
    if (!progress || progress.attempts.total === 0) return 'new';
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
    const unlocked = isConceptUnlocked(conceptId);

    if (!unlocked) {
      const requirements = getUnlockRequirements(conceptId);
      if (requirements && requirements.length > 0) {
        const notDone = requirements.filter(r => !r.done);
        if (notDone.length > 0) {
          const first = notDone[0];
          return `Zuerst: ${first.name} (${first.current}/${first.needed} richtig)`;
        }
      }
      return 'Gesperrt';
    }

    const progress = getConceptProgress(conceptId);
    if (!progress || progress.attempts.total === 0) {
      return 'Bereit zum Starten';
    }

    const correctRate = Math.round((progress.attempts.correct / progress.attempts.total) * 100);
    return `${getLevelName(progress.currentLevel)} · ${correctRate}% richtig`;
  };

  return (
    <div className="concept-list fade-in">
      <header className="header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Lernen</h1>
      </header>

      <div style={{ padding: '0 20px 12px', color: '#6b7280', fontSize: 13 }}>
        Löse Aufgaben eines Konzepts, um das nächste freizuschalten.
      </div>

      {conceptsByCategory.map(({ category, name, concepts }) => (
        <div className="concept-category" key={category}>
          <h2>{name}</h2>
          {concepts.map(concept => {
            const unlocked = isConceptUnlocked(concept.id);
            const statusClass = getStatusClass(concept.id);
            return (
              <button
                key={concept.id}
                className={`concept-card ${statusClass}`}
                onClick={() => unlocked && onSelectConcept(concept.id)}
                disabled={!unlocked}
              >
                <div className={`concept-status ${statusClass}`}>
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

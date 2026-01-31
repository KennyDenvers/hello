import { useProficiency } from '../../hooks/useProficiency';
import conceptsData from '../../data/concepts.json';

function ConceptDetail({ conceptId, onBack, onPractice }) {
  const { getConceptProgress, getLevelName } = useProficiency();

  const concept = conceptsData.concepts.find(c => c.id === conceptId);
  const progress = getConceptProgress(conceptId);

  if (!concept) {
    return (
      <div className="concept-detail">
        <header className="header">
          <button className="back-btn" onClick={onBack}>←</button>
          <h1>Nicht gefunden</h1>
        </header>
        <p>Konzept nicht gefunden.</p>
      </div>
    );
  }

  return (
    <div className="concept-detail fade-in">
      <header className="header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>{concept.name}</h1>
      </header>

      <div className="concept-hero">
        <h1>{concept.name}</h1>
        <p>{concept.description}</p>
        {progress && progress.attempts.total > 0 && (
          <div style={{ marginTop: 12 }}>
            <span className={`level-badge ${progress.currentLevel}`}>
              {getLevelName(progress.currentLevel)}
            </span>
          </div>
        )}
      </div>

      <div className="concept-section">
        <h2>📖 Theorie</h2>
        <pre>{concept.theory}</pre>
      </div>

      {concept.businessContext && (
        <div className="concept-section">
          <h2>💼 Wirtschaftskontext</h2>
          <p>{concept.businessContext}</p>
        </div>
      )}

      <div className="concept-section">
        <h2>📝 Beispiele</h2>
        {concept.examples.map((example, idx) => (
          <div className="example-item" key={idx}>
            <div className="example-problem">{example.problem}</div>
            <div className="example-solution">= {example.solution}</div>
            <div className="example-explanation">{example.explanation}</div>
          </div>
        ))}
      </div>

      <button className="practice-btn" onClick={onPractice}>
        Jetzt üben
      </button>
    </div>
  );
}

export default ConceptDetail;

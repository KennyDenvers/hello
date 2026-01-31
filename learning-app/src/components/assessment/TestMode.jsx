import { useState, useEffect } from 'react';
import { useProficiency } from '../../hooks/useProficiency';
import { useSpacedRep } from '../../hooks/useSpacedRep';
import exercisesData from '../../data/exercises.json';
import conceptsData from '../../data/concepts.json';

const TEST_SIZES = {
  quick: 5,
  standard: 10,
  full: 20
};

function TestMode({ onBack }) {
  const { updateProgress, isConceptUnlocked } = useProficiency();
  const { scheduleReview } = useSpacedRep();

  const [testType, setTestType] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [inputAnswer, setInputAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [results, setResults] = useState([]);
  const [testComplete, setTestComplete] = useState(false);

  const startTest = (type) => {
    const count = TEST_SIZES[type];

    const availableExercises = exercisesData.exercises.filter(ex =>
      isConceptUnlocked(ex.conceptId)
    );

    const shuffled = [...availableExercises].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(count, shuffled.length));

    setTestType(type);
    setExercises(selected);
    setCurrentIndex(0);
    setResults([]);
    setTestComplete(false);
    resetExerciseState();
  };

  const resetExerciseState = () => {
    setSelectedAnswer(null);
    setInputAnswer('');
    setShowResult(false);
    setIsCorrect(false);
  };

  const currentExercise = exercises[currentIndex];

  const checkAnswer = () => {
    if (!currentExercise) return;

    let correct = false;

    if (currentExercise.type === 'multiple_choice') {
      correct = selectedAnswer === currentExercise.correctIndex;
    } else if (currentExercise.type === 'input') {
      const normalizedInput = inputAnswer.trim().toLowerCase().replace(/\s/g, '');
      correct = currentExercise.acceptedAnswers.some(answer =>
        answer.toLowerCase().replace(/\s/g, '') === normalizedInput
      );
    }

    setIsCorrect(correct);
    setShowResult(true);

    updateProgress(currentExercise.conceptId, correct, currentExercise.level);
    scheduleReview(currentExercise.conceptId, correct);

    setResults(prev => [...prev, {
      exerciseId: currentExercise.id,
      conceptId: currentExercise.conceptId,
      correct
    }]);
  };

  const handleNext = () => {
    if (currentIndex >= exercises.length - 1) {
      setTestComplete(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      resetExerciseState();
    }
  };

  const getConceptName = (id) => {
    const concept = conceptsData.concepts.find(c => c.id === id);
    return concept?.name || id;
  };

  if (!testType) {
    return (
      <div className="test-mode fade-in">
        <header className="header">
          <button className="back-btn" onClick={onBack}>←</button>
          <h1>Testen</h1>
        </header>

        <div className="test-intro">
          <h1>Wissen testen</h1>
          <p>Wähle eine Testlänge:</p>

          <div className="test-options">
            <button className="test-option" onClick={() => startTest('quick')}>
              <h3>Schnelltest</h3>
              <p>5 Fragen - ca. 3 Minuten</p>
            </button>

            <button className="test-option" onClick={() => startTest('standard')}>
              <h3>Standardtest</h3>
              <p>10 Fragen - ca. 7 Minuten</p>
            </button>

            <button className="test-option" onClick={() => startTest('full')}>
              <h3>Volltest</h3>
              <p>20 Fragen - ca. 15 Minuten</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (testComplete) {
    const correctCount = results.filter(r => r.correct).length;
    const percentage = Math.round((correctCount / results.length) * 100);

    const conceptResults = {};
    results.forEach(r => {
      if (!conceptResults[r.conceptId]) {
        conceptResults[r.conceptId] = { total: 0, correct: 0 };
      }
      conceptResults[r.conceptId].total++;
      if (r.correct) conceptResults[r.conceptId].correct++;
    });

    return (
      <div className="test-mode fade-in">
        <header className="header">
          <button className="back-btn" onClick={onBack}>←</button>
          <h1>Ergebnis</h1>
        </header>

        <div className="test-results">
          <div className="test-score celebrate">{percentage}%</div>
          <div className="test-score-label">
            {correctCount} von {results.length} richtig
          </div>

          <p style={{ marginBottom: 24, color: '#6b7280' }}>
            {percentage >= 90 ? 'Ausgezeichnet!' :
             percentage >= 75 ? 'Sehr gut!' :
             percentage >= 60 ? 'Gut, weiter so!' :
             'Weiter üben!'}
          </p>

          <div style={{ textAlign: 'left', marginBottom: 24 }}>
            <h3 style={{ marginBottom: 12 }}>Ergebnisse nach Thema:</h3>
            {Object.entries(conceptResults).map(([conceptId, data]) => (
              <div key={conceptId} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 0',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <span>{getConceptName(conceptId)}</span>
                <span style={{
                  color: data.correct === data.total ? '#22c55e' :
                         data.correct >= data.total / 2 ? '#f59e0b' : '#ef4444'
                }}>
                  {data.correct}/{data.total}
                </span>
              </div>
            ))}
          </div>

          <button className="practice-btn" onClick={() => setTestType(null)}>
            Neuer Test
          </button>
          <button
            className="practice-btn"
            style={{ marginTop: 12, background: '#374151' }}
            onClick={onBack}
          >
            Zurück
          </button>
        </div>
      </div>
    );
  }

  if (!currentExercise) {
    return (
      <div className="test-mode">
        <header className="header">
          <button className="back-btn" onClick={onBack}>←</button>
          <h1>Test</h1>
        </header>
        <div style={{ padding: 20, textAlign: 'center' }}>
          <p>Keine Übungen verfügbar.</p>
          <button className="practice-btn" onClick={onBack}>Zurück</button>
        </div>
      </div>
    );
  }

  return (
    <div className="exercise-mode">
      <header className="exercise-header">
        <button className="back-btn" onClick={onBack}>✕</button>
        <div className="exercise-progress">
          <span style={{ fontSize: 14, color: '#6b7280' }}>
            {currentIndex + 1} / {exercises.length}
          </span>
        </div>
      </header>

      <div className="exercise-content">
        <div className="exercise-card fade-in" key={currentExercise.id}>
          <div className="exercise-type">
            {getConceptName(currentExercise.conceptId)}
          </div>

          <div className="exercise-prompt">{currentExercise.prompt}</div>

          {currentExercise.type === 'multiple_choice' && (
            <div className="exercise-options">
              {currentExercise.options.map((option, idx) => {
                let className = 'option-btn';
                if (showResult) {
                  if (idx === currentExercise.correctIndex) {
                    className += ' correct';
                  } else if (idx === selectedAnswer && !isCorrect) {
                    className += ' wrong';
                  }
                } else if (idx === selectedAnswer) {
                  className += ' selected';
                }
                return (
                  <button
                    key={idx}
                    className={className}
                    onClick={() => !showResult && setSelectedAnswer(idx)}
                    disabled={showResult}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          )}

          {currentExercise.type === 'input' && (
            <input
              type="text"
              className="input-answer"
              value={inputAnswer}
              onChange={(e) => setInputAnswer(e.target.value)}
              placeholder="Deine Antwort..."
              disabled={showResult}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && inputAnswer.trim() && !showResult) {
                  checkAnswer();
                }
              }}
            />
          )}

          <div className="feedback-section">
            {showResult && (
              <>
                <div className={isCorrect ? 'feedback-correct' : 'feedback-wrong'}>
                  <h4>{isCorrect ? '✓ Richtig!' : '✗ Nicht ganz'}</h4>
                  {!isCorrect && currentExercise.type === 'input' && (
                    <p>Richtige Antwort: {currentExercise.correctAnswer}</p>
                  )}
                </div>

                <div className="explanation-box">
                  <h4>Erklärung</h4>
                  <p>{currentExercise.explanation}</p>
                </div>

                <button className="next-btn" onClick={handleNext}>
                  {currentIndex >= exercises.length - 1 ? 'Ergebnis anzeigen' : 'Weiter'}
                </button>
              </>
            )}

            {!showResult && (
              <button
                className="submit-btn"
                onClick={checkAnswer}
                disabled={
                  (currentExercise.type === 'multiple_choice' && selectedAnswer === null) ||
                  (currentExercise.type === 'input' && !inputAnswer.trim())
                }
              >
                Prüfen
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestMode;

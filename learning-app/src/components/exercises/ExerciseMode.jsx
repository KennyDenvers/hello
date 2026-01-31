import { useState, useEffect } from 'react';
import { useProficiency } from '../../hooks/useProficiency';
import { useAdaptive } from '../../hooks/useAdaptive';
import { useSpacedRep } from '../../hooks/useSpacedRep';
import conceptsData from '../../data/concepts.json';

const EXERCISE_COUNT = 5;

function ExerciseMode({ conceptId, onBack }) {
  const { updateProgress } = useProficiency();
  const { selectNextExercise, selectExerciseForConcept } = useAdaptive();
  const { scheduleReview } = useSpacedRep();

  const [currentExercise, setCurrentExercise] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [inputAnswer, setInputAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [exerciseHistory, setExerciseHistory] = useState([]);
  const [sessionComplete, setSessionComplete] = useState(false);

  const loadNextExercise = () => {
    let exercise;
    if (conceptId) {
      exercise = selectExerciseForConcept(conceptId);
    } else {
      exercise = selectNextExercise({ mode: 'smart' });
    }
    setCurrentExercise(exercise);
    setSelectedAnswer(null);
    setInputAnswer('');
    setShowResult(false);
    setIsCorrect(false);
    setShowHint(false);
    setHintIndex(0);
  };

  useEffect(() => {
    loadNextExercise();
  }, []);

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

    setExerciseHistory(prev => [...prev, { correct }]);
  };

  const handleNext = () => {
    if (exerciseHistory.length >= EXERCISE_COUNT) {
      setSessionComplete(true);
    } else {
      loadNextExercise();
    }
  };

  const handleShowHint = () => {
    setShowHint(true);
  };

  const handleNextHint = () => {
    if (currentExercise?.hints && hintIndex < currentExercise.hints.length - 1) {
      setHintIndex(prev => prev + 1);
    }
  };

  const getConceptName = (id) => {
    const concept = conceptsData.concepts.find(c => c.id === id);
    return concept?.name || id;
  };

  if (sessionComplete) {
    const correctCount = exerciseHistory.filter(h => h.correct).length;
    const percentage = Math.round((correctCount / exerciseHistory.length) * 100);

    return (
      <div className="exercise-mode">
        <header className="exercise-header">
          <button className="back-btn" onClick={onBack}>←</button>
          <span>Ergebnis</span>
        </header>
        <div className="exercise-content">
          <div className="test-results">
            <div className="test-score celebrate">{percentage}%</div>
            <div className="test-score-label">
              {correctCount} von {exerciseHistory.length} richtig
            </div>
            <p style={{ marginBottom: 24, color: '#6b7280' }}>
              {percentage >= 80 ? 'Super gemacht!' :
               percentage >= 60 ? 'Gut, aber da geht noch mehr!' :
               'Weiter üben - du schaffst das!'}
            </p>
            <button className="practice-btn" onClick={() => {
              setExerciseHistory([]);
              setSessionComplete(false);
              loadNextExercise();
            }}>
              Nochmal üben
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
      </div>
    );
  }

  if (!currentExercise) {
    return (
      <div className="exercise-mode">
        <header className="exercise-header">
          <button className="back-btn" onClick={onBack}>←</button>
          <span>Üben</span>
        </header>
        <div className="exercise-content">
          <div className="exercise-card">
            <p style={{ textAlign: 'center', color: '#6b7280' }}>
              Keine Übungen verfügbar.
            </p>
            <button className="practice-btn" onClick={onBack}>
              Zurück
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="exercise-mode">
      <header className="exercise-header">
        <button className="back-btn" onClick={onBack}>✕</button>
        <div className="exercise-progress">
          <div className="progress-dots">
            {Array.from({ length: EXERCISE_COUNT }).map((_, idx) => {
              let className = 'progress-dot';
              if (idx < exerciseHistory.length) {
                className += exerciseHistory[idx].correct ? ' correct' : ' wrong';
              } else if (idx === exerciseHistory.length) {
                className += ' current';
              }
              return <div key={idx} className={className} />;
            })}
          </div>
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
            <>
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
            </>
          )}

          {!showResult && currentExercise.hints && currentExercise.hints.length > 0 && (
            <>
              {!showHint ? (
                <button className="show-hint-btn" onClick={handleShowHint}>
                  💡 Hinweis anzeigen
                </button>
              ) : (
                <div className="hint-section">
                  <h4>Hinweis {hintIndex + 1}/{currentExercise.hints.length}</h4>
                  <p>{currentExercise.hints[hintIndex]}</p>
                  {hintIndex < currentExercise.hints.length - 1 && (
                    <button
                      className="show-hint-btn"
                      onClick={handleNextHint}
                      style={{ marginTop: 8, padding: 4 }}
                    >
                      Nächster Hinweis
                    </button>
                  )}
                </div>
              )}
            </>
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
                  {exerciseHistory.length >= EXERCISE_COUNT - 1 ? 'Ergebnis anzeigen' : 'Weiter'}
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

export default ExerciseMode;

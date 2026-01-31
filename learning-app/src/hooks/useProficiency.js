import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import conceptsData from '../data/concepts.json';

const LEVEL_ORDER = ['recognition', 'comprehension', 'application', 'mastery'];
const LEVEL_NAMES = {
  recognition: 'Erkennen',
  comprehension: 'Verstehen',
  application: 'Anwenden',
  mastery: 'Beherrschen'
};

const createInitialProgress = () => {
  const progress = {};
  conceptsData.concepts.forEach(concept => {
    progress[concept.id] = {
      conceptId: concept.id,
      currentLevel: 'recognition',
      attempts: { total: 0, correct: 0 },
      levelProgress: {
        recognition: { achieved: false, attempts: 0, correct: 0 },
        comprehension: { achieved: false, attempts: 0, correct: 0 },
        application: { achieved: false, attempts: 0, correct: 0 },
        mastery: { achieved: false, attempts: 0, correct: 0 }
      },
      lastPracticed: null,
      nextReviewDue: null,
      streak: 0
    };
  });
  return progress;
};

export function useProficiency() {
  const [progress, setProgress] = useLocalStorage('mathapp_progress', createInitialProgress());

  const checkPrerequisites = useCallback((conceptId) => {
    const concept = conceptsData.concepts.find(c => c.id === conceptId);
    if (!concept || concept.prerequisites.length === 0) return true;

    return concept.prerequisites.every(prereqId => {
      const prereqProgress = progress[prereqId];
      if (!prereqProgress) return false;
      return prereqProgress.levelProgress.comprehension.achieved;
    });
  }, [progress]);

  const isConceptUnlocked = useCallback((conceptId) => {
    return checkPrerequisites(conceptId);
  }, [checkPrerequisites]);

  const updateProgress = useCallback((conceptId, isCorrect, exerciseLevel) => {
    setProgress(prev => {
      const conceptProgress = { ...prev[conceptId] };
      const concept = conceptsData.concepts.find(c => c.id === conceptId);
      if (!concept) return prev;

      conceptProgress.attempts.total += 1;
      if (isCorrect) {
        conceptProgress.attempts.correct += 1;
        conceptProgress.streak += 1;
      } else {
        conceptProgress.streak = 0;
      }

      const levelIdx = LEVEL_ORDER.indexOf(exerciseLevel);
      const currentLevelIdx = LEVEL_ORDER.indexOf(conceptProgress.currentLevel);
      const targetLevel = levelIdx >= 0 ? exerciseLevel : conceptProgress.currentLevel;

      const levelData = { ...conceptProgress.levelProgress[targetLevel] };
      levelData.attempts += 1;
      if (isCorrect) levelData.correct += 1;

      const thresholds = concept.proficiencyLevels[targetLevel];
      const score = levelData.attempts > 0 ? levelData.correct / levelData.attempts : 0;

      if (score >= thresholds.threshold && levelData.attempts >= thresholds.minAttempts) {
        levelData.achieved = true;

        const nextLevelIdx = LEVEL_ORDER.indexOf(targetLevel) + 1;
        if (nextLevelIdx < LEVEL_ORDER.length && targetLevel === conceptProgress.currentLevel) {
          conceptProgress.currentLevel = LEVEL_ORDER[nextLevelIdx];
        }
      }

      conceptProgress.levelProgress = {
        ...conceptProgress.levelProgress,
        [targetLevel]: levelData
      };

      conceptProgress.lastPracticed = new Date().toISOString();

      return {
        ...prev,
        [conceptId]: conceptProgress
      };
    });
  }, [setProgress]);

  const getConceptProgress = useCallback((conceptId) => {
    return progress[conceptId] || null;
  }, [progress]);

  const getLevelName = useCallback((level) => {
    return LEVEL_NAMES[level] || level;
  }, []);

  const getOverallProgress = useCallback(() => {
    const concepts = conceptsData.concepts;
    let totalPoints = 0;
    let earnedPoints = 0;

    concepts.forEach(concept => {
      const conceptProgress = progress[concept.id];
      if (!conceptProgress) return;

      LEVEL_ORDER.forEach((level, idx) => {
        totalPoints += idx + 1;
        if (conceptProgress.levelProgress[level].achieved) {
          earnedPoints += idx + 1;
        }
      });
    });

    return totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
  }, [progress]);

  const getConceptsNearThreshold = useCallback(() => {
    const nearThreshold = [];

    conceptsData.concepts.forEach(concept => {
      const conceptProgress = progress[concept.id];
      if (!conceptProgress || !isConceptUnlocked(concept.id)) return;

      const level = conceptProgress.currentLevel;
      const levelData = conceptProgress.levelProgress[level];
      const thresholds = concept.proficiencyLevels[level];

      if (!levelData.achieved && levelData.attempts >= thresholds.minAttempts - 2) {
        const score = levelData.attempts > 0 ? levelData.correct / levelData.attempts : 0;
        if (score >= thresholds.threshold - 0.15) {
          nearThreshold.push({
            conceptId: concept.id,
            level,
            score,
            attemptsNeeded: Math.max(0, thresholds.minAttempts - levelData.attempts)
          });
        }
      }
    });

    return nearThreshold.sort((a, b) => b.score - a.score);
  }, [progress, isConceptUnlocked]);

  const getWeakestConcepts = useCallback(() => {
    const weak = [];

    conceptsData.concepts.forEach(concept => {
      const conceptProgress = progress[concept.id];
      if (!conceptProgress || !isConceptUnlocked(concept.id)) return;
      if (conceptProgress.attempts.total === 0) return;

      const score = conceptProgress.attempts.correct / conceptProgress.attempts.total;
      if (score < 0.7) {
        weak.push({
          conceptId: concept.id,
          score,
          currentLevel: conceptProgress.currentLevel
        });
      }
    });

    return weak.sort((a, b) => a.score - b.score);
  }, [progress, isConceptUnlocked]);

  const getUnlockedUnstartedConcepts = useCallback(() => {
    return conceptsData.concepts
      .filter(concept => {
        const conceptProgress = progress[concept.id];
        return isConceptUnlocked(concept.id) &&
               conceptProgress &&
               conceptProgress.attempts.total === 0;
      })
      .map(c => c.id);
  }, [progress, isConceptUnlocked]);

  const resetProgress = useCallback(() => {
    setProgress(createInitialProgress());
  }, [setProgress]);

  const getCategoryProgress = useCallback(() => {
    const categories = {
      powers: { total: 0, achieved: 0, concepts: [] },
      logarithms: { total: 0, achieved: 0, concepts: [] },
      applications: { total: 0, achieved: 0, concepts: [] }
    };

    conceptsData.concepts.forEach(concept => {
      const cat = categories[concept.category];
      if (!cat) return;

      const conceptProgress = progress[concept.id];
      cat.total += 4;

      LEVEL_ORDER.forEach(level => {
        if (conceptProgress?.levelProgress[level].achieved) {
          cat.achieved += 1;
        }
      });

      cat.concepts.push({
        id: concept.id,
        name: concept.name,
        progress: conceptProgress
      });
    });

    return categories;
  }, [progress]);

  return {
    progress,
    updateProgress,
    getConceptProgress,
    isConceptUnlocked,
    checkPrerequisites,
    getOverallProgress,
    getConceptsNearThreshold,
    getWeakestConcepts,
    getUnlockedUnstartedConcepts,
    resetProgress,
    getLevelName,
    getCategoryProgress,
    LEVEL_ORDER,
    LEVEL_NAMES
  };
}

import { useCallback, useMemo } from 'react';
import { useProficiency } from './useProficiency';
import { useSpacedRep } from './useSpacedRep';
import exercisesData from '../data/exercises.json';
import conceptsData from '../data/concepts.json';

export function useAdaptive() {
  const {
    progress,
    isConceptUnlocked,
    getConceptsNearThreshold,
    getWeakestConcepts,
    getUnlockedUnstartedConcepts,
    LEVEL_ORDER
  } = useProficiency();

  const { getDueReviews } = useSpacedRep();

  const getExercisesForConcept = useCallback((conceptId, level = null) => {
    return exercisesData.exercises.filter(ex => {
      if (ex.conceptId !== conceptId) return false;
      if (level && ex.level !== level) return false;
      return true;
    });
  }, []);

  const selectExerciseForConcept = useCallback((conceptId, preferredLevel = null) => {
    const conceptProgress = progress[conceptId];
    if (!conceptProgress) return null;

    const level = preferredLevel || conceptProgress.currentLevel;
    let exercises = getExercisesForConcept(conceptId, level);

    if (exercises.length === 0) {
      exercises = getExercisesForConcept(conceptId);
    }

    if (exercises.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * exercises.length);
    return exercises[randomIndex];
  }, [progress, getExercisesForConcept]);

  const selectNextExercise = useCallback((options = {}) => {
    const { conceptId: forceConceptId, mode = 'smart' } = options;

    if (forceConceptId) {
      return selectExerciseForConcept(forceConceptId);
    }

    if (mode === 'smart') {
      const dueReviews = getDueReviews();
      if (dueReviews.length > 0) {
        const reviewConcept = dueReviews[0];
        const exercise = selectExerciseForConcept(reviewConcept.conceptId);
        if (exercise) return { ...exercise, reason: 'review' };
      }

      const nearMastery = getConceptsNearThreshold();
      if (nearMastery.length > 0) {
        const exercise = selectExerciseForConcept(nearMastery[0].conceptId, nearMastery[0].level);
        if (exercise) return { ...exercise, reason: 'near_mastery' };
      }

      const unstartedConcepts = getUnlockedUnstartedConcepts();
      if (unstartedConcepts.length > 0) {
        const exercise = selectExerciseForConcept(unstartedConcepts[0], 'recognition');
        if (exercise) return { ...exercise, reason: 'new_concept' };
      }

      const weakConcepts = getWeakestConcepts();
      if (weakConcepts.length > 0) {
        const exercise = selectExerciseForConcept(weakConcepts[0].conceptId);
        if (exercise) return { ...exercise, reason: 'reinforcement' };
      }

      const unlockedConcepts = conceptsData.concepts
        .filter(c => isConceptUnlocked(c.id))
        .map(c => c.id);

      if (unlockedConcepts.length > 0) {
        const randomConcept = unlockedConcepts[Math.floor(Math.random() * unlockedConcepts.length)];
        const exercise = selectExerciseForConcept(randomConcept);
        if (exercise) return { ...exercise, reason: 'practice' };
      }
    }

    const allExercises = exercisesData.exercises.filter(ex =>
      isConceptUnlocked(ex.conceptId)
    );

    if (allExercises.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * allExercises.length);
    return { ...allExercises[randomIndex], reason: 'random' };
  }, [
    getDueReviews,
    getConceptsNearThreshold,
    getUnlockedUnstartedConcepts,
    getWeakestConcepts,
    selectExerciseForConcept,
    isConceptUnlocked
  ]);

  const getRecommendedAction = useCallback(() => {
    const dueReviews = getDueReviews();
    if (dueReviews.length > 0) {
      return {
        type: 'review',
        message: `${dueReviews.length} Konzept(e) zur Wiederholung fällig`,
        conceptIds: dueReviews.map(r => r.conceptId)
      };
    }

    const nearMastery = getConceptsNearThreshold();
    if (nearMastery.length > 0) {
      const concept = conceptsData.concepts.find(c => c.id === nearMastery[0].conceptId);
      return {
        type: 'near_mastery',
        message: `Fast geschafft: "${concept?.name}"`,
        conceptId: nearMastery[0].conceptId
      };
    }

    const unstartedConcepts = getUnlockedUnstartedConcepts();
    if (unstartedConcepts.length > 0) {
      const concept = conceptsData.concepts.find(c => c.id === unstartedConcepts[0]);
      return {
        type: 'new_concept',
        message: `Neues Thema: "${concept?.name}"`,
        conceptId: unstartedConcepts[0]
      };
    }

    const weakConcepts = getWeakestConcepts();
    if (weakConcepts.length > 0) {
      const concept = conceptsData.concepts.find(c => c.id === weakConcepts[0].conceptId);
      return {
        type: 'reinforce',
        message: `Verstärken: "${concept?.name}"`,
        conceptId: weakConcepts[0].conceptId
      };
    }

    return {
      type: 'practice',
      message: 'Weiter üben!',
      conceptId: null
    };
  }, [getDueReviews, getConceptsNearThreshold, getUnlockedUnstartedConcepts, getWeakestConcepts]);

  const recentPerformance = useMemo(() => {
    let total = 0;
    let correct = 0;

    Object.values(progress).forEach(p => {
      total += p.attempts.total;
      correct += p.attempts.correct;
    });

    return {
      total,
      correct,
      rate: total > 0 ? correct / total : 0
    };
  }, [progress]);

  const shouldShowHint = useCallback((conceptId) => {
    const conceptProgress = progress[conceptId];
    if (!conceptProgress) return false;

    return conceptProgress.streak < 0 ||
           (conceptProgress.attempts.total >= 3 &&
            conceptProgress.attempts.correct / conceptProgress.attempts.total < 0.5);
  }, [progress]);

  return {
    selectNextExercise,
    selectExerciseForConcept,
    getExercisesForConcept,
    getRecommendedAction,
    recentPerformance,
    shouldShowHint
  };
}

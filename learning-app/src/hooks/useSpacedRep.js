import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

const INTERVALS = [1, 3, 7, 14, 30, 60];

export function useSpacedRep() {
  const [reviewData, setReviewData] = useLocalStorage('mathapp_reviews', {});

  const calculateNextReview = useCallback((wasCorrect, currentIntervalDays = 0) => {
    if (!wasCorrect) {
      return 1;
    }

    const currentIndex = INTERVALS.indexOf(currentIntervalDays);
    if (currentIndex === -1) {
      return INTERVALS[0];
    }

    const nextIndex = Math.min(currentIndex + 1, INTERVALS.length - 1);
    return INTERVALS[nextIndex];
  }, []);

  const scheduleReview = useCallback((conceptId, wasCorrect) => {
    setReviewData(prev => {
      const conceptReview = prev[conceptId] || {
        intervalDays: 0,
        lastReview: null,
        nextReview: null,
        reviewCount: 0
      };

      const nextIntervalDays = calculateNextReview(wasCorrect, conceptReview.intervalDays);
      const now = new Date();
      const nextReviewDate = new Date(now);
      nextReviewDate.setDate(nextReviewDate.getDate() + nextIntervalDays);

      return {
        ...prev,
        [conceptId]: {
          intervalDays: nextIntervalDays,
          lastReview: now.toISOString(),
          nextReview: nextReviewDate.toISOString(),
          reviewCount: conceptReview.reviewCount + 1
        }
      };
    });
  }, [setReviewData, calculateNextReview]);

  const getDueReviews = useCallback(() => {
    const now = new Date();
    const dueReviews = [];

    Object.entries(reviewData).forEach(([conceptId, data]) => {
      if (!data.nextReview) return;

      const nextReviewDate = new Date(data.nextReview);
      if (nextReviewDate <= now) {
        dueReviews.push({
          conceptId,
          dueDate: nextReviewDate,
          overdueDays: Math.floor((now - nextReviewDate) / (1000 * 60 * 60 * 24)),
          intervalDays: data.intervalDays
        });
      }
    });

    return dueReviews.sort((a, b) => b.overdueDays - a.overdueDays);
  }, [reviewData]);

  const getUpcomingReviews = useCallback((days = 7) => {
    const now = new Date();
    const futureDate = new Date(now);
    futureDate.setDate(futureDate.getDate() + days);

    const upcoming = [];

    Object.entries(reviewData).forEach(([conceptId, data]) => {
      if (!data.nextReview) return;

      const nextReviewDate = new Date(data.nextReview);
      if (nextReviewDate > now && nextReviewDate <= futureDate) {
        upcoming.push({
          conceptId,
          dueDate: nextReviewDate,
          daysUntilDue: Math.ceil((nextReviewDate - now) / (1000 * 60 * 60 * 24))
        });
      }
    });

    return upcoming.sort((a, b) => a.daysUntilDue - b.daysUntilDue);
  }, [reviewData]);

  const getReviewStats = useCallback((conceptId) => {
    return reviewData[conceptId] || null;
  }, [reviewData]);

  const resetReviews = useCallback(() => {
    setReviewData({});
  }, [setReviewData]);

  return {
    scheduleReview,
    getDueReviews,
    getUpcomingReviews,
    getReviewStats,
    resetReviews,
    calculateNextReview,
    INTERVALS
  };
}

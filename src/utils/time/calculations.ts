import { Activity } from '../../types/activity';
import { calculateDuration } from './duration';

export const calculateTotalHours = (activities: Activity[]): number => {
  return activities.reduce((total, activity) => {
    const activityHours = activity.timeSlots.reduce((sum, slot) => {
      return sum + calculateDuration(slot.startTime, slot.endTime);
    }, 0);
    return total + activityHours;
  }, 0);
};

export const calculateRemainingHours = (activities: Activity[]): number => {
  const totalHours = calculateTotalHours(activities);
  return Math.max(0, 24 - totalHours);
};
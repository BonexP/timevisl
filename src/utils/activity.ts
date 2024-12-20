import { Activity, FormattedTimeSlot } from '../types/activity';

export const generateActivityId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const getAllTimeSlots = (activities: Activity[]): FormattedTimeSlot[] => {
  const slots = activities.flatMap(activity => 
    activity.timeSlots.map(slot => ({
      ...slot,
      activityId: activity.id,
      activityName: activity.name,
      color: activity.color
    }))
  );
  
  return slots.sort((a, b) => {
    const startA = parseTimeToMinutes(a.startTime);
    const startB = parseTimeToMinutes(b.startTime);
    return startA - startB;
  });
};
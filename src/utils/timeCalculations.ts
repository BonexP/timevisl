import { Activity, TimeSlot, FormattedTimeSlot } from '../types/activity';

export const parseTimeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export const formatMinutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60) % 24;
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

export const calculateDuration = (startTime: string, endTime: string): number => {
  let start = parseTimeToMinutes(startTime);
  let end = parseTimeToMinutes(endTime);
  
  // Handle cases where end time is on the next day
  if (end < start) {
    end += 24 * 60;
  }
  
  return (end - start) / 60;
};

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
  
  return slots.sort((a, b) => 
    parseTimeToMinutes(a.startTime) - parseTimeToMinutes(b.startTime)
  );
};
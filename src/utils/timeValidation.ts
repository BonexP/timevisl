import { Activity, TimeSlot } from '../types/activity';
import { parseTimeToMinutes } from './timeCalculations';

export const validateTimeSlot = (
  startTime: string,
  endTime: string
): { isValid: boolean; error?: string } => {
  const start = parseTimeToMinutes(startTime);
  const end = parseTimeToMinutes(endTime);
  
  if (start >= end) {
    return {
      isValid: false,
      error: 'End time must be after start time'
    };
  }
  
  if (start < 0 || end > 24 * 60) {
    return {
      isValid: false,
      error: 'Time must be within 24 hours'
    };
  }
  
  return { isValid: true };
};

export const checkTimeOverlap = (
  timeSlots: TimeSlot[],
  newStart: string,
  newEnd: string
): boolean => {
  const newStartMins = parseTimeToMinutes(newStart);
  const newEndMins = parseTimeToMinutes(newEnd);
  
  return timeSlots.some(slot => {
    const existingStart = parseTimeToMinutes(slot.startTime);
    const existingEnd = parseTimeToMinutes(slot.endTime);
    
    return (
      (newStartMins >= existingStart && newStartMins < existingEnd) ||
      (newEndMins > existingStart && newEndMins <= existingEnd) ||
      (newStartMins <= existingStart && newEndMins >= existingEnd)
    );
  });
};
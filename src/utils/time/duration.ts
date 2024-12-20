import { parseTimeToMinutes } from './parseTime';

export const calculateDuration = (startTime: string, endTime: string): number => {
  let start = parseTimeToMinutes(startTime);
  let end = parseTimeToMinutes(endTime);
  
  // Handle cases where end time is on the next day
  if (end < start) {
    end += 24 * 60;
  }
  
  return (end - start) / 60;
};
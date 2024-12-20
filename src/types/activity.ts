export interface TimeSlot {
  startTime: string; // 24-hour format HH:mm
  endTime: string;   // 24-hour format HH:mm
}

export interface Activity {
  id: string;
  name: string;
  timeSlots: TimeSlot[];
  color: string;
}

export interface FormattedTimeSlot extends TimeSlot {
  activityId: string;
  activityName: string;
  color: string;
}
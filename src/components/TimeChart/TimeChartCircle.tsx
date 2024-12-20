import React from 'react';
import { Activity } from '../../types/activity';
import { calculateDuration } from '../../utils/time/duration';

interface TimeChartCircleProps {
  activity: Activity;
  index: number;
  activities: Activity[];
}

export const TimeChartCircle: React.FC<TimeChartCircleProps> = ({
  activity,
  index,
  activities,
}) => {
  // Calculate total duration for this activity
  const activityDuration = activity.timeSlots.reduce((total, slot) => {
    return total + calculateDuration(slot.startTime, slot.endTime);
  }, 0);

  // Calculate percentage of 24 hours
  const percentage = (activityDuration / 24) * 100;

  // Calculate cumulative percentage from previous activities
  let cumulativePercentage = 0;
  for (let i = 0; i < index; i++) {
    const prevActivity = activities[i];
    const prevDuration = prevActivity.timeSlots.reduce((total, slot) => {
      return total + calculateDuration(slot.startTime, slot.endTime);
    }, 0);
    cumulativePercentage += (prevDuration / 24) * 100;
  }

  return (
    <circle
      cx="50%"
      cy="50%"
      r="35%"
      strokeWidth="30%"
      stroke={activity.color}
      fill="none"
      strokeDasharray={`${percentage} 100`}
      strokeDashoffset={-cumulativePercentage || 0}
      className="transition-all duration-300"
    />
  );
};
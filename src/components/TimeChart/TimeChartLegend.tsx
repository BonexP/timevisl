import React from 'react';
import { Activity } from '../../types/activity';
import { calculateDuration } from '../../utils/time/duration';

interface TimeChartLegendProps {
  activities: Activity[];
}

export const TimeChartLegend: React.FC<TimeChartLegendProps> = ({ activities }) => {
  return (
    <div className="mt-4 space-y-2">
      {activities.map((activity) => {
        const totalDuration = activity.timeSlots.reduce((total, slot) => {
          return total + calculateDuration(slot.startTime, slot.endTime);
        }, 0);

        return (
          <div key={activity.id} className="flex items-center space-x-2">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: activity.color }}
            />
            <span className="text-sm text-gray-700">{activity.name}</span>
            <span className="text-sm text-gray-500">
              ({totalDuration.toFixed(1)}h)
            </span>
          </div>
        );
      })}
    </div>
  );
};
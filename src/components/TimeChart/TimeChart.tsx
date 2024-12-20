import React from 'react';
import { PieChart } from 'lucide-react';
import { Activity } from '../../types/activity';
import { TimeChartCircle } from './TimeChartCircle';
import { calculateTotalHours } from '../../utils/time/calculations';

interface TimeChartProps {
  activities: Activity[];
}

export const TimeChart: React.FC<TimeChartProps> = ({ activities }) => {
  const totalHours = calculateTotalHours(activities);
  
  return (
    <div className="relative w-80 h-80">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {activities.map((activity, index) => (
          <TimeChartCircle
            key={activity.id}
            activity={activity}
            index={index}
            activities={activities}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <PieChart className="w-8 h-8 mx-auto mb-2 text-gray-600" />
          <p className="text-2xl font-bold">{totalHours.toFixed(1)}h</p>
          <p className="text-sm text-gray-500">Total Hours</p>
        </div>
      </div>
    </div>
  );
};
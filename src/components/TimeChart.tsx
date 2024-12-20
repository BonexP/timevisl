import React from 'react';
import { Pie } from 'lucide-react';

interface TimeActivity {
  id: string;
  name: string;
  hours: number;
  color: string;
}

interface TimeChartProps {
  activities: TimeActivity[];
}

export const TimeChart: React.FC<TimeChartProps> = ({ activities }) => {
  const totalHours = activities.reduce((sum, activity) => sum + activity.hours, 0);
  
  return (
    <div className="relative w-80 h-80">
      <svg className="w-full h-full transform -rotate-90">
        {activities.map((activity, index) => {
          const percentage = (activity.hours / 24) * 100;
          let cumulativePercentage = 0;
          for (let i = 0; i < index; i++) {
            cumulativePercentage += (activities[i].hours / 24) * 100;
          }
          
          return (
            <circle
              key={activity.id}
              cx="50%"
              cy="50%"
              r="35%"
              strokeWidth="30%"
              stroke={activity.color}
              fill="none"
              strokeDasharray={`${percentage} 100`}
              strokeDashoffset={-cumulativePercentage}
              className="transition-all duration-300"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <Pie className="w-8 h-8 mx-auto mb-2 text-gray-600" />
          <p className="text-2xl font-bold">{totalHours}h</p>
          <p className="text-sm text-gray-500">Total Hours</p>
        </div>
      </div>
    </div>
  );
};
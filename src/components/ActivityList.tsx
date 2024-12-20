import React from 'react';
import { Clock, Trash2 } from 'lucide-react';

interface Activity {
  id: string;
  name: string;
  hours: number;
  color: string;
}

interface ActivityListProps {
  activities: Activity[];
  onDelete: (id: string) => void;
}

export const ActivityList: React.FC<ActivityListProps> = ({ activities, onDelete }) => {
  return (
    <div className="space-y-3">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
          style={{ borderLeft: `4px solid ${activity.color}` }}
        >
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-gray-500" />
            <div>
              <h3 className="font-medium">{activity.name}</h3>
              <p className="text-sm text-gray-500">{activity.hours} hours</p>
            </div>
          </div>
          <button
            onClick={() => onDelete(activity.id)}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
};
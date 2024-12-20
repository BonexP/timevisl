import React from 'react';
import { Activity } from '../../types/activity';
import { ActivityItem } from './ActivityItem';

interface ActivityListProps {
  activities: Activity[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Activity>) => void;
}

export const ActivityList: React.FC<ActivityListProps> = ({ 
  activities, 
  onDelete,
  onUpdate
}) => {
  return (
    <div className="space-y-3">
      {activities.map((activity) => (
        <ActivityItem
          key={activity.id}
          activity={activity}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};
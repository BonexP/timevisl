import React from 'react';
import { Activity } from '../../types/activity';
import { getAllTimeSlots } from '../../utils/timeCalculations';
import { TimelineHeader } from './TimelineHeader';
import { TimelineContent } from './TimelineContent';

interface TimelineProps {
  activities: Activity[];
}

export const Timeline: React.FC<TimelineProps> = ({ activities }) => {
  const timeSlots = getAllTimeSlots(activities);
  
  return (
    <div className="relative">
      {/* Scrollable container */}
      <div className="overflow-x-auto overflow-y-hidden">
        <div className="min-w-[800px] p-4">
          <TimelineHeader />
          <TimelineContent timeSlots={timeSlots} />
        </div>
      </div>
      
      {/* Fade edges for better scroll indication */}
      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
    </div>
  );
};
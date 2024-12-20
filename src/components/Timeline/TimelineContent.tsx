import React from 'react';
import { FormattedTimeSlot } from '../../types/activity';
import { TimelineSlot } from './TimelineSlot';

interface TimelineContentProps {
  timeSlots: FormattedTimeSlot[];
}

export const TimelineContent: React.FC<TimelineContentProps> = ({ timeSlots }) => {
  return (
    <div className="relative h-16 mt-8">
      {/* Background grid */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="flex-1 relative">
            <div className="absolute top-0 left-0 w-px h-full bg-gray-100" />
          </div>
        ))}
      </div>
      
      {/* Activity slots */}
      {timeSlots.map((slot, index) => (
        <TimelineSlot key={`${slot.activityId}-${index}`} slot={slot} />
      ))}
    </div>
  );
};
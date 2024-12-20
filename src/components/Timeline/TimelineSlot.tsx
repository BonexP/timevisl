import React from 'react';
import { FormattedTimeSlot } from '../../types/activity';
import { parseTimeToMinutes } from '../../utils/timeCalculations';

interface TimelineSlotProps {
  slot: FormattedTimeSlot;
}

export const TimelineSlot: React.FC<TimelineSlotProps> = ({ slot }) => {
  const startMinutes = parseTimeToMinutes(slot.startTime);
  const endMinutes = parseTimeToMinutes(slot.endTime);
  const startPercent = (startMinutes / (24 * 60)) * 100;
  const width = ((endMinutes - startMinutes) / (24 * 60)) * 100;

  return (
    <div
      className="absolute h-12 rounded-lg flex items-center justify-center text-xs text-white overflow-hidden group transition-all duration-200 hover:h-14 hover:z-10"
      style={{
        left: `${startPercent}%`,
        width: `${width}%`,
        backgroundColor: slot.color,
      }}
    >
      <div className="px-2 truncate">
        <span className="font-medium">{slot.activityName}</span>
        <span className="hidden group-hover:inline ml-1 opacity-75">
          ({slot.startTime}-{slot.endTime})
        </span>
      </div>
    </div>
  );
};
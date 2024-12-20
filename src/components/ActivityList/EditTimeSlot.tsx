import React from 'react';
import { X } from 'lucide-react';
import { TimeSlot } from '../../types/activity';

interface EditTimeSlotProps {
  timeSlot: TimeSlot;
  onChange: (updates: Partial<TimeSlot>) => void;
  onRemove: () => void;
  showRemove: boolean;
}

export const EditTimeSlot: React.FC<EditTimeSlotProps> = ({
  timeSlot,
  onChange,
  onRemove,
  showRemove
}) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="time"
        value={timeSlot.startTime}
        onChange={(e) => onChange({ startTime: e.target.value })}
        className="px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <span className="text-gray-500">-</span>
      <input
        type="time"
        value={timeSlot.endTime}
        onChange={(e) => onChange({ endTime: e.target.value })}
        className="px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {showRemove && (
        <button
          onClick={onRemove}
          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          title="Remove time slot"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
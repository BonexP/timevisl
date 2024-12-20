import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ACTIVITY_COLORS } from '../../constants/colors';
import { ColorPicker } from './ColorPicker';
import { Activity } from '../../types/activity';
import { validateTimeSlot } from '../../utils/time/validation';
import { calculateTotalHours } from '../../utils/time/calculations';
import { parseTimeToMinutes } from '../../utils/time/parseTime';

interface AddActivityProps {
  onAdd: (name: string, startTime: string, endTime: string, color: string) => void;
  activities: Activity[];
}

export const AddActivity: React.FC<AddActivityProps> = ({ onAdd, activities }) => {
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [color, setColor] = useState(ACTIVITY_COLORS[0]);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate time slot
    const validation = validateTimeSlot(startTime, endTime);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid time slot');
      return;
    }

    // Check total hours
    const totalHours = calculateTotalHours(activities);
    const newDuration = (parseTimeToMinutes(endTime) - parseTimeToMinutes(startTime)) / 60;
    if (totalHours + newDuration > 24) {
      setError('Total activities cannot exceed 24 hours');
      return;
    }

    onAdd(name, startTime, endTime, color);
    setName('');
    setStartTime('');
    setEndTime('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Activity Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="e.g., Work, Sleep, Exercise"
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <ColorPicker selectedColor={color} onColorSelect={setColor} />

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Activity
      </button>
    </form>
  );
};
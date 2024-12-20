import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddActivityProps {
  onAdd: (name: string, hours: number, color: string) => void;
  remainingHours: number;
}

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
  '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'
];

export const AddActivity: React.FC<AddActivityProps> = ({ onAdd, remainingHours }) => {
  const [name, setName] = useState('');
  const [hours, setHours] = useState('');
  const [color, setColor] = useState(COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && hours && parseFloat(hours) <= remainingHours) {
      onAdd(name, parseFloat(hours), color);
      setName('');
      setHours('');
    }
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
      
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Hours ({remainingHours} remaining)
        </label>
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          min="0.5"
          max={remainingHours}
          step="0.5"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Color</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-full ${
                color === c ? 'ring-2 ring-offset-2 ring-blue-500' : ''
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={remainingHours === 0}
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Activity
      </button>
    </form>
  );
};
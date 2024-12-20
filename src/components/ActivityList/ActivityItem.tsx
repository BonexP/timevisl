import React, { useState } from 'react';
import { Clock, Trash2, Edit2, Check, X } from 'lucide-react';
import { Activity, TimeSlot } from '../../types/activity';
import { calculateDuration } from '../../utils/time/duration';
import { EditTimeSlot } from './EditTimeSlot';

interface ActivityItemProps {
  activity: Activity;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Activity>) => void;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ 
  activity, 
  onDelete,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(activity.name);
  const [editedTimeSlots, setEditedTimeSlots] = useState<TimeSlot[]>(activity.timeSlots);

  const totalHours = activity.timeSlots.reduce((sum, slot) => {
    return sum + calculateDuration(slot.startTime, slot.endTime);
  }, 0);

  const handleSave = () => {
    onUpdate(activity.id, {
      name: editedName,
      timeSlots: editedTimeSlots
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(activity.name);
    setEditedTimeSlots(activity.timeSlots);
    setIsEditing(false);
  };

  const updateTimeSlot = (index: number, updates: Partial<TimeSlot>) => {
    const updatedSlots = editedTimeSlots.map((slot, i) => 
      i === index ? { ...slot, ...updates } : slot
    );
    setEditedTimeSlots(updatedSlots);
  };

  const addTimeSlot = () => {
    setEditedTimeSlots([...editedTimeSlots, { startTime: '09:00', endTime: '10:00' }]);
  };

  const removeTimeSlot = (index: number) => {
    setEditedTimeSlots(editedTimeSlots.filter((_, i) => i !== index));
  };

  return (
    <div
      className="space-y-2 p-4 bg-white rounded-lg shadow-sm"
      style={{ borderLeft: `4px solid ${activity.color}` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <Clock className="w-5 h-5 text-gray-500" />
          {isEditing ? (
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <h3 className="font-medium">{activity.name}</h3>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-1 text-green-600 hover:text-green-700 transition-colors"
                title="Save changes"
              >
                <Check className="w-5 h-5" />
              </button>
              <button
                onClick={handleCancel}
                className="p-1 text-gray-400 hover:text-gray-500 transition-colors"
                title="Cancel editing"
              >
                <X className="w-5 h-5" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                title="Edit activity"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(activity.id)}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                title="Delete activity"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="pl-8 space-y-2">
        {(isEditing ? editedTimeSlots : activity.timeSlots).map((slot, index) => (
          <div key={index} className="flex items-center space-x-2">
            {isEditing ? (
              <EditTimeSlot
                timeSlot={slot}
                onChange={(updates) => updateTimeSlot(index, updates)}
                onRemove={() => removeTimeSlot(index)}
                showRemove={editedTimeSlots.length > 1}
              />
            ) : (
              <p className="text-sm text-gray-600">
                {slot.startTime} - {slot.endTime}
              </p>
            )}
          </div>
        ))}
        
        {isEditing && (
          <button
            onClick={addTimeSlot}
            className="text-sm text-blue-500 hover:text-blue-600 font-medium"
          >
            + Add another time slot
          </button>
        )}
        
        <p className="text-sm font-medium text-gray-700">
          Total: {totalHours.toFixed(1)} hours
        </p>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { Activity } from './types/activity';
import { TimeChart } from './components/TimeChart/TimeChart';
import { TimeChartLegend } from './components/TimeChart/TimeChartLegend';
import { Timeline } from './components/Timeline/Timeline';
import { ActivityList } from './components/ActivityList/ActivityList';
import { AddActivity } from './components/AddActivity/AddActivity';
import { calculateRemainingHours } from './utils/time/calculations';
import { validateTimeSlot } from './utils/time/validation';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const remainingHours = calculateRemainingHours(activities);

  const handleAddActivity = (name: string, startTime: string, endTime: string, color: string) => {
    const existingActivity = activities.find(a => a.name === name);
    
    if (existingActivity) {
      setActivities(activities.map(activity => 
        activity.id === existingActivity.id
          ? {
              ...activity,
              timeSlots: [...activity.timeSlots, { startTime, endTime }]
            }
          : activity
      ));
    } else {
      setActivities([
        ...activities,
        {
          id: Date.now().toString(),
          name,
          timeSlots: [{ startTime, endTime }],
          color,
        },
      ]);
    }
  };

  const handleUpdateActivity = (id: string, updates: Partial<Activity>) => {
    setActivities(activities.map(activity => 
      activity.id === id
        ? { ...activity, ...updates }
        : activity
    ));
  };

  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter((activity) => activity.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center">
            <Clock className="w-8 h-8 mr-2 text-blue-600" />
            Daily Time Allocation
          </h1>
          <p className="mt-2 text-gray-600">
            Track and visualize how you spend your 24 hours
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Timeline View</h2>
              <Timeline activities={activities} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Time Distribution</h2>
              <div className="flex flex-col items-center">
                <TimeChart activities={activities} />
                <TimeChartLegend activities={activities} />
              </div>
              <div className="text-center mt-4">
                <p className="text-lg font-medium text-gray-900">
                  {remainingHours.toFixed(1)} hours remaining
                </p>
                <p className="text-sm text-gray-500">
                  Plan your day wisely!
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Add New Activity</h2>
              <AddActivity onAdd={handleAddActivity} activities={activities} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Activities</h2>
              <ActivityList
                activities={activities}
                onDelete={handleDeleteActivity}
                onUpdate={handleUpdateActivity}
              />
              {activities.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  No activities added yet. Start by adding your daily activities!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
import React from 'react';

export const TimelineHeader: React.FC = () => {
  return (
    <div className="relative h-12 border-b border-gray-200">
      <div className="absolute inset-0 flex">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="flex-1 relative">
            <div className="absolute left-0 -bottom-6 transform -translate-x-1/2">
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {i.toString().padStart(2, '0')}:00
              </span>
            </div>
            {/* Vertical grid line */}
            <div className="absolute top-0 left-0 w-px h-full bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
};
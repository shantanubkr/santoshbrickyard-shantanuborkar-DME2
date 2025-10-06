import React from 'react';
import { GameState, ALL_EVENT_TYPES } from '../data/events';

interface EventProgressBarProps {
  gameState: GameState;
}

const EventProgressBar: React.FC<EventProgressBarProps> = ({ gameState }) => {
  const totalEvents = ALL_EVENT_TYPES.length; // Total number of main event types
  const completedEvents = ALL_EVENT_TYPES.filter(eventType => gameState.seenEvents.has(eventType)).length;
  const progressPercentage = (completedEvents / totalEvents) * 100;

  return (
    <div className="absolute top-24 left-4 right-4 z-10 p-4 rounded-lg" style={{ 
      backgroundColor: '#FFF4E6'
    }}>
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <span className="text-lg">📋</span>
            <span className="pixel-subheading text-shadow" style={{ color: '#64250A', fontSize: '14px' }}>
              Event Progress
            </span>
            <span className="pixel-text text-shadow" style={{ color: '#64250A', fontSize: '14px' }}>
              ({completedEvents}/{totalEvents})
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="pixel-text text-shadow" style={{ color: '#64250A', fontSize: '12px' }}>
              {progressPercentage === 100 
                ? 'All events completed! Journey ending soon...' 
                : `${Math.round(progressPercentage)}% Complete`
              }
            </span>
          </div>
        </div>
        
        {/* Progress Bar Container */}
        <div className="w-full bg-gray-300 rounded-full h-4 border-2 border-gray-400" style={{ backgroundColor: '#D4C4B0' }}>
          <div 
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ 
              width: `${progressPercentage}%`,
              backgroundColor: progressPercentage === 100 ? '#4CAF50' : '#8B4513',
              background: progressPercentage === 100 
                ? 'linear-gradient(90deg, #4CAF50 0%, #66BB6A 100%)' 
                : 'linear-gradient(90deg, #8B4513 0%, #A0522D 100%)'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EventProgressBar;

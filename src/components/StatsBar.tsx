import React from 'react';
import { GameState } from '../data/events';

interface StatsBarProps {
  gameState: GameState;
}

const StatsBar: React.FC<StatsBarProps> = ({ gameState }) => {

  const getPulseClass = (value: number, threshold: number) => {
    return value < threshold ? 'animate-pulse-slow' : '';
  };

  return (
    <div className="absolute top-4 left-4 right-4 z-10 p-4 rounded-lg" style={{ 
      backgroundColor: '#FFF4E6'
    }}>
      <div className="grid grid-cols-6 gap-2 items-center">
        <div className={`flex flex-col items-center ${getPulseClass(gameState.cash, 200)}`}>
          <span className="text-lg">💰</span>
          <span className="pixel-subheading text-shadow" style={{ color: '#64250A', fontSize: '12px' }}>Cash</span>
          <span className="pixel-text text-shadow" style={{ color: '#64250A', fontSize: '14px' }}>₹{gameState.cash}</span>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="text-lg">🧱</span>
          <span className="pixel-subheading text-shadow" style={{ color: '#64250A', fontSize: '12px' }}>Bricks</span>
          <span className="pixel-text text-shadow" style={{ color: '#64250A', fontSize: '14px' }}>{gameState.brickInventory}</span>
        </div>
        
        <div className={`flex flex-col items-center ${getPulseClass(gameState.ecoScore, 30)}`}>
          <span className="text-lg">🌱</span>
          <span className="pixel-subheading text-shadow" style={{ color: '#64250A', fontSize: '12px' }}>Eco</span>
          <span className="pixel-text text-shadow" style={{ color: '#64250A', fontSize: '14px' }}>{gameState.ecoScore}</span>
        </div>
        
        <div className={`flex flex-col items-center ${getPulseClass(gameState.reputation, 30)}`}>
          <span className="text-lg">⭐</span>
          <span className="pixel-subheading text-shadow" style={{ color: '#64250A', fontSize: '12px' }}>Rep</span>
          <span className="pixel-text text-shadow" style={{ color: '#64250A', fontSize: '14px' }}>{gameState.reputation}</span>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="text-lg">📈</span>
          <span className="pixel-subheading text-shadow" style={{ color: '#64250A', fontSize: '12px' }}>Demand</span>
          <span className="pixel-text text-shadow font-bold" style={{ color: '#64250A', fontSize: '14px' }}>
            {gameState.demand.toUpperCase()}
          </span>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="text-lg">⚒️</span>
          <span className="pixel-subheading text-shadow" style={{ color: '#64250A', fontSize: '12px' }}>Production</span>
          <span className="pixel-text text-shadow" style={{ color: '#64250A', fontSize: '14px' }}>{gameState.productionCapacity}</span>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;

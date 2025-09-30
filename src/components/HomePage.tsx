import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/game');
  };

  return (
    <div 
      className="h-screen w-screen relative bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
      style={{ backgroundImage: 'url(/src/assets/backgrounds/homepage.png)' }}
    >
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-20 pointer-events-none"></div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Title */}
        <div className="space-y-4">
          <h1 className="pixel-heading text-6xl md:text-8xl text-shadow" style={{ color: '#FFF4E6' }}>
            SANTOSH'S
          </h1>
          <h2 className="pixel-heading text-4xl md:text-6xl text-shadow" style={{ color: '#FFF4E6' }}>
            BRICKYARD
          </h2>
        </div>
      </div>

      {/* Santosh Character - Bottom Left */}
      <div className="absolute bottom-0 left-0 z-10">
        <img 
          src="/src/assets/characters/santosh.gif" 
          alt="Santosh"
          className="w-96 h-[28rem] object-contain object-bottom"
        />
      </div>

      {/* Centered Content Below */}
      <div className="relative z-10 text-center space-y-8 mt-8">

        {/* Start Game Button */}
        <div className="pt-8">
          <button
            onClick={handleStartGame}
            className="pixel-button text-2xl md:text-3xl px-12 py-6 transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: '#8B4513',
              color: '#FFF4E6',
              border: '4px solid #64250A',
              boxShadow: '8px 8px 0px #64250A',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#A0522D';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '10px 10px 0px #64250A';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#8B4513';
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = '8px 8px 0px #64250A';
            }}
          >
            🧱 START GAME 🧱
          </button>
        </div>

        {/* Game Description */}
        <div className="pt-4 max-w-2xl mx-auto">
          <p className="pixel-text text-lg text-shadow" style={{ color: '#FFF4E6' }}>
            Build your brick empire from the ground up! Make tough business decisions, 
            manage resources, and grow Santosh's brickyard into a thriving enterprise.
          </p>
        </div>

        {/* Brick Icons */}
        <div className="flex justify-center space-x-4 pt-6">
          <div className="text-4xl">🧱</div>
          <div className="text-4xl">🏗️</div>
          <div className="text-4xl">⚒️</div>
          <div className="text-4xl">💰</div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="pixel-text text-sm text-shadow" style={{ color: '#FFF4E6' }}>
          © 2025 Shantanu Borkar
        </p>
      </div>
    </div>
  );
};

export default HomePage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface EndScreenProps {
  onRestart: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ onRestart }) => {
  const navigate = useNavigate();
  const [showTeam, setShowTeam] = useState(false);

  useEffect(() => {
    // Show team after a short delay
    const timer = setTimeout(() => setShowTeam(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const teamMembers = [
    { name: 'Shantanu Borkar', image: 'shantanu.png' },
    { name: 'Samruddhi Mullerpatan', image: 'samruddhi.png' },
    { name: 'Kavya Karkhanis', image: 'kavya.png' },
    { name: 'Anindita V. Hazra', image: 'anindita.png' },
    { name: 'Twisha Sawant', image: 'twisha.png' },
    { name: 'Ananya Naidu', image: 'ananya.png' }
  ];

  const handleExit = () => {
    navigate('/');
  };

  return (
    <div 
      className="h-screen w-screen relative bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
      style={{ backgroundImage: 'url(/src/assets/backgrounds/brickyard.png)' }}
    >
      {/* Sunset overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-600 via-yellow-400 to-orange-300 opacity-60 pointer-events-none"></div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8">
        {/* The End Title */}
        <div className="space-y-4">
          <h1 className="pixel-heading text-6xl md:text-8xl text-shadow" style={{ color: '#FFF4E6' }}>
            THE END
          </h1>
          <p className="pixel-text text-2xl text-shadow" style={{ color: '#FFF4E6' }}>
            Thank you for playing Santosh's Brickyard
          </p>
        </div>

        {/* Team Characters */}
        {showTeam && (
          <div className="flex flex-wrap justify-center items-end gap-8 pt-8">
            {teamMembers.map((member, index) => (
              <div 
                key={member.name}
                className="flex flex-col items-center space-y-1 animate-bounce"
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  animationDuration: '2s',
                  animationIterationCount: 'infinite'
                }}
              >
                <img 
                  src={`/src/assets/characters/${member.image}`}
                  alt={member.name}
                  className="w-36 h-48 object-contain drop-shadow-lg"
                  style={{ filter: 'drop-shadow(4px 4px 0px #5A5A5A)' }}
                />
                <p className="pixel-text text-sm text-shadow text-center" style={{ color: '#FFF4E6', maxWidth: '100px' }}>
                  {member.name.split(' ')[0]}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 pt-12 justify-center items-center">
          <button
            onClick={onRestart}
            className="text-center transition-all duration-200 active:scale-95 rounded-lg px-12 py-6"
            style={{
              backgroundColor: '#8B4513',
              color: '#FFF4E6',
              border: '4px solid #64250A',
              boxShadow: '8px 8px 0px #64250A',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontSize: '18px'
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
            🔄 Restart Game
          </button>
          
          <button
            onClick={handleExit}
            className="text-center transition-all duration-200 active:scale-95 rounded-lg px-12 py-6"
            style={{
              backgroundColor: '#64250A',
              color: '#FFF4E6',
              border: '4px solid #8B4513',
              boxShadow: '8px 8px 0px #8B4513',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontSize: '18px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#7B351B';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '10px 10px 0px #8B4513';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#64250A';
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = '8px 8px 0px #8B4513';
            }}
          >
            🚪 Exit
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="pixel-text text-sm text-shadow" style={{ color: '#FFF4E6' }}>
          © 2025 Shantanu Borkar - Made with ❤️ by the team
        </p>
      </div>
    </div>
  );
};

export default EndScreen;

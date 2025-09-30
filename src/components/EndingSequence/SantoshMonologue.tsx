import React, { useState, useEffect } from 'react';

interface SantoshMonologueProps {
  onContinue: () => void;
}

const SantoshMonologue: React.FC<SantoshMonologueProps> = ({ onContinue }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  const fullText = "I started with nothing but a kiln and a dream.\nThrough rain, debt, and deals gone wrong… we kept building.\nA brickyard isn't just mud and fire — it's people, trust, and persistence.\nAnd if I could do it, so can you.";

  useEffect(() => {
    let index = 0;
    const typeWriter = () => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
        setTimeout(typeWriter, 50);
      } else {
        setIsTyping(false);
      }
    };
    typeWriter();
  }, []);

  return (
    <div 
      className="h-screen w-screen relative bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: 'url(/src/assets/backgrounds/brickyard.png)' }}
    >
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30 pointer-events-none"></div>
      
      {/* Santosh Character - Animated GIF */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5">
        <img 
          src="/src/assets/characters/santosh.gif" 
          alt="Santosh"
          className="w-96 h-[30rem] object-contain"
        />
      </div>

      {/* Dialogue Box */}
      <div className="absolute bottom-8 left-8 right-8 z-10">
        <div className="max-w-4xl mx-auto p-6 rounded-lg" style={{ 
          backgroundColor: '#FFF4E6',
          border: '2px solid #64250A'
        }}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#64250A' }}>
              <img 
                src="/src/assets/characters/santosh.gif" 
                alt="Santosh"
                className="w-12 h-12 object-contain"
              />
            </div>
            <div>
              <h3 className="pixel-heading text-xl text-shadow" style={{ color: '#64250A' }}>
                SANTOSH
              </h3>
            </div>
          </div>
          
          <div className="pixel-text text-lg leading-relaxed mb-6 text-shadow" style={{ color: '#64250A' }}>
            {displayText.split('\n').map((line, index) => (
              <div key={index} className="mb-2">
                {line}
                {index === displayText.split('\n').length - 1 && isTyping && <span className="animate-blink">|</span>}
              </div>
            ))}
          </div>
          
          {!isTyping && (
            <div className="text-center">
              <button
                onClick={onContinue}
                className="text-center transition-all duration-200 active:scale-95 rounded-lg px-8 py-3"
                style={{ 
                  backgroundColor: '#64250A',
                  color: '#FFF4E6',
                  border: 'none'
                }}
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SantoshMonologue;

import React, { useState, useEffect } from 'react';
import { Choice } from '../data/events';
import ChoiceButtons from './ChoiceButtons';

interface DialogBoxProps {
  speaker: string;
  text: string;
  choices: Choice[];
  onChoiceSelect: (choice: Choice) => void;
}

const DialogBox: React.FC<DialogBoxProps> = ({ speaker, text, choices, onChoiceSelect }) => {
  const [displayText, setDisplayText] = useState('');
  const [showChoices, setShowChoices] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setDisplayText('');
    setShowChoices(false);
    setIsTyping(true);
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
        setTimeout(typeWriter, 30);
      } else {
        setIsTyping(false);
        setShowChoices(true);
      }
    };
    
    typeWriter();
  }, [text]);

  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
      <div className="max-h-96 overflow-hidden rounded-lg p-6" style={{ 
        backgroundColor: '#FFF4E6'
      }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#64250A' }}>
            <span className="text-2xl">
              {speaker === 'Santosh' ? '👨' : 
               speaker === 'Worker' ? '👷' : 
               speaker === 'Client' ? '👔' : 
               speaker === 'Banker' ? '🏦' : '👤'}
            </span>
          </div>
          <div>
            <h3 className="pixel-heading text-shadow" style={{ color: '#64250A' }}>
              {speaker.toUpperCase()}
            </h3>
          </div>
        </div>
        
        <div className="pixel-text leading-relaxed mb-6 max-h-32 overflow-y-auto text-lg" style={{ color: '#64250A' }}>
          {displayText}
          {isTyping && <span className="animate-blink">|</span>}
        </div>
        
        {showChoices && choices.length > 0 && (
          <div className="overflow-hidden mt-2">
            <ChoiceButtons choices={choices} onChoiceSelect={onChoiceSelect} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DialogBox;

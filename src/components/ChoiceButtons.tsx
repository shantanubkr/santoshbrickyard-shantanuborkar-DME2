import React from 'react';
import { Choice } from '../data/events';

interface ChoiceButtonsProps {
  choices: Choice[];
  onChoiceSelect: (choice: Choice) => void;
}

const ChoiceButtons: React.FC<ChoiceButtonsProps> = ({ choices, onChoiceSelect }) => {
  return (
    <div className="flex flex-col gap-2 mt-4">
      {choices.map((choice, index) => (
        <button
          key={index}
          className="w-full text-left transition-all duration-200 active:scale-95 rounded-lg"
          style={{ 
            animationDelay: `${index * 0.1}s`,
            backgroundColor: '#64250A',
            color: '#FFF4E6',
            padding: '16px 20px',
            border: 'none',
            boxShadow: '8px 8px 0px -2px #919191',
            marginBottom: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '10px 10px 0px -2px #919191';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = '8px 8px 0px -2px #919191';
          }}
          onClick={() => onChoiceSelect(choice)}
        >
          {choice.text}
        </button>
      ))}
    </div>
  );
};

export default ChoiceButtons;

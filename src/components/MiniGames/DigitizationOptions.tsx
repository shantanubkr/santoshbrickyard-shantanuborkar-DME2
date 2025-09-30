import React from 'react';

interface DigitizationOptionProps {
  option: 'webpage' | 'indiamart' | 'both' | 'ignore';
  cost: number;
  reputationEffect: number;
  demandEffect: 'low' | 'medium' | 'high';
  description: string;
  onSelect: () => void;
  isSelected: boolean;
}

const DigitizationOption: React.FC<DigitizationOptionProps> = ({
  option,
  cost,
  reputationEffect,
  demandEffect,
  description,
  onSelect,
  isSelected
}) => {
  const getOptionName = () => {
    switch (option) {
      case 'webpage': return 'Create Business Webpage';
      case 'indiamart': return 'List on Indiamart';
      case 'both': return 'Do Both';
      case 'ignore': return 'Ignore Digital';
      default: return 'Option';
    }
  };

  const getOptionIcon = () => {
    switch (option) {
      case 'webpage': return '🌐';
      case 'indiamart': return '🏪';
      case 'both': return '🚀';
      case 'ignore': return '❌';
      default: return '📱';
    }
  };

  const getDemandColor = () => {
    switch (demandEffect) {
      case 'low': return '#DC2626';
      case 'medium': return '#F59E0B';
      case 'high': return '#16A34A';
      default: return '#6B7280';
    }
  };

  return (
    <div
      className={`cursor-pointer transition-all duration-200 rounded-lg p-6 ${
        isSelected ? 'ring-4 ring-brick-light' : ''
      }`}
      style={{
        backgroundColor: isSelected ? '#FFF4E6' : '#FFF4E6',
        border: '2px solid #64250A'
      }}
      onClick={onSelect}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.transform = 'translateY(0px)';
        }
      }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="text-3xl">{getOptionIcon()}</div>
        <h3 className="pixel-heading text-lg" style={{ color: '#64250A' }}>
          {getOptionName()}
        </h3>
      </div>
      
      <p className="text-sm mb-4" style={{ color: '#64250A' }}>
        {description}
      </p>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span style={{ color: '#64250A' }}>Cost:</span>
          <span style={{ color: cost > 0 ? '#DC2626' : '#16A34A' }}>
            {cost > 0 ? `₹${cost}` : 'Free'}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: '#64250A' }}>Reputation:</span>
          <span style={{ color: reputationEffect > 0 ? '#16A34A' : reputationEffect < 0 ? '#DC2626' : '#6B7280' }}>
            {reputationEffect > 0 ? '+' : ''}{reputationEffect}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: '#64250A' }}>Demand:</span>
          <span className="font-bold" style={{ color: getDemandColor() }}>
            {demandEffect.toUpperCase()}
          </span>
        </div>
      </div>
      
      {isSelected && (
        <div className="mt-4 text-center">
          <span className="pixel-text font-bold" style={{ color: '#64250A' }}>SELECTED</span>
        </div>
      )}
    </div>
  );
};

export default DigitizationOption;

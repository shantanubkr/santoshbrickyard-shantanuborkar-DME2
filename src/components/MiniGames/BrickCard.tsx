import React from 'react';

interface BrickCardProps {
  brickType: 'clay' | 'flyash' | 'cement';
  cost: number;
  sellingPrice: number;
  ecoImpact: number;
  reputationEffect: number;
  demandPercent: number;
  onSelect: () => void;
  isSelected: boolean;
}

const BrickCard: React.FC<BrickCardProps> = ({
  brickType,
  cost,
  sellingPrice,
  ecoImpact,
  reputationEffect,
  demandPercent,
  onSelect,
  isSelected
}) => {
  const getBrickName = () => {
    switch (brickType) {
      case 'clay': return 'Clay Brick';
      case 'flyash': return 'Fly Ash Brick';
      case 'cement': return 'Cement Brick';
      default: return 'Brick';
    }
  };

  const profit = sellingPrice - cost;
  const profitMargin = ((profit / cost) * 100).toFixed(1);

  return (
    <div
      className={`cursor-pointer transition-all duration-200 rounded-lg p-4 ${
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
      <div className="flex items-center gap-3 mb-4">
        <img 
          src={`/src/assets/characters/${brickType}.png`}
          alt={brickType}
          className="w-12 h-12 object-contain"
        />
        <h3 className="pixel-heading text-lg" style={{ color: '#64250A' }}>{getBrickName()}</h3>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span style={{ color: '#64250A' }}>Cost:</span>
          <span style={{ color: '#DC2626' }}>₹{cost}</span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: '#64250A' }}>Selling Price:</span>
          <span style={{ color: '#16A34A' }}>₹{sellingPrice}</span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: '#64250A' }}>Profit:</span>
          <span style={{ color: profit > 0 ? '#16A34A' : '#DC2626' }}>
            ₹{profit} ({profitMargin}%)
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: '#64250A' }}>Eco Impact:</span>
          <span style={{ color: ecoImpact > 0 ? '#16A34A' : '#DC2626' }}>
            {ecoImpact > 0 ? '+' : ''}{ecoImpact}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: '#64250A' }}>Reputation:</span>
          <span style={{ color: reputationEffect > 0 ? '#16A34A' : '#DC2626' }}>
            {reputationEffect > 0 ? '+' : ''}{reputationEffect}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: '#64250A' }}>Demand:</span>
          <span style={{ color: '#2563EB' }}>{demandPercent}%</span>
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

export default BrickCard;

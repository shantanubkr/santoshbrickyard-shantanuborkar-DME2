import React, { useState, useEffect } from 'react';

interface NegotiationSliderProps {
  basePrice: number;
  minPrice: number;
  maxPrice: number;
  onPriceChange: (price: number) => void;
  onAccept: (price: number) => void;
  onReject: () => void;
  clientType: 'small' | 'big';
  riskLevel: 'low' | 'medium' | 'high';
}

const NegotiationSlider: React.FC<NegotiationSliderProps> = ({
  basePrice,
  minPrice,
  maxPrice,
  onPriceChange,
  onAccept,
  onReject,
  clientType,
  riskLevel
}) => {
  const [price, setPrice] = useState(basePrice);
  const [isNegotiating, setIsNegotiating] = useState(false);
  const [negotiationResult, setNegotiationResult] = useState<'pending' | 'success' | 'failure'>('pending');

  useEffect(() => {
    onPriceChange(price);
  }, [price, onPriceChange]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(e.target.value));
  };

  const handleNegotiate = () => {
    setIsNegotiating(true);
    
    // Simulate negotiation with risk-based success
    const riskMultiplier = riskLevel === 'low' ? 0.8 : riskLevel === 'medium' ? 0.6 : 0.4;
    const success = Math.random() < riskMultiplier;
    
    setTimeout(() => {
      setNegotiationResult(success ? 'success' : 'failure');
      setIsNegotiating(false);
    }, 1500);
  };

  const getRiskColor = () => {
    switch (riskLevel) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-cream';
    }
  };

  const getClientIcon = () => {
    return clientType === 'big' ? '🏢' : '🏗️';
  };

  const profit = price - basePrice;
  const profitPercent = ((profit / basePrice) * 100).toFixed(1);

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg" style={{ 
      backgroundColor: '#FFF4E6',
      border: '2px solid #64250A'
    }}>
      <div className="text-center mb-4">
        <div className="text-4xl mb-2">{getClientIcon()}</div>
        <h3 className="pixel-heading text-lg" style={{ color: '#64250A' }}>
          {clientType === 'big' ? 'Big Builder' : 'Small Contractor'}
        </h3>
        <p className="pixel-text text-base" style={{ color: '#64250A' }}>
          Risk Level: <span className={getRiskColor()}>{riskLevel.toUpperCase()}</span>
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="pixel-text text-base block mb-2" style={{ color: '#64250A' }}>
            Negotiated Price: ₹{price}
          </label>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={price}
            onChange={handleSliderChange}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
            style={{ backgroundColor: '#64250A' }}
            disabled={isNegotiating}
          />
          <div className="flex justify-between text-sm mt-1" style={{ color: '#64250A' }}>
            <span>₹{minPrice}</span>
            <span>₹{maxPrice}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <span className="block" style={{ color: '#64250A' }}>Base Price</span>
            <span className="pixel-text" style={{ color: '#64250A' }}>₹{basePrice}</span>
          </div>
          <div className="text-center">
            <span className="block" style={{ color: '#64250A' }}>Extra Profit</span>
            <span className="pixel-text" style={{ color: profit > 0 ? '#16A34A' : '#DC2626' }}>
              ₹{profit} ({profitPercent}%)
            </span>
          </div>
        </div>

        {negotiationResult === 'pending' && (
          <div className="space-y-3">
            <button
              className="w-full text-center transition-all duration-200 active:scale-95 rounded-lg"
              style={{ 
                backgroundColor: '#64250A',
                color: '#FFF4E6',
                padding: '12px 16px',
                border: 'none'
              }}
              onClick={handleNegotiate}
              disabled={isNegotiating}
            >
              {isNegotiating ? 'Negotiating...' : 'Negotiate'}
            </button>
            <div className="flex gap-2">
              <button
                className="flex-1 text-center transition-all duration-200 active:scale-95 rounded-lg"
                style={{ 
                  backgroundColor: '#16A34A',
                  color: '#FFF4E6',
                  padding: '12px 16px',
                  border: 'none'
                }}
                onClick={() => onAccept(price)}
              >
                Accept
              </button>
              <button
                className="flex-1 text-center transition-all duration-200 active:scale-95 rounded-lg"
                style={{ 
                  backgroundColor: '#DC2626',
                  color: '#FFF4E6',
                  padding: '12px 16px',
                  border: 'none'
                }}
                onClick={onReject}
              >
                Reject
              </button>
            </div>
          </div>
        )}

        {negotiationResult === 'success' && (
          <div className="text-center">
            <div className="text-2xl mb-2">✅</div>
            <p className="pixel-text mb-3" style={{ color: '#16A34A' }}>
              They accepted your offer! Great negotiation!
            </p>
            <button
              className="w-full text-center transition-all duration-200 active:scale-95 rounded-lg"
              style={{ 
                backgroundColor: '#16A34A',
                color: '#FFF4E6',
                padding: '12px 16px',
                border: 'none'
              }}
              onClick={() => onAccept(price)}
            >
              Finalize Deal
            </button>
          </div>
        )}

        {negotiationResult === 'failure' && (
          <div className="text-center">
            <div className="text-2xl mb-2">❌</div>
            <p className="pixel-text mb-3" style={{ color: '#DC2626' }}>
              They rejected your offer. Deal is off!
            </p>
            <button
              className="w-full text-center transition-all duration-200 active:scale-95 rounded-lg"
              style={{ 
                backgroundColor: '#64250A',
                color: '#FFF4E6',
                padding: '12px 16px',
                border: 'none'
              }}
              onClick={() => setNegotiationResult('pending')}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NegotiationSlider;

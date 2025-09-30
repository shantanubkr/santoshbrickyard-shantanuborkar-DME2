import React, { useState } from 'react';

interface LoanCalculatorProps {
  onLoanSelect: (loanType: 'small' | 'big' | 'none') => void;
  currentCash: number;
}

const LoanCalculator: React.FC<LoanCalculatorProps> = ({ onLoanSelect, currentCash }) => {
  const [selectedLoan, setSelectedLoan] = useState<'small' | 'big' | 'none' | null>(null);

  const loans = {
    small: {
      amount: 500,
      repayment: 600,
      duration: 3,
      ecoPenalty: 0,
      description: 'Small loan from local bank'
    },
    big: {
      amount: 1000,
      repayment: 1300,
      duration: 5,
      ecoPenalty: -10,
      description: 'Big loan from investor (shady)'
    }
  };

  const handleLoanSelect = (loanType: 'small' | 'big' | 'none') => {
    setSelectedLoan(loanType);
  };

  const handleConfirm = () => {
    if (selectedLoan) {
      onLoanSelect(selectedLoan);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg" style={{ 
      backgroundColor: '#FFF4E6',
      border: '2px solid #64250A'
    }}>
      <h3 className="pixel-heading text-lg text-center mb-6" style={{ color: '#64250A' }}>Loan Options</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Small Loan */}
        <div
          className={`cursor-pointer transition-all duration-200 rounded-lg p-4 ${
            selectedLoan === 'small' ? 'ring-4 ring-brick-light' : ''
          }`}
          style={{
            backgroundColor: '#FFF4E6',
            border: '2px solid #64250A'
          }}
          onClick={() => handleLoanSelect('small')}
          onMouseEnter={(e) => {
            if (selectedLoan !== 'small') {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedLoan !== 'small') {
              e.currentTarget.style.transform = 'translateY(0px)';
            }
          }}
        >
          <div className="text-center">
            <div className="text-3xl mb-2">🏦</div>
            <h4 className="pixel-heading text-base mb-2" style={{ color: '#64250A' }}>Small Loan</h4>
            <p className="pixel-text text-sm mb-3" style={{ color: '#64250A' }}>{loans.small.description}</p>
            
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="" style={{ color: '#64250A' }}>Amount:</span>
                <span className="" style={{ color: '#16A34A' }}>+₹{loans.small.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="" style={{ color: '#64250A' }}>Repay:</span>
                <span className="" style={{ color: '#DC2626' }}>₹{loans.small.repayment}</span>
              </div>
              <div className="flex justify-between">
                <span className="" style={{ color: '#64250A' }}>Duration:</span>
                <span className="" style={{ color: '#64250A' }}>{loans.small.duration} events</span>
              </div>
              <div className="flex justify-between">
                <span className="" style={{ color: '#64250A' }}>Eco Impact:</span>
                <span className="" style={{ color: '#16A34A' }}>0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Big Loan */}
        <div
          className={`cursor-pointer transition-all duration-200 rounded-lg p-4 ${
            selectedLoan === 'big' ? 'ring-4 ring-brick-light' : ''
          }`}
          style={{
            backgroundColor: '#FFF4E6',
            border: '2px solid #64250A'
          }}
          onClick={() => handleLoanSelect('big')}
          onMouseEnter={(e) => {
            if (selectedLoan !== 'big') {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedLoan !== 'big') {
              e.currentTarget.style.transform = 'translateY(0px)';
            }
          }}
        >
          <div className="text-center">
            <div className="text-3xl mb-2">💰</div>
            <h4 className="pixel-heading text-base mb-2 " style={{ color: '#64250A' }}>Big Loan</h4>
            <p className="pixel-text text-sm mb-3 " style={{ color: '#64250A' }}>{loans.big.description}</p>
            
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="" style={{ color: '#64250A' }}>Amount:</span>
                <span className="" style={{ color: '#16A34A' }}>+₹{loans.big.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="" style={{ color: '#64250A' }}>Repay:</span>
                <span className="" style={{ color: '#DC2626' }}>₹{loans.big.repayment}</span>
              </div>
              <div className="flex justify-between">
                <span className="" style={{ color: '#64250A' }}>Duration:</span>
                <span className="" style={{ color: '#64250A' }}>{loans.big.duration} events</span>
              </div>
              <div className="flex justify-between">
                <span className="" style={{ color: '#64250A' }}>Eco Impact:</span>
                <span className="" style={{ color: '#DC2626' }}>{loans.big.ecoPenalty}</span>
              </div>
            </div>
          </div>
        </div>

        {/* No Loan */}
        <div
          className={`cursor-pointer transition-all duration-200 rounded-lg p-4 ${
            selectedLoan === 'none' ? 'ring-4 ring-brick-light' : ''
          }`}
          style={{
            backgroundColor: '#FFF4E6',
            border: '2px solid #64250A'
          }}
          onClick={() => handleLoanSelect('none')}
          onMouseEnter={(e) => {
            if (selectedLoan !== 'none') {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedLoan !== 'none') {
              e.currentTarget.style.transform = 'translateY(0px)';
            }
          }}
        >
          <div className="text-center">
            <div className="text-3xl mb-2">🚫</div>
            <h4 className="pixel-heading text-base mb-2 " style={{ color: '#64250A' }}>No Loan</h4>
            <p className="pixel-text text-sm mb-3 " style={{ color: '#64250A' }}>Stay debt-free</p>
            
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="" style={{ color: '#64250A' }}>Cash:</span>
                <span className="" style={{ color: '#64250A' }}>₹{currentCash}</span>
              </div>
              <div className="flex justify-between">
                <span className="" style={{ color: '#64250A' }}>Debt:</span>
                <span className="" style={{ color: '#16A34A' }}>₹0</span>
              </div>
              <div className="flex justify-between">
                <span className="" style={{ color: '#64250A' }}>Risk:</span>
                <span className="" style={{ color: '#16A34A' }}>None</span>
              </div>
              <div className="flex justify-between">
                <span className="" style={{ color: '#64250A' }}>Growth:</span>
                <span className="" style={{ color: '#EAB308' }}>Slow</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedLoan && (
        <div className="text-center">
          <button
            className="text-center transition-all duration-200 active:scale-95 rounded-lg text-lg px-8 py-3"
            style={{ 
              backgroundColor: '#64250A',
              color: '#FFF4E6',
              border: 'none'
            }}
            onClick={handleConfirm}
          >
            {selectedLoan === 'none' ? 'Continue Without Loan' : 'Take This Loan'}
          </button>
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;

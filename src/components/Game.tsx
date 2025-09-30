import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { GameState, GameEvent, Choice, events, initialGameState, randomTroubles, getRandomInt, ALL_EVENT_TYPES } from '../data/events';
import StatsBar from './StatsBar';
import DialogBox from './DialogBox';
import BrickCard from './MiniGames/BrickCard';
import NegotiationSlider from './MiniGames/NegotiationSlider';
import LoanCalculator from './MiniGames/LoanCalculator';
import DigitizationOptions from './MiniGames/DigitizationOptions';
import SantoshMonologue from './EndingSequence/SantoshMonologue';
import EndScreen from './EndingSequence/EndScreen';

const Game: React.FC = () => {
  const location = useLocation();
  
  // Only render game if we're on the game route
  if (location.pathname !== '/game') {
    return null;
  }

  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showMiniGame, setShowMiniGame] = useState<string | null>(null);
  const [selectedBrickType, setSelectedBrickType] = useState<'clay' | 'flyash' | 'cement' | null>(null);
  const [selectedDigitizationOption, setSelectedDigitizationOption] = useState<'webpage' | 'indiamart' | 'both' | 'ignore' | null>(null);
  const [showSantoshMonologue, setShowSantoshMonologue] = useState(false);
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [dialogueBoxHeight, setDialogueBoxHeight] = useState(320); // Default height
  const dialogueBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Start with intro event
    showEvent(events.intro);
  }, []);

  // Track dialogue box height
  useEffect(() => {
    const updateHeight = () => {
      if (dialogueBoxRef.current) {
        const height = dialogueBoxRef.current.offsetHeight;
        setDialogueBoxHeight(height);
      }
    };

    // Update height when current event changes
    const timer = setTimeout(updateHeight, 100);
    
    return () => clearTimeout(timer);
  }, [currentEvent]);


  const updateGameState = (updates: Partial<GameState>) => {
    setGameState((prev: GameState) => {
      const newState = { ...prev, ...updates };
      
      // Update production capacity based on workers
      if (updates.workers !== undefined) {
        newState.productionCapacity = newState.workers * 50;
      }
      
      return newState;
    });
  };

  const checkGameOver = (state: GameState) => {
    // Check if all event types have been seen
    const allEventsSeen = ALL_EVENT_TYPES.every(eventType => state.seenEvents.has(eventType));
    
    // Trigger ending if all events seen OR after 15 total events (fallback)
    if (allEventsSeen || state.totalEvents >= 15) {
      setIsGameOver(true);
      setShowSantoshMonologue(true);
      return true;
    }
    
    return false;
  };

  const showEvent = (event: GameEvent) => {
    setCurrentEvent(event);
    
    // Track seen events
    const newSeenEvents = new Set(gameState.seenEvents);
    newSeenEvents.add(event.id);
    
    // Check if all events have been seen
    const allEventsSeen = ALL_EVENT_TYPES.every(eventType => newSeenEvents.has(eventType));
    
    updateGameState({ 
      currentScene: event.scene,
      eventHistory: [...gameState.eventHistory, event.id],
      seenEvents: newSeenEvents,
      allEventsSeen
    });
  };

  const handleChoice = (choice: Choice) => {
    // Handle mini-game triggers based on event type
    if (currentEvent?.id === 'brickMaking' && choice.text.includes('Choose Brick Type')) {
      setShowMiniGame('brickCard');
      return;
    }
    
    if (currentEvent?.id === 'client' && choice.text.includes('Negotiate the Deal')) {
      setShowMiniGame('negotiation');
      return;
    }
    
    if (currentEvent?.id === 'finance' && choice.text.includes('Consider Loan Options')) {
      setShowMiniGame('loanCalculator');
      return;
    }
    
    if (currentEvent?.id === 'digitization' && choice.text.includes('Choose Digital Strategy')) {
      setShowMiniGame('digitization');
      return;
    }

    if (choice.effects) {
      const newState = { ...gameState, ...choice.effects };
      updateGameState(choice.effects);
      
      if (checkGameOver(newState)) {
        return;
      }
    }

    if (choice.nextEvent && choice.nextEvent !== null) {
      showEvent(events[choice.nextEvent]);
    } else if (choice.nextText && choice.nextChoices && choice.nextChoices.length > 0) {
      // Handle multi-step dialogue
      const newEvent: GameEvent = {
        ...currentEvent!,
        text: choice.nextText,
        choices: choice.nextChoices || []
      };
      setCurrentEvent(newEvent);
    } else {
      // No next event or next choices, trigger random event
      triggerRandomEvent();
    }
  };

  const triggerRandomEvent = () => {
    if (isGameOver) return;

    // Special case: if loan is due, force finance event
    if (gameState.loanAmount > 0 && gameState.loanDue <= 0) {
      showEvent(events.finance);
      return;
    }

    // Decrease loan due counter only if we're not forcing a finance event
    if (gameState.loanDue > 0) {
      updateGameState({ loanDue: gameState.loanDue - 1 });
    }

    // Get unseen events
    const unseenEvents = ALL_EVENT_TYPES.filter(eventType => !gameState.seenEvents.has(eventType));
    
    let selectedEvent: string;
    
    if (unseenEvents.length > 0) {
      // Prioritize unseen events - select randomly from unseen events
      selectedEvent = unseenEvents[Math.floor(Math.random() * unseenEvents.length)];
    } else {
      // All events seen, trigger game over
      setIsGameOver(true);
      setShowSantoshMonologue(true);
      return;
    }

    // Handle trouble events specially
    if (selectedEvent === 'trouble') {
      const trouble = randomTroubles[Math.floor(Math.random() * randomTroubles.length)];
      const troubleEvent: GameEvent = {
        id: 'trouble',
        name: 'trouble',
        scene: 'brickyard',
        characterSide: 'left',
        characterType: 'santosh',
        speaker: 'Santosh',
        text: trouble.text,
        choices: [
          {
            text: "Deal with it and move on",
            effects: { 
              ...trouble.effects,
              totalEvents: 1,
              lastEventType: 'trouble'
            },
            nextText: trouble.description,
            nextChoices: [{ text: "Continue", nextEvent: null }]
          }
        ]
      };
      showEvent(troubleEvent);
    } else {
      showEvent(events[selectedEvent]);
    }
  };

  const restartGame = () => {
    setGameState(initialGameState);
    setCurrentEvent(null);
    setIsGameOver(false);
    setShowMiniGame(null);
    setSelectedBrickType(null);
    setShowSantoshMonologue(false);
    setShowEndScreen(false);
    showEvent(events.intro);
  };

  const handleMonologueContinue = () => {
    setShowSantoshMonologue(false);
    setShowEndScreen(true);
  };

  // Mini-game handlers
  const handleBrickSelection = (brickType: 'clay' | 'flyash' | 'cement') => {
    setSelectedBrickType(brickType);
    
    const brickEffects = {
      clay: { cash: -getRandomInt(180, 220), brickInventory: 100, ecoScore: -getRandomInt(3, 5), reputation: -getRandomInt(0, 2) },
      flyash: { cash: -getRandomInt(280, 320), brickInventory: 100, ecoScore: getRandomInt(8, 12), reputation: getRandomInt(4, 6) },
      cement: { cash: -getRandomInt(380, 420), brickInventory: 100, ecoScore: -getRandomInt(1, 3), reputation: getRandomInt(2, 4) }
    };
    
    updateGameState({
      ...brickEffects[brickType],
      totalEvents: gameState.totalEvents + 1,
      lastEventType: 'brickMaking'
    });
    
    setShowMiniGame(null);
    triggerRandomEvent();
  };

  const handleNegotiationResult = (price: number, accepted: boolean) => {
    // Extract values from the current client event text
    const eventText = currentEvent?.text || '';
    const brickMatch = eventText.match(/We want (\d+) bricks/);
    const priceMatch = eventText.match(/₹(\d+) per brick/);
    
    const brickQuantity = brickMatch ? parseInt(brickMatch[1]) : getRandomInt(500, 1500);
    const basePrice = priceMatch ? parseInt(priceMatch[1]) : getRandomInt(4, 6);
    
    if (accepted) {
      updateGameState({
        cash: price,
        brickInventory: -brickQuantity,
        reputation: getRandomInt(8, 12),
        clientSuccess: true,
        totalEvents: gameState.totalEvents + 1,
        lastEventType: 'client'
      });
    } else {
      // Even if negotiation fails, still get standard price
      updateGameState({
        cash: brickQuantity * basePrice,
        brickInventory: -brickQuantity,
        reputation: getRandomInt(4, 6),
        clientSuccess: true,
        totalEvents: gameState.totalEvents + 1,
        lastEventType: 'client'
      });
    }
    
    setShowMiniGame(null);
    triggerRandomEvent();
  };

  const handleLoanSelection = (loanType: 'small' | 'big' | 'none') => {
    if (loanType === 'none') {
      updateGameState({
        totalEvents: gameState.totalEvents + 1,
        lastEventType: 'finance'
      });
    } else {
      const loanEffects = {
        small: { 
          cash: getRandomInt(400, 600), 
          loanAmount: getRandomInt(550, 650), 
          loanDue: 3, 
          ecoScore: 0 
        },
        big: { 
          cash: getRandomInt(900, 1100), 
          loanAmount: getRandomInt(1200, 1400), 
          loanDue: 5, 
          ecoScore: -getRandomInt(5, 10) 
        }
      };
      
      updateGameState({
        ...loanEffects[loanType],
        totalEvents: gameState.totalEvents + 1,
        lastEventType: 'finance'
      });
    }
    
    setShowMiniGame(null);
    triggerRandomEvent();
  };

  const handleDigitizationSelection = (option: 'webpage' | 'indiamart' | 'both' | 'ignore') => {
    const effects = option === 'webpage' ? 
      { cash: -getRandomInt(180, 220), reputation: getRandomInt(5, 10), demand: 'medium' as const, totalEvents: gameState.totalEvents + 1, lastEventType: 'digitization' } :
      option === 'indiamart' ? 
      { cash: -getRandomInt(450, 550), reputation: getRandomInt(5, 10), demand: 'high' as const, totalEvents: gameState.totalEvents + 1, lastEventType: 'digitization' } :
      option === 'both' ? 
      { cash: -getRandomInt(650, 750), reputation: getRandomInt(10, 20), demand: 'high' as const, totalEvents: gameState.totalEvents + 1, lastEventType: 'digitization' } :
      { cash: 0, reputation: 0, demand: 'low' as const, totalEvents: gameState.totalEvents + 1, lastEventType: 'digitization' };

    updateGameState(effects);
    setShowMiniGame(null);
    setCurrentEvent(null);
    setSelectedDigitizationOption(null);
    triggerRandomEvent();
  };

  const getBackgroundImage = () => {
    // Special case for trouble events - use rainy day background
    if (currentEvent?.id === 'trouble') {
      return '/src/assets/backgrounds/rainy-day.png';
    }
    
    switch (gameState.currentScene) {
      case 'brickyard':
        return '/src/assets/backgrounds/brickyard.png';
      case 'office':
        return '/src/assets/backgrounds/office.png';
      case 'client':
        return '/src/assets/backgrounds/client-site.png';
      case 'labour':
        return '/src/assets/backgrounds/labour-quarters.png';
      case 'website':
        return '/src/assets/backgrounds/website-launch.png';
      default:
        return '/src/assets/backgrounds/brickyard.png';
    }
  };

  const getSantoshMood = () => {
    // Determine Santosh's mood based on game state
    if (gameState.cash < 200) return 'sad';
    if (gameState.reputation < 30) return 'angry';
    if (gameState.ecoScore > 60 && gameState.reputation > 70) return 'happy';
    return 'blink'; // Default neutral state
  };

  const getCharacterSprite = (type: string) => {
    
    const getCharacterImage = () => {
      switch (type) {
        case 'santosh':
          const mood = getSantoshMood();
          return `/src/assets/characters/santosh-${mood}.png`;
        case 'worker':
          return '/src/assets/characters/worker-group.png';
        case 'client':
          // Randomly choose between builder and contractor
          return Math.random() > 0.5 ? '/src/assets/characters/client-builder.png' : '/src/assets/characters/client-contractor.png';
        case 'banker':
          return '/src/assets/characters/banker.png';
        case 'tech':
          return '/src/assets/characters/tech-salesperson.png';
        default:
          return '👤';
      }
    };

    const characterImage = getCharacterImage();
    const isImage = characterImage.startsWith('/');

    return (
      <div className="w-full h-full relative">
        {isImage ? (
          <img 
            src={characterImage} 
            alt={type}
            className="absolute bottom-0 left-0 w-full h-full object-cover"
            style={{ objectPosition: 'center bottom' }}
          />
        ) : (
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-[16rem]">{characterImage}</span>
        )}
      </div>
    );
  };

  // Render mini-games
  if (showMiniGame) {
    return (
      <div 
        className="h-screen w-screen flex items-center justify-center"
        style={{ 
          backgroundImage: showMiniGame === 'brickCard' ? 'url(/src/assets/backgrounds/brickyard.png)' :
                          showMiniGame === 'negotiation' ? 'url(/src/assets/backgrounds/client-site.png)' :
                          showMiniGame === 'loan' ? 'url(/src/assets/backgrounds/office.png)' :
                          showMiniGame === 'digitization' ? 'url(/src/assets/backgrounds/website-launch.png)' :
                          'url(/src/assets/backgrounds/brickyard.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative max-w-6xl w-full p-6 z-10">
          {showMiniGame === 'brickCard' && (
            <div className="space-y-4">
              <h2 className="pixel-heading text-2xl text-center text-brick-light mb-6">
                Choose Your Brick Type
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <BrickCard
                  brickType="clay"
                  cost={200}
                  sellingPrice={300}
                  ecoImpact={-5}
                  reputationEffect={-2}
                  demandPercent={60}
                  onSelect={() => handleBrickSelection('clay')}
                  isSelected={selectedBrickType === 'clay'}
                />
                <BrickCard
                  brickType="flyash"
                  cost={300}
                  sellingPrice={450}
                  ecoImpact={10}
                  reputationEffect={5}
                  demandPercent={85}
                  onSelect={() => handleBrickSelection('flyash')}
                  isSelected={selectedBrickType === 'flyash'}
                />
                <BrickCard
                  brickType="cement"
                  cost={400}
                  sellingPrice={600}
                  ecoImpact={-2}
                  reputationEffect={3}
                  demandPercent={70}
                  onSelect={() => handleBrickSelection('cement')}
                  isSelected={selectedBrickType === 'cement'}
                />
              </div>
            </div>
          )}
          
          {showMiniGame === 'negotiation' && (
            <NegotiationSlider
              basePrice={5000}
              minPrice={4000}
              maxPrice={7000}
              onPriceChange={() => {}}
              onAccept={(price) => handleNegotiationResult(price, true)}
              onReject={() => handleNegotiationResult(0, false)}
              clientType="big"
              riskLevel="medium"
            />
          )}
          
          {showMiniGame === 'loanCalculator' && (
            <LoanCalculator
              onLoanSelect={handleLoanSelection}
              currentCash={gameState.cash}
            />
          )}
          
          {showMiniGame === 'digitization' && (
            <div className="space-y-4">
              <h2 className="pixel-heading text-2xl text-center text-brick-light mb-6">
                Choose Your Digital Strategy
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DigitizationOptions
                  option="webpage"
                  cost={getRandomInt(180, 220)}
                  reputationEffect={getRandomInt(5, 10)}
                  demandEffect="medium"
                  description="Create a simple business webpage to showcase your brickyard online."
                  onSelect={() => handleDigitizationSelection('webpage')}
                  isSelected={selectedDigitizationOption === 'webpage'}
                />
                <DigitizationOptions
                  option="indiamart"
                  cost={getRandomInt(450, 550)}
                  reputationEffect={getRandomInt(5, 10)}
                  demandEffect="high"
                  description="List your business on Indiamart marketplace for maximum visibility."
                  onSelect={() => handleDigitizationSelection('indiamart')}
                  isSelected={selectedDigitizationOption === 'indiamart'}
                />
                <DigitizationOptions
                  option="both"
                  cost={getRandomInt(650, 750)}
                  reputationEffect={getRandomInt(10, 20)}
                  demandEffect="high"
                  description="Go all out with both webpage and Indiamart listing for maximum impact."
                  onSelect={() => handleDigitizationSelection('both')}
                  isSelected={selectedDigitizationOption === 'both'}
                />
                <DigitizationOptions
                  option="ignore"
                  cost={0}
                  reputationEffect={0}
                  demandEffect="low"
                  description="Skip digital marketing and focus on traditional business methods."
                  onSelect={() => handleDigitizationSelection('ignore')}
                  isSelected={selectedDigitizationOption === 'ignore'}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show Santosh monologue first
  if (showSantoshMonologue) {
    return <SantoshMonologue onContinue={handleMonologueContinue} />;
  }

  // Show end screen with team credits
  if (showEndScreen) {
    return <EndScreen onRestart={restartGame} />;
  }

  return (
    <div 
      className="h-screen w-screen relative bg-cover bg-center bg-no-repeat flex flex-col"
      style={{ backgroundImage: `url(${getBackgroundImage()})` }}
    >
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-20 pointer-events-none"></div>
      
      {/* Stats Bar */}
      <StatsBar gameState={gameState} />

      {/* Main Content Area with Characters and Dialogue */}
      <div className="flex-1 relative">
        {/* Character Sprites - Left and Right Boxes */}
        <div 
          className="absolute left-4 w-96 h-[28rem] z-5 m-0 p-0" 
          style={{ bottom: `${dialogueBoxHeight + 120}px`, margin: 0, padding: 0 }}
        >
          {currentEvent?.characterSide === 'left' && getCharacterSprite(currentEvent.characterType)}
        </div>
        <div 
          className="absolute right-4 w-96 h-[28rem] z-5 m-0 p-0" 
          style={{ bottom: `${dialogueBoxHeight + 120}px`, margin: 0, padding: 0 }}
        >
          {currentEvent?.characterSide === 'right' && getCharacterSprite(currentEvent.characterType)}
        </div>

        {/* Dialogue Box */}
        {currentEvent && (
          <div ref={dialogueBoxRef} className="absolute bottom-0 left-0 right-0">
            <DialogBox
              speaker={currentEvent.speaker}
              text={currentEvent.text}
              choices={currentEvent.choices}
              onChoiceSelect={handleChoice}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;

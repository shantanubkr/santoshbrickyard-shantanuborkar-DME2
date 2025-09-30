export interface GameState {
  cash: number;
  brickInventory: number;
  ecoScore: number;
  reputation: number;
  demand: 'low' | 'medium' | 'high';
  currentScene: 'brickyard' | 'office' | 'client' | 'labour' | 'website';
  eventHistory: string[];
  loanAmount: number;
  loanDue: number;
  digitized: boolean;
  workers: number;
  productionCapacity: number;
  totalEvents: number;
  lastEventType: string;
  clientSuccess: boolean;
  labourStable: boolean;
  seenEvents: Set<string>;
  allEventsSeen: boolean;
}

export interface Choice {
  text: string;
  effects?: Partial<GameState>;
  nextEvent?: string | null;
  nextText?: string;
  nextChoices?: Choice[];
  speaker?: string;
}

export interface GameEvent {
  id: string;
  name: string;
  scene: 'brickyard' | 'office' | 'client' | 'labour' | 'website';
  characterSide: 'left' | 'right';
  characterType: 'santosh' | 'worker' | 'client' | 'banker' | 'tech';
  speaker: string;
  text: string;
  choices: Choice[];
}

export const initialGameState: GameState = {
  cash: 1000,
  brickInventory: 0,
  ecoScore: 50,
  reputation: 50,
  demand: 'low',
  currentScene: 'brickyard',
  eventHistory: [],
  loanAmount: 0,
  loanDue: 0,
  digitized: false,
  workers: 3,
  productionCapacity: 150,
  totalEvents: 0,
  lastEventType: '',
  clientSuccess: false,
  labourStable: true,
  seenEvents: new Set(),
  allEventsSeen: false
};

// Utility functions for randomization
export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomFloat = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const getRandomChoice = <T>(choices: T[]): T => {
  return choices[Math.floor(Math.random() * choices.length)];
};

// All available event types
export const ALL_EVENT_TYPES = ['brickMaking', 'client', 'labour', 'digitization', 'finance', 'trouble'];

export const events: Record<string, GameEvent> = {
  intro: {
    id: 'intro',
    name: 'intro',
    scene: 'brickyard',
    characterSide: 'left',
    characterType: 'santosh',
    speaker: 'Santosh',
    text: "Arre bhai, I've spent 29 years working in fabrication. 2 years ago, I saw a YouTube short about making bricks. I thought, why not give it a try?",
    choices: [
      {
        text: "Continue...",
        nextText: "Now I run this small brickyard, but it's not easy. Every day brings new challenges...",
        nextChoices: [
          {
            text: "Let's see what happens next!",
            nextEvent: 'brickMaking'
          }
        ]
      }
    ]
  },

  brickMaking: {
    id: 'brickMaking',
    name: 'brickMaking',
    scene: 'brickyard',
    characterSide: 'right',
    characterType: 'worker',
    speaker: 'Worker',
    text: "Santosh bhau! We're out of stock, what should we do?",
    choices: [
      {
        text: "Choose Brick Type",
        effects: { 
          totalEvents: 1,
          lastEventType: 'brickMaking'
        },
        nextText: "Let me think about which type of bricks to make...",
        nextChoices: [{ text: "Continue", nextEvent: null }]
      }
    ]
  },

  digitization: {
    id: 'digitization',
    name: 'digitization',
    scene: 'website',
    characterSide: 'right',
    characterType: 'tech',
    speaker: 'Tech Salesperson',
    text: "Business is running, but people keep asking if we're online. Should we go digital?",
    choices: [
      {
        text: "Choose Digital Strategy",
        effects: {
          totalEvents: 1,
          lastEventType: 'digitization'
        },
        nextText: "Let me think about the best digital approach...",
        nextChoices: [{ text: "Continue", nextEvent: null }]
      }
    ]
  },

  client: {
    id: 'client',
    name: 'client',
    scene: 'client',
    characterSide: 'right',
    characterType: 'client',
    speaker: 'Client',
    text: `We want ${getRandomInt(500, 1500)} bricks. We'll pay ₹${getRandomInt(4, 6)} per brick (Total: ₹${getRandomInt(500, 1500) * getRandomInt(4, 6)}). What do you say?`,
    choices: [
      {
        text: "Negotiate the Deal",
        effects: { 
          totalEvents: 1,
          lastEventType: 'client'
        },
        nextText: "Let me negotiate the best deal for us...",
        nextChoices: [{ text: "Continue", nextEvent: null }]
      }
    ]
  },

  labour: {
    id: 'labour',
    name: 'labour',
    scene: 'labour',
    characterSide: 'right',
    characterType: 'worker',
    speaker: 'Worker',
    text: getRandomChoice([
      "Some of the old labourers want to leave. They're asking for better pay or they'll go work elsewhere.",
      "New workers are available for hire. Should we expand our workforce?",
      "The workers are threatening to strike if we don't improve their conditions."
    ]),
    choices: [
      {
        text: `Hire New Workers (Cost: ₹${getRandomInt(250, 350)}, +${getRandomInt(1, 3)} workers, +${getRandomInt(50, 150)} capacity)`,
        effects: { 
          cash: -getRandomInt(250, 350), 
          workers: getRandomInt(1, 3),
          labourStable: true,
          totalEvents: 1,
          lastEventType: 'labour'
        },
        nextText: "New workers hired! Production capacity increased.",
        nextChoices: [{ text: "Continue", nextEvent: null }]
      },
      {
        text: `Give Bonus to Retain Old Workers (Cost: ₹${getRandomInt(150, 250)}, +${getRandomInt(4, 6)} rep)`,
        effects: { 
          cash: -getRandomInt(150, 250), 
          reputation: getRandomInt(4, 6),
          labourStable: true,
          totalEvents: 1,
          lastEventType: 'labour'
        },
        nextText: "Workers are happy with the bonus. They'll stay!",
        nextChoices: [{ text: "Continue", nextEvent: null }]
      },
      {
        text: `Let Them Leave (No cost, -${getRandomInt(1, 2)} workers, -${getRandomInt(50, 100)} capacity)`,
        effects: { 
          workers: -getRandomInt(1, 2),
          labourStable: false,
          totalEvents: 1,
          lastEventType: 'labour'
        },
        nextText: "Workers left. Production will be slower now.",
        nextChoices: [{ text: "Continue", nextEvent: null }]
      }
    ]
  },

  finance: {
    id: 'finance',
    name: 'finance',
    scene: 'office',
    characterSide: 'right',
    characterType: 'banker',
    speaker: 'Banker',
    text: "Cash is tight. Should I take a loan to expand the business?",
    choices: [
      {
        text: "Consider Loan Options",
        effects: { 
          totalEvents: 1,
          lastEventType: 'finance'
        },
        nextText: "Let me evaluate the loan options available...",
        nextChoices: [{ text: "Continue", nextEvent: null }]
      }
    ]
  },

  trouble: {
    id: 'trouble',
    name: 'trouble',
    scene: 'brickyard',
    characterSide: 'left',
    characterType: 'santosh',
    speaker: 'Santosh',
    text: "Heavy rains ruined some of our brick stock!",
    choices: [
      {
        text: "Deal with it and move on",
        effects: { 
          brickInventory: -25, 
          ecoScore: -2,
          totalEvents: 1,
          lastEventType: 'trouble'
        },
        nextText: "The rains destroyed 25 bricks. We need to be more careful with storage, but it's not too bad.",
        nextChoices: [{ text: "Continue", nextEvent: null }]
      }
    ]
  },

  repayment: {
    id: 'repayment',
    name: 'repayment',
    scene: 'office',
    characterSide: 'right',
    characterType: 'banker',
    speaker: 'Banker',
    text: "Time to repay your loan of ₹{loanAmount}. Do you have the money ready?",
    choices: [
      {
        text: "Pay Back Loan (Cost: {loanAmount})",
        effects: { 
          cash: -0, // Will be set dynamically
          loanAmount: 0,
          reputation: 10,
          totalEvents: 1,
          lastEventType: 'repayment'
        },
        nextText: "Loan repaid successfully. We're debt-free and our reputation improved!",
        nextChoices: [{ text: "Continue", nextEvent: null }]
      },
      {
        text: "Keep Cash for Business (Delay repayment, small reputation drop)",
        effects: { 
          reputation: -5, 
          loanAmount: 0,
          totalEvents: 1,
          lastEventType: 'repayment'
        },
        nextText: "We delayed the repayment to invest in the business. Small reputation hit, but we kept our cash for growth.",
        nextChoices: [{ text: "Continue", nextEvent: null }]
      }
    ]
  },

  website: {
    id: 'website',
    name: 'website',
    scene: 'website',
    characterSide: 'right',
    characterType: 'tech',
    speaker: 'Tech Salesperson',
    text: "Your website is live! Now you can reach customers online. This will boost your reputation and demand.",
    choices: [
      {
        text: "Great! Let's see the results",
        effects: { 
          reputation: 15,
          demand: 'high' as const,
          totalEvents: 1,
          lastEventType: 'website'
        },
        nextText: "Your online presence is growing! More customers are finding you through the website.",
        nextChoices: [{ text: "Continue", nextEvent: null }]
      }
    ]
  }
};

export const randomTroubles = [
  {
    text: "Heavy rains ruined some of our brick stock!",
    effects: { brickInventory: -getRandomInt(20, 30), ecoScore: -getRandomInt(3, 5) },
    description: `The rains destroyed ${getRandomInt(20, 30)} bricks. We need to be more careful with storage, but it's not too bad.`
  },
  {
    text: "Market prices dropped slightly!",
    effects: { reputation: -getRandomInt(5, 10) },
    description: "Market prices dipped. Small reputation hit, but we'll recover quickly."
  },
  {
    text: "Government updated eco regulations!",
    effects: { ecoScore: -getRandomInt(5, 10), reputation: -getRandomInt(2, 5) },
    description: "New eco rules are stricter, but we can adapt. Small adjustments needed."
  },
  {
    text: "Brick machine needs minor repair!",
    effects: { cash: -getRandomInt(150, 250), brickInventory: -getRandomInt(20, 30) },
    description: `Machine repair cost ₹${getRandomInt(150, 250)} and we lost ${getRandomInt(20, 30)} bricks in production time. Minor setback.`
  }
];

export const endings = {
  unified: {
    title: "SANTOSH'S BRICKYARD THRIVES!",
    description: "From a YouTube short to running a thriving brickyard, the business keeps growing. Every choice you made shaped the balance between profit, environment, and community. The kiln hums with activity, and Santosh smiles at the journey ahead."
  }
};

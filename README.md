# Santosh's Brickyard 🧱

A pixelated interactive business simulation game built with **React + TypeScript + Tailwind CSS**. Experience Santosh's journey from fabrication worker to brick entrepreneur through strategic decision-making, engaging mini-games, and authentic Indian business storytelling.

## 🎮 Key Features

- **Interactive Mini-Games**: Brick selection cards, negotiation sliders, loan calculators, and digitization options
- **6 Event Types**: Brick making, client negotiations, labor management, finance, digitization, and random troubles
- **Complete Game Flow**: Each event plays once before triggering the ending sequence
- **Team Credits**: Features the development team with animated character displays
- **Production Capacity System**: Manage workers and production output
- **Authentic Indian Context**: Realistic business scenarios and cultural references

## 🎮 Game Features

- **Minecraft-inspired pixel art** with custom color palette
- **Modular event system** with 6 different event types
- **Single comprehensive ending** with team celebration
- **5-8 minute playthrough** with high replayability
- **Typewriter dialogue effects** for immersive storytelling
- **Real-time stat tracking** with visual feedback
- **Responsive design** for desktop and mobile
- **React Router** navigation with proper state management

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

**Prerequisites:**
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shantanubkr/santoshbrickyard-shantanuborkar-DME2.git
   cd santoshbrickyard-shantanuborkar-DME2
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the game** (Choose one method):

   **Method A: Using npm**
   ```bash
   npm run dev
   ```

   **Method B: Using the launcher script**
   - **Windows**: Double-click `start-game.bat`
   - **macOS/Linux**: Run `./start-game.sh`

4. **Open your browser** to `http://localhost:5173`

### 🛠️ Troubleshooting

If you encounter issues:

1. **"Command not found: npm"**
   - Install Node.js from https://nodejs.org/
   - Restart your terminal

2. **"Port 5173 is already in use"**
   - Kill the process using the port or restart your computer

3. **"Module not found" errors**
   - Delete `node_modules` folder and `package-lock.json`
   - Run `npm install` again

4. **Game won't load**
   - Check browser console (F12) for errors
   - Ensure all dependencies are installed
   - Try clearing browser cache

For detailed setup instructions, see [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)

### Build for Production

```bash
npm run build
npm run preview
```

## 🎯 Game Mechanics

### Stats System
- **💰 Cash**: Your operating money
- **🧱 Bricks**: Current inventory
- **🌱 Eco Score**: Environmental impact (0-100)
- **⭐ Reputation**: Community standing (0-100)  
- **📈 Demand**: Market demand (low/medium/high)
- **⚒️ Production Capacity**: Based on number of workers

### Event Types

1. **Brick Making**: Choose between Clay, Fly Ash, or Cement bricks with different costs and eco impacts
2. **Client Events**: Negotiate with small builders or big contractors using interactive sliders
3. **Labour Management**: Handle worker retention, hiring, and production capacity
4. **Digitization**: Create website, list on Indiamart, or both for increased demand
5. **Finance**: Take loans and manage repayments with loan calculator
6. **Random Troubles**: Deal with unexpected challenges like rain, market crashes, or equipment failures

### Game Flow

- **Event Sequence**: Each of the 6 event types plays exactly once before ending
- **No Repetition**: Events cannot repeat, ensuring complete story experience
- **Progressive Difficulty**: Later events build on earlier decisions
- **Meaningful Choices**: Every decision affects your final business stats

### Ending Sequence

- **Santosh Monologue**: Reflective speech about the entrepreneurial journey
- **Team Celebration**: Animated display of the development team
- **Final Stats**: Summary of your business achievements
- **Restart Option**: Play again to experience different event sequences

## 🎨 Design System

### Color Palette
- `#64250A` - Dark brick
- `#FFF4E6` - Cream
- `#FFFFFF` - White
- `#000000` - Black
- `#DA6B0B` - Light brick
- `#5C4033` - Brown

### Typography
- **Font**: Press Start 2P (Google Fonts)
- **Style**: Pixel-perfect, retro gaming aesthetic

## 🖼️ Asset Structure

The game includes a comprehensive set of character sprites and background scenes:

### Character Sprites
- **Santosh**: Multiple expressions (happy, sad, angry, blink) + animated GIF
- **Team Members**: 6 development team character portraits
- **Business Characters**: Workers, clients, banker, tech salesperson
- **Brick Types**: Clay, fly ash, and cement brick representations

### Background Scenes
- **Brickyard**: Main production area
- **Office**: Business management space
- **Client Site**: Construction/meeting locations
- **Labour Quarters**: Worker management area
- **Website Launch**: Digitization celebration
- **Rainy Day**: Trouble event backdrop
- **Homepage**: Landing page background

### Asset Organization
```
src/assets/
├── characters/          # Character sprites and team photos
├── backgrounds/         # Scene backgrounds
└── README.md           # Asset documentation
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Game.tsx                    # Main game logic & state management
│   ├── HomePage.tsx               # Landing page with navigation
│   ├── DialogBox.tsx              # RPG-style dialogue UI
│   ├── StatsBar.tsx               # Game statistics display
│   ├── ChoiceButtons.tsx          # Interactive choice selection
│   ├── MiniGames/                 # Interactive mini-game components
│   │   ├── BrickCard.tsx          # Brick type selection
│   │   ├── NegotiationSlider.tsx  # Price negotiation
│   │   ├── LoanCalculator.tsx     # Loan management
│   │   └── DigitizationOptions.tsx # Digital strategy
│   └── EndingSequence/            # Story conclusion components
│       ├── SantoshMonologue.tsx   # Final monologue
│       └── EndScreen.tsx          # Team credits & restart
├── data/
│   └── events.ts                  # Event definitions & game state
├── assets/                        # Character sprites & backgrounds
├── App.tsx                       # Root component with routing
├── main.tsx                      # Application entry point
└── index.css                     # Global styles & Tailwind config
```

## 🎮 How to Play

1. **Start the Game**: Click "START GAME" on the homepage
2. **Read the Story**: Follow Santosh's entrepreneurial journey through dialogue
3. **Make Strategic Choices**: Click buttons to make business decisions
4. **Play Mini-Games**: Interact with specialized components for key decisions
5. **Monitor Stats**: Watch your cash, reputation, eco score, and other metrics
6. **Complete All Events**: Experience all 6 event types before the ending
7. **Enjoy the Conclusion**: Watch Santosh's monologue and team celebration
8. **Play Again**: Restart to experience different event sequences

## 🔄 Replayability

**Structured but Varied Experience:**
- **Fixed Event Types**: All 6 event types play exactly once per game
- **Random Event Order**: Events appear in different sequences each playthrough
- **Variable Values**: Costs, profits, and effects vary within realistic ranges
- **Different Outcomes**: Your choices create unique final business stats
- **Complete Experience**: Every playthrough tells the full story in 5-8 minutes

Each playthrough offers a complete narrative arc while maintaining variety through different event sequences and player choices.

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Tech Stack
- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for responsive styling
- **React Router** for navigation and state management
- **Custom pixel art** components and animations

### Build Information
- **Bundle Size**: 216.71 kB (gzipped: 66.74 kB)
- **Build Time**: ~650ms
- **Zero Linting Errors**: Clean, production-ready code
- **Mobile Responsive**: Works on all screen sizes

### Deployment Ready
The project is fully optimized for production deployment with:
- Clean build output
- Optimized assets
- Responsive design
- Cross-browser compatibility

---

*Built with ❤️ by Shantanu Borkar and the development team*

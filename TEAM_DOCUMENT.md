# 🎮 Santosh's Brickyard - Team Document

## 📋 Project Information

**Game Title**: Santosh's Brickyard  
**Genre**: Interactive Business Simulation Game  
**Platform**: Web Browser (Desktop & Mobile)  
**Technology**: React + TypeScript + Tailwind CSS  

## 🔗 GitHub Repository

**Repository URL**: https://github.com/shantanubkr/santoshbrickyard-shantanuborkar-DME2

**Direct Clone Command**:
```bash
git clone https://github.com/shantanubkr/santoshbrickyard-shantanuborkar-DME2.git
```

## 🚀 How to Run the Game

### Quick Start (3 Steps):

1. **Install Node.js** (if not already installed)
   - Download from: https://nodejs.org/
   - Choose the LTS version

2. **Clone and Setup**
   ```bash
   git clone https://github.com/shantanubkr/santoshbrickyard-shantanuborkar-DME2.git
   cd santoshbrickyard-shantanuborkar-DME2
   npm install
   ```

3. **Start the Game**
   ```bash
   npm run dev
   ```
   - Game will open at: http://localhost:5173

### Alternative: Use Launcher Scripts

- **Windows**: Double-click `start-game.bat`
- **macOS/Linux**: Run `./start-game.sh`

## 🎯 Game Features

- **6 Unique Events**: Each plays exactly once
- **Interactive Mini-Games**: 
  - Brick selection (Clay, Flash, Cement)
  - Client negotiation with price slider
  - Loan calculator with 3 options
  - Digital strategy selection
- **Character System**: Santosh with mood-based sprites
- **Business Simulation**: Manage cash, reputation, demand
- **Team Celebration**: Animated ending with all team members

## 🛠️ Troubleshooting

### Common Issues:

1. **"npm command not found"**
   - Install Node.js from https://nodejs.org/
   - Restart terminal/command prompt

2. **"Port 5173 already in use"**
   - Close other applications using the port
   - Or restart your computer

3. **"Module not found" errors**
   - Delete `node_modules` folder
   - Run `npm install` again

4. **Game won't load**
   - Check browser console (F12) for errors
   - Try a different browser
   - Clear browser cache

## 📁 Project Structure

```
santoshbrickyard-shantanuborkar-DME2/
├── src/
│   ├── components/          # React components
│   │   ├── Game.tsx        # Main game logic
│   │   ├── HomePage.tsx    # Landing page
│   │   ├── DialogBox.tsx   # Dialogue system
│   │   ├── StatsBar.tsx    # Game statistics
│   │   └── MiniGames/      # Interactive mini-games
│   ├── assets/             # Game assets
│   │   ├── characters/     # Character sprites
│   │   └── backgrounds/    # Background images
│   └── data/               # Game data and events
├── dist/                   # Production build
├── README.md              # Main documentation
├── SETUP_INSTRUCTIONS.md  # Detailed setup guide
├── start-game.sh          # macOS/Linux launcher
├── start-game.bat         # Windows launcher
└── package.json           # Dependencies
```

## 🎮 Game Controls

- **Mouse/Touch**: Click buttons and interact with UI
- **Keyboard**: Not required (mouse-only game)
- **Navigation**: Use "Start Game" button to begin

## 📱 System Requirements

- **OS**: Windows 10+, macOS 10.14+, or Linux
- **RAM**: 4GB minimum, 8GB recommended
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Storage**: 100MB free space

## 🏆 Team Members

1. **Shantanu Borkar** - Project Lead & Development
2. **Samruddhi Mullerpatan** - Design & Assets
3. **Kavya Karkhanis** - Game Design & Testing
4. **Anindita V. Hazra** - UI/UX Design
5. **Twisha Sawant** - Character Design
6. **Ananya Naidu** - Quality Assurance

## 📞 Support

For technical issues or questions:
- **GitHub Issues**: Create an issue in the repository
- **Documentation**: Check README.md and SETUP_INSTRUCTIONS.md
- **Contact**: Reach out to the development team

---

**Happy Gaming! 🎮✨**

*Last Updated: January 2025*

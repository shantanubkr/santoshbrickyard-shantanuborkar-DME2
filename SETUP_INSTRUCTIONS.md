# 🎮 Santosh's Brickyard - Setup Instructions

## 📋 Prerequisites

Before running the game, make sure you have the following installed on your system:

### Required Software:
1. **Node.js** (version 16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`
   - Verify npm: `npm --version`

2. **Git** (for cloning the repository)
   - Download from: https://git-scm.com/
   - Verify installation: `git --version`

## 🚀 Quick Start Guide

### Step 1: Clone the Repository
```bash
git clone https://github.com/shantanubkr/santoshbrickyard-shantanuborkar-DME2.git
cd santoshbrickyard-shantanuborkar-DME2
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the Development Server
```bash
npm run dev
```

### Step 4: Open the Game
- The game will automatically open in your browser
- If it doesn't open automatically, go to: `http://localhost:5173`

## 🛠️ Alternative Commands

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Run Linting
```bash
npm run lint
```

## 🔧 Troubleshooting

### Common Issues and Solutions:

#### 1. "Command not found: npm"
**Problem**: Node.js is not installed or not in PATH
**Solution**: 
- Install Node.js from https://nodejs.org/
- Restart your terminal/command prompt

#### 2. "EACCES: permission denied"
**Problem**: Permission issues with npm
**Solution**:
```bash
# On macOS/Linux
sudo chown -R $(whoami) ~/.npm

# Or use npx instead
npx create-react-app my-app
```

#### 3. "Port 5173 is already in use"
**Problem**: Another application is using the default port
**Solution**:
```bash
# Kill the process using port 5173
# On macOS/Linux:
lsof -ti:5173 | xargs kill -9

# On Windows:
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F
```

#### 4. "Module not found" errors
**Problem**: Dependencies not installed properly
**Solution**:
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### 5. "Cannot resolve module" errors
**Problem**: TypeScript/ESLint configuration issues
**Solution**:
```bash
# Clear and reinstall everything
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## 🌐 GitHub Repository

**Repository URL**: https://github.com/shantanubkr/santoshbrickyard-shantanuborkar-DME2

### Repository Contents:
- Complete React + TypeScript game source code
- All game assets (characters, backgrounds, sounds)
- Production-ready build files
- Comprehensive documentation

## 🎯 Game Features

- **Interactive Business Simulation**: Manage a brickyard business
- **6 Unique Event Types**: Each plays exactly once
- **Mini-Games**: Brick selection, negotiation, loan calculator, digitization
- **Pixel Art Design**: Authentic Indian business context
- **Team Celebration**: Animated character displays at the end
- **Responsive Design**: Works on desktop and mobile

## 📱 System Requirements

### Minimum Requirements:
- **OS**: Windows 10, macOS 10.14, or Linux
- **RAM**: 4GB
- **Storage**: 100MB free space
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+

### Recommended:
- **RAM**: 8GB or more
- **Browser**: Latest version of Chrome or Firefox

## 🆘 Getting Help

If you encounter any issues:

1. **Check the Console**: Open browser developer tools (F12) and check for errors
2. **Verify Prerequisites**: Ensure Node.js and npm are properly installed
3. **Clear Cache**: Try clearing browser cache and npm cache
4. **Reinstall Dependencies**: Delete `node_modules` and run `npm install` again

## 📞 Contact

For technical support or questions:
- **GitHub Issues**: Create an issue in the repository
- **Email**: Contact the development team

---

**Happy Gaming! 🎮✨**

*Santosh's Brickyard - A Business Simulation Adventure*

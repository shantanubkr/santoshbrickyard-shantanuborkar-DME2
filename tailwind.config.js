/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'monospace'],
      },
      colors: {
        'brick': {
          'dark': '#64250A',
          'light': '#DA6B0B',
          'brown': '#5C4033',
        },
        'cream': '#FFF4E6',
        'white': '#FFFFFF',
        'black': '#000000',
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'typewriter': 'typewriter 2s steps(40, end)',
        'blink': 'blink 0.75s step-end infinite',
      },
      keyframes: {
        typewriter: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        blink: {
          'from, to': { 'border-color': 'transparent' },
          '50%': { 'border-color': '#DA6B0B' },
        },
      },
    },
  },
  plugins: [],
}

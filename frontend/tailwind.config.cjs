/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: '#C6A972',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        shine: {
          '0%':   { transform: 'translateX(-100%) skewX(-15deg)' },
          '100%': { transform: 'translateX(200%) skewX(-15deg)' },
        },
      },
      animation: {
        shine: 'shine 0.7s ease forwards',
      },
    },
  },
  plugins: [],
}

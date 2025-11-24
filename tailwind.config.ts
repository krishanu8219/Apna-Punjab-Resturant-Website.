import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}', 
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF5F0',
          100: '#FFE6DB',
          200: '#FFC5B0',
          300: '#FFA385',
          400: '#FF7A59',
          500: '#FF5733', // Vibrant Spice Red/Orange
          600: '#E63E1C',
          700: '#C22A0D',
          800: '#9E200A',
          900: '#7A1807',
        },
        accent: {
          50: '#FFFBED',
          100: '#FFF4D1',
          200: '#FFE699',
          300: '#FFD961',
          400: '#FFCB29',
          500: '#FFBD00', // Golden Turmeric
          600: '#DBA200',
          700: '#B88800',
          800: '#946D00',
          900: '#705300',
        }
      },
      fontFamily: {
        sans: ['var(--font-lato)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
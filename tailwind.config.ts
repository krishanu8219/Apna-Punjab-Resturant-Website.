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
          500: '#FF5733',
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
          500: '#FFBD00',
          600: '#DBA200',
          700: '#B88800',
          800: '#946D00',
          900: '#705300',
        },
        desi: {
          red: '#DC2626',
          orange: '#F97316',
          gold: '#FBBF24',
          green: '#16A34A',
          saffron: '#FF9933',
          turmeric: '#FFC30B',
          chili: '#C21807',
          royal: '#003399',
          cream: '#FFFDD0',
          clay: '#D2691E',
        }
      },
      fontFamily: {
        sans: ['var(--font-poppins)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['var(--font-bebas)', 'var(--font-playfair)', 'serif'],
        heading: ['var(--font-bebas)', 'Impact', 'sans-serif'],
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
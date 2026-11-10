/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        softpink: '#F8DDE3',
        blush: '#EFC1CE',
        cream: '#FFF8F5',
        ivory: '#F7EBDD',
        rosegold: '#C9A46A',
        deeprose: '#A75D75',
        ink: '#514044',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        editorial: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        script: ['Allura', '"Segoe Script"', 'cursive'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(167, 93, 117, 0.28)',
        card: '0 18px 44px -18px rgba(167, 93, 117, 0.38)',
        frame: '0 30px 70px -28px rgba(81, 64, 68, 0.45)',
        tape: '0 2px 6px rgba(81, 64, 68, 0.14)',
      },
      animation: {
        'spin-slow': 'spin 14s linear infinite',
        'spin-slower': 'spin 26s linear infinite',
        'float-y': 'float-y 5s ease-in-out infinite',
        bob: 'bob 1.6s ease-in-out infinite',
      },
      keyframes: {
        'float-y': {
          '0%, 100%': { transform: 'translateY(-6px)' },
          '50%': { transform: 'translateY(8px)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
      },
    },
  },
  plugins: [],
};

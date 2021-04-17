const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '769px',
      lg: '1120px',
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontFamily: 'Anisette Medium',
              color: '#d3ae65',
            },
            h2: {
              fontFamily: 'Anisette Medium',
              color: '#d3ae65',
            },
            h3: {
              fontFamily: 'Anisette Medium',
              color: '#d3ae65',
            },
            p: {
              fontFamily: 'Merriweather'
            },
            hr: {
              borderColor: '#9F4800',
            },
          },
        },
      },
      colors: {
        rose: {
          500: '#d1a5bc'
        },
        blood: {
          500: '#6d2d21'
        },
        blue: {
          500: '#00486b'
        },
        olive: {
          500: '#293c2b',
        },
        gold: {
          400: '#dec580',
          500: '#d3ae65',
        },
      },
      fontFamily: {
        sans: ['Anisette Medium', ...defaultTheme.fontFamily.sans],
        light: ['Anisette Light', ...defaultTheme.fontFamily.sans],
        serif: ['Merriweather', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

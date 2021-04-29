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
      zIndex: {
        '-10': '-10',
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontFamily: 'Anisette Medium',
              color: '#d3ae65',
              textTransform: 'uppercase',
              fontWeight: 'normal',
              fontSize: '1.875em !important'
            },
            h2: {
              fontFamily: 'Anisette Medium',
              color: '#d3ae65',
              // fontWeight: 'normal',
              fontSize: '1.5em !important',
              textTransform: 'lowercase',
            },
            h3: {
              fontFamily: 'Anisette Medium',
              color: '#d3ae65',
              fontWeight: 'normal',
              fontSize: '1.35em !important',
              textTransform: 'lowercase',
            },
            p: {
              fontFamily: 'Merriweather'
            },
            strong: {
              color: '#d3ae65',
            },
            a: {
              color: '#d3ae65',
              textDecoration: 'underline',
            },
            ul: {
              li: {
                textIndent: 0,
                fontFamily: 'Merriweather',
                '&:before': { backgroundColor: '#dec580' }
              }
            },
            hr: {
              borderColor: '#ac5e14',
            },
          },
        },
      },
      colors: {
        orange: {
          500: '#ac5e14'
        },
        rose: {
          500: '#d1a5bc'
        },
        blood: {
          500: '#6d2d21'
        },
        blue: {
          light: '#36697e',
          dark: '#00262a'
        },
        olive: {
          500: '#001300',
        },
        gold: {
          300: '#faf4ba',
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
    require('@tailwindcss/typography'),
  ],
};

import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'react-jss';
import tinycolor from 'tinycolor2';

import data from './data';

const spacing = (val = 1) => val * data.spacingBase;

const mediaQueryMatch = typeof window !== 'undefined'
  && window.matchMedia('(prefers-color-scheme: dark)');
const defaultDark = typeof localStorage !== 'undefined' && localStorage.getItem('darkMode') !== null
  ? !!localStorage.getItem('darkMode')
  : mediaQueryMatch?.matches;

const CustomTheme = ({ children }) => {
  const [dark, setDarkMode] = React.useState(defaultDark);

  const toggleDarkMode = React.useCallback(() => setDarkMode((val) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('darkMode', val ? '' : 'true');
    }
    return !val;
  }), [setDarkMode]);

  React.useEffect(() => {
    const queryListener = (e) => {
      if (!!e.matches !== dark) toggleDarkMode();
    };
    mediaQueryMatch.addEventListener('change', queryListener);

    return () => {
      mediaQueryMatch.removeEventListener('change', queryListener);
    };
  }, [toggleDarkMode, dark]);

  const textColor = dark ? '#e3e3e3' : '#212121';
  const backgroundColor = dark ? '#212121' : '#e3e3e3';

  const theme = {
    spacing,

    mode: dark ? 'dark' : 'light',
    toggleMode: () => toggleDarkMode(!dark),

    palette: {
      common: {
        black: '#000',
        white: '#fff',
      },
    },

    typography: {
      fontSize: 16,
      fontFamily: 'Roboto, sans-serif',

      color: textColor,
      shades: [
        0.92,
        0.80,
        0.68,
        0.56,
        0.48,
        0.36,
        0.24,
        0.12,
      ].map((val) => tinycolor(textColor).setAlpha(val).toHex8String()),
    },
    background: {
      color: backgroundColor,
      shades: [
        0.92,
        0.80,
        0.68,
        0.56,
        0.48,
        0.36,
        0.24,
        0.12,
      ].map((val) => tinycolor(backgroundColor).setAlpha(val).toHex8String()),
    },

    mixins: {
      textContent: {
        padding: spacing(2),
        marginTop: '13vw',
        marginBottom: '3vw',
        width: '100%',
        maxWidth: 800,
        margin: 'auto',
        '& p': {
          marginBottom: '0.618em',
          fontSize: '1.2rem',
        },
        '& h1': {
          marginBottom: '1.618em',
          fontSize: 'max(2rem, 5vw)',
        },
        '& code': {
          fontSize: '0.9em',
        },
      },

      inlineListClasses: {
        root: {
          display: 'flex',
        },
        list: {
          display: 'inline-flex',
          listStyle: 'none',
          padding: 0,
          margin: 0,
        },
        item: {
          display: 'block',
          padding: {
            left: spacing(),
            right: spacing(),
          },
          '&:first-child': {
            paddingLeft: 0,
          },
          '&:last-child': {
            paddingRight: 0,
          },
        },
        link: {
          display: 'block',
        },
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

CustomTheme.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomTheme;

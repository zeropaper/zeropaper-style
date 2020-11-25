import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'react-jss';

import data from './data';

const spacing = (val = 1) => val * data.spacingBase;

const CustomTheme = ({ children }) => (
  <ThemeProvider
    theme={{
      spacing,

      palette: {
        common: {
          black: '#000',
          white: '#fff',
        },
      },

      mixins: {
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
    }}
  >
    {children}
  </ThemeProvider>
);

CustomTheme.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomTheme;

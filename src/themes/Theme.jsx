import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'react-jss';

import data from './data';

const CustomTheme = ({ children }) => (
  <ThemeProvider
    theme={{
      palette: {
        common: {
          black: '#000',
          white: '#fff',
        },
      },
      spacing: (val) => val * data.spacingBase,
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
              left: 5,
              right: 5,
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

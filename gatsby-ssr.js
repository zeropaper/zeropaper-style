/* eslint-disable react/jsx-filename-extension, react/display-name */
const React = require('react');

const {
  default: ThemeProvider,
} = require('./src/themes/Theme');

// eslint-disable-next-line react/prop-types
exports.wrapRootElement = ({ element }) => (
  <ThemeProvider>
    {element}
  </ThemeProvider>
);

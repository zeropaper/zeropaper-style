/* eslint-disable react/jsx-filename-extension, react/display-name */
const React = require('react');

const {
  default: ThemeProvider,
} = require('./src/themes/Theme');
const {
  default: AssetsProvider,
} = require('./src/components/AssetsProvider/AssetsProvider');

// eslint-disable-next-line react/prop-types
exports.wrapRootElement = ({ element }) => (
  <AssetsProvider>
    <ThemeProvider>
      {element}
    </ThemeProvider>
  </AssetsProvider>
);

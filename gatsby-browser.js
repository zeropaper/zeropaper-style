/* eslint-disable react/jsx-filename-extension, react/display-name */
const React = require('react');

const {
  default: ThemeProvider,
} = require('./src/themes/Theme');
const {
  default: AssetsProvider,
} = require('./src/components/AssetsProvider/AssetsProvider');

// const {
//   hostname,
//   protocol,
//   host,
//   pathname,
//   search,
//   hash,
// } = window.location;
// if (hostname !== 'localhost' && protocol !== 'https:') {
//   window.location.href = `https://${host}${pathname}${search}${hash}`;
// }

// eslint-disable-next-line react/prop-types
exports.wrapRootElement = ({ element }) => (
  <AssetsProvider>
    <ThemeProvider>
      {element}
    </ThemeProvider>
  </AssetsProvider>
);

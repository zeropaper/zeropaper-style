/* eslint-disable react/jsx-filename-extension, react/display-name */
const React = require('react');

const {
  default: AssetsProvider,
} = require('./src/components/AssetsProvider/AssetsProvider');

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

// eslint-disable-next-line react/prop-types
exports.wrapRootElement = ({ element }) => (
  <AssetsProvider>
    {element}
  </AssetsProvider>
);

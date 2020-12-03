/* eslint-disable react/jsx-filename-extension, react/display-name */
const React = require('react');

const {
  MDXProvider,
} = require('@mdx-js/react');
const {
  default: Link,
} = require('./src/components/Link/Link');
const {
  default: ThemeProvider,
} = require('./src/themes/Theme');
const {
  default: AssetsProvider,
} = require('./src/components/AssetsProvider/AssetsProvider');

// eslint-disable-next-line react/prop-types
exports.wrapRootElement = ({ element }) => (
  <AssetsProvider>
    <MDXProvider
      components={{
        a: Link,
      }}
    >
      <ThemeProvider>
        {element}
      </ThemeProvider>
    </MDXProvider>
  </AssetsProvider>
);

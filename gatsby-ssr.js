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

// eslint-disable-next-line react/prop-types
exports.wrapRootElement = ({ element }) => (
  <ThemeProvider>
    <MDXProvider
      components={{
        a: Link,
      }}
    >
      {element}
    </MDXProvider>
  </ThemeProvider>
);

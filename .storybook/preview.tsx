import React from 'react';
import ThemeProvider from '../themes/Theme';

export const parameters = {
  layout: 'centered',
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      method: 'alphabetical',
      // order: ['Introduction', 'Atoms', 'Molecules', 'Organisms', 'Templates'],
      locales: ['en-US']
    }
  }
};

export const decorators = [
  (Story) => (
    <ThemeProvider
      withGlobalStyles
      withNormalizeCSS
    >
      <Story />
    </ThemeProvider>
  ),
];

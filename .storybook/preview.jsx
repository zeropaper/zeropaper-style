import React from 'react';
import ThemeProvider from '../src/themes/Theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].+' },
  layout: 'centered',
  controls: {
    // expanded: true
    // matchers: {
    //   color: /(background|color)$/i,
    //   date: /Date$/
    // }
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
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  ),
];

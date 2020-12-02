import React from 'react';
import ThemeProvider from '../src/themes/Theme';

/* eslint-disable import/prefer-default-export */
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  ),
];

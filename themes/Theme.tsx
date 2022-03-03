import React, { useState } from 'react';
import { MantineProvider, ColorScheme, ColorSchemeProvider, useMantineTheme, MantineProviderProps } from '@mantine/core';

export const ThemeProvider = ({ children, ...props }: MantineProviderProps) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider {...props} theme={{ colorScheme }}>
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );

}

export default ThemeProvider;

export const useTheme = useMantineTheme
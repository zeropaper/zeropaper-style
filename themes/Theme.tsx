import React from 'react';
import { MantineProvider, ColorScheme, ColorSchemeProvider, useMantineTheme, MantineProviderProps } from '@mantine/core';
import { useHotkeys, useLocalStorageValue, useColorScheme } from '@mantine/hooks';

export const ThemeProvider = ({ children, ...props }: MantineProviderProps) => {
  const preferredColorScheme = useColorScheme();

  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
    key: 'zps-color-scheme',
    defaultValue: preferredColorScheme,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        {...props}
        theme={{
          colorScheme,
          primaryColor: colorScheme === 'dark' ? 'gray' : 'dark'
        }}
        emotionOptions={{ key: 'zps', prepend: true }}
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default ThemeProvider;

export const useTheme = useMantineTheme
import React from 'react';
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
  useMantineTheme,
  MantineProviderProps,
} from '@mantine/core';
import {
  useHotkeys,
  useLocalStorageValue,
  useColorScheme,
} from '@mantine/hooks';

export const ThemeProvider = ({
  onToggleScheme,
  colorScheme = 'light',
  children,
  ...props
}: MantineProviderProps & {
  onToggleScheme?: (scheme: ColorScheme) => void;
  colorScheme?: ColorScheme;
}) => {
  const preferredColorScheme = useColorScheme();

  const toggleColorScheme = () => {
    if (typeof onToggleScheme === 'function')
      onToggleScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        {...props}
        theme={{
          other: {
            colorSchemeSwitch: {
              transitionDuration: '324ms',
              transitionTimingFunction: 'ease-in-out',
            },
          },
          colorScheme,
          primaryColor: colorScheme === 'dark' ? 'gray' : 'dark',
        }}
        emotionOptions={{ key: 'zps', prepend: true }}
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default ThemeProvider;

export const useTheme = useMantineTheme;

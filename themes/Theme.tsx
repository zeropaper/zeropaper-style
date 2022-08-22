import React, { useEffect, useState } from 'react';
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
  useMantineTheme,
  MantineProviderProps,
  createEmotionCache,
} from '@mantine/core';
import {
  useHotkeys,
  useLocalStorage,
  useColorScheme,
} from '@mantine/hooks';

const emotionCache = createEmotionCache({ key: 'overqwil' });

export const ThemeProvider = ({ children, ...props }: MantineProviderProps) => {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

  const [localColorScheme, setLocalColorScheme] =
    useLocalStorage<ColorScheme>({
      key: 'zps-color-scheme',
      defaultValue: preferredColorScheme,
    });

  const toggleColorScheme = (value?: ColorScheme) => {
    const next = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(next);
    setLocalColorScheme(next);
  };

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  useEffect(() => {
    if (colorScheme !== localColorScheme) {
      setColorScheme(localColorScheme);
    }
  }, [colorScheme, localColorScheme]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        {...props}
        emotionCache={emotionCache}
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
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default ThemeProvider;

export const useTheme = useMantineTheme;

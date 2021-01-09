
export interface CustomThemeProps {
  children: React.ReactNode;
}

interface ThemeSpacingFunction {
  (count?: number): number;
}

interface ThemeCommonColors {
  black: string;
  white: string;
}

interface ThemePalette {
  common: ThemeCommonColors;
}

interface ThemeTypography {
  fontSize: number;
  fontFamily: string;
  color: string;
  shades: string[];
}

interface ThemeBackground {
  color: string;
  shades: string[];
}

interface ThemeMediaQueries {
  mobilePortrait: string;
  mobileLandscape: string;
}

interface ThemeMixins {
  textMain: {};
  textContent: {};
  inlineListClasses: {};
}

export interface DefaultTheme {
  spacing: ThemeSpacingFunction;
  mode: 'dark' | 'light';
  toggleMode: () => void;
  palette: ThemePalette;
  typography: ThemeTypography;
  background: ThemeBackground;
  mediaQueries: ThemeMediaQueries;
  mixins: ThemeMixins;
}

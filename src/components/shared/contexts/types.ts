import { THEME_MODE } from './constants';

export type ThemeMode = (typeof THEME_MODE)[number];

export interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
}

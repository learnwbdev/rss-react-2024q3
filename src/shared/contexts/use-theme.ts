import { useContext } from 'react';
import { ThemeContext } from './theme-provider';
import { ThemeContextValue } from './types';

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme should be used within a ThemeProvider');
  }

  return context;
};

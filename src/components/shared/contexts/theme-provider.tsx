import { createContext, ReactNode, useEffect, useState } from 'react';
import { getInitialTheme } from './utils';
import { LOCAL_STORAGE_KEY } from '@constants';
import { localStorageHelper } from '@utils';
import { ThemeContextValue } from './types';

const initialValue: ThemeContextValue = {
  theme: getInitialTheme(),
  toggleTheme: (): void => undefined,
};

export const ThemeContext = createContext<ThemeContextValue>(initialValue);

export const ThemeProvider = ({ children }: { children: ReactNode }): ReactNode => {
  const [theme, setTheme] = useState(getInitialTheme());

  const toggleTheme = (): void => setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));

  useEffect(() => {
    if (localStorageHelper) {
      localStorageHelper.set(LOCAL_STORAGE_KEY.THEME, theme);
    }
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

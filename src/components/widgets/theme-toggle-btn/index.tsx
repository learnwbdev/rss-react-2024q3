import { ReactNode } from 'react';
import LightTheme from '@icons/light-theme.svg';
import DarkTheme from '@icons/dark-theme.svg';
import styles from './styles.module.css';
import { useTheme } from '@shared/contexts';

export const ThemeToggleBtn = (): ReactNode => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.toolbar}>
      <button
        className={styles.btn}
        type="button"
        onClick={toggleTheme}
        aria-label={`switch to ${theme === 'light' ? 'dark' : 'light'} theme (currently ${theme} theme)`}
      >
        {theme === 'light' ? <LightTheme /> : <DarkTheme />}
      </button>
    </div>
  );
};

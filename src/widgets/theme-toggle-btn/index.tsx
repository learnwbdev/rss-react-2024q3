import { toggleTheme, useAppDispatch, useAppSelector } from '@shared/store';
import LightTheme from '@assets/icons/light-theme.svg';
import DarkTheme from '@assets/icons/dark-theme.svg';
import styles from './styles.module.css';

export const ThemeToggleBtn = (): React.ReactNode => {
  const { theme } = useAppSelector((store) => store.theme);

  const dispatch = useAppDispatch();

  const handleClick = (): void => {
    dispatch(toggleTheme());
  };

  return (
    <div className={styles.toolbar}>
      <button
        className={styles.btn}
        type="button"
        onClick={handleClick}
        aria-label={`switch to ${theme === 'light' ? 'dark' : 'light'} theme (currently ${theme} theme)`}
      >
        {theme === 'light' ? <LightTheme /> : <DarkTheme />}
      </button>
    </div>
  );
};

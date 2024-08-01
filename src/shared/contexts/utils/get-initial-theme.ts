import { LOCAL_STORAGE_KEY } from '@shared/constants';
import { localStorageHelper } from '@shared/utils';
import { isThemeMode } from './is-theme-mode';
import { ThemeMode } from '../types';
import { THEME_MODE } from '../constants';

export const getInitialTheme = (): ThemeMode =>
  localStorageHelper.get(LOCAL_STORAGE_KEY.THEME, isThemeMode) ?? THEME_MODE[0];

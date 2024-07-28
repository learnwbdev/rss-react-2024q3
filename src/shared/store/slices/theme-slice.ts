import { createSlice } from '@reduxjs/toolkit';
import { ThemeMode } from '../types';
import { localStorageHelper } from '@shared/utils/helpers/local-storage-helper';
import { isThemeMode } from '../utils';
import { LOCAL_STORAGE_KEY } from '@shared/constants';

export interface ThemeState {
  theme: ThemeMode;
}

const getInitialTheme = (): ThemeMode => {
  const currentTheme = localStorageHelper.get(LOCAL_STORAGE_KEY.THEME, isThemeMode) ?? 'light';

  document.documentElement.dataset.theme = currentTheme;

  return currentTheme;
};

const initialState: ThemeState = {
  theme: getInitialTheme(),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const { theme } = state;

      state.theme = theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

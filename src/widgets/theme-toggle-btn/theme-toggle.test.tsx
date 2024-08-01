import { JSX } from 'react';
import { renderWithRouter, waitFor } from '@tests/utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { localStorageMock } from '@tests/mock-utils';
import { LOCAL_STORAGE_KEY } from '@shared/constants';
import { THEME_MODE } from '@shared/contexts/constants';

import { ThemeToggleBtn } from './index';

vi.mock('@assets/icons/light-theme.svg', () => ({
  __esModule: true,
  default: (): JSX.Element => <svg data-testid="light-theme-icon"></svg>,
}));

vi.mock('@assets/icons/dark-theme.svg', () => ({
  __esModule: true,
  default: (): JSX.Element => <svg data-testid="dark-theme-icon"></svg>,
}));

vi.spyOn(Storage.prototype, 'getItem').mockImplementation(localStorageMock.getItem);
vi.spyOn(Storage.prototype, 'setItem').mockImplementation(localStorageMock.setItem);
vi.spyOn(Storage.prototype, 'clear').mockImplementation(localStorageMock.clear);
vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(localStorageMock.removeItem);

beforeEach(() => {
  localStorageMock.clear();
});

describe('ThemeToggleBtn component', () => {
  it('should toggle theme and change icon on button click', async () => {
    const lightTheme = THEME_MODE[0];

    const darkTheme = THEME_MODE[1];

    localStorageMock.setItem(LOCAL_STORAGE_KEY.SEARCH_TERM, JSON.stringify(lightTheme));

    const { getByRole, user, getByTestId, queryByTestId } = renderWithRouter(<ThemeToggleBtn />);

    await waitFor(() => {
      expect(localStorageMock.getItem(LOCAL_STORAGE_KEY.THEME)).toBe(JSON.stringify(lightTheme));
    });

    await waitFor(() => {
      expect(getByTestId('light-theme-icon')).toBeInTheDocument();
      expect(queryByTestId('dark-theme-icon')).not.toBeInTheDocument();

      expect(localStorageMock.getItem(LOCAL_STORAGE_KEY.THEME)).toBe(JSON.stringify(lightTheme));
    });

    const regexDark = new RegExp(`switch to ${darkTheme} theme`, 'i');
    const regexLight = new RegExp(`switch to ${lightTheme} theme`, 'i');

    const toggleBtnDark = getByRole('button', { name: regexDark });

    await user.click(toggleBtnDark);

    await waitFor(() => {
      expect(queryByTestId('light-theme-icon')).not.toBeInTheDocument();
      expect(getByTestId('dark-theme-icon')).toBeInTheDocument();

      expect(localStorageMock.getItem(LOCAL_STORAGE_KEY.THEME)).toBe(JSON.stringify(darkTheme));
    });

    const toggleBtnLight = getByRole('button', { name: regexLight });

    await user.click(toggleBtnLight);

    await waitFor(() => {
      expect(getByTestId('light-theme-icon')).toBeInTheDocument();
      expect(queryByTestId('dark-theme-icon')).not.toBeInTheDocument();

      expect(localStorageMock.getItem(LOCAL_STORAGE_KEY.THEME)).toBe(JSON.stringify(lightTheme));
    });
  });
});

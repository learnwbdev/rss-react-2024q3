import { renderWithRouter, waitFor } from '@tests/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LOCAL_STORAGE_KEY } from '@shared/constants';
import { localStorageMock } from '@tests/mock-utils';

import { Search } from './index';

vi.spyOn(Storage.prototype, 'getItem').mockImplementation(localStorageMock.getItem);
vi.spyOn(Storage.prototype, 'setItem').mockImplementation(localStorageMock.setItem);
vi.spyOn(Storage.prototype, 'clear').mockImplementation(localStorageMock.clear);
vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(localStorageMock.removeItem);

beforeEach(() => {
  localStorageMock.clear();
});

describe('Search component', () => {
  it('saves search term to local storage on button click', async () => {
    const mockOnSearch = vi.fn();

    const searchText = 'test-search';

    const { getByRole, user } = renderWithRouter(<Search onSearch={mockOnSearch} disabled={false} />);

    const searchInput = getByRole('textbox', { name: /search:/i });
    const searchButton = getByRole('button', { name: /search/i });

    await user.type(searchInput, searchText);

    await user.click(searchButton);

    await waitFor(() => {
      expect(localStorageMock.getItem(LOCAL_STORAGE_KEY.SEARCH_TERM)).toBe(JSON.stringify(searchText));
    });
  });

  it('retrieves search term from local storage on mount', async () => {
    const searchText = 'stored';

    localStorageMock.setItem(LOCAL_STORAGE_KEY.SEARCH_TERM, JSON.stringify(searchText));

    const mockOnSearch = vi.fn();

    await waitFor(() => {
      expect(localStorageMock.getItem(LOCAL_STORAGE_KEY.SEARCH_TERM)).toBe(JSON.stringify(searchText));
    });

    const { getByRole } = renderWithRouter(<Search onSearch={mockOnSearch} disabled={false} />);

    const searchInput = getByRole('textbox', { name: /search:/i });

    await waitFor(() => {
      expect(searchInput).toHaveValue(searchText);
    });
  });

  it('saves input value to local storage on Enter key press', async () => {
    const mockOnSearch = vi.fn();

    const searchText = 'test-search';

    const { getByRole, user } = renderWithRouter(<Search onSearch={mockOnSearch} disabled={false} />);

    const searchInput = getByRole('textbox', { name: /search:/i });

    await user.type(searchInput, searchText);

    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(localStorageMock.getItem(LOCAL_STORAGE_KEY.SEARCH_TERM)).toBe(JSON.stringify(searchText));
    });
  });
});

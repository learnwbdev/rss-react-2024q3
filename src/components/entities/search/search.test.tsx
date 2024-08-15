import { render, waitFor } from '@tests/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LOCAL_STORAGE_KEY } from '@constants';
import { localStorageMock } from '@tests/mock-utils';
import { Search } from './index';

vi.mock('next/navigation', async () => {
  const original = await vi.importActual('next/navigation');

  return {
    ...original,
    useRouter: () => ({
      push: vi.fn(),
    }),
    useSearchParams: () => new URLSearchParams('page=1'),
  };
});

vi.spyOn(Storage.prototype, 'getItem').mockImplementation(localStorageMock.getItem);
vi.spyOn(Storage.prototype, 'setItem').mockImplementation(localStorageMock.setItem);
vi.spyOn(Storage.prototype, 'clear').mockImplementation(localStorageMock.clear);
vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(localStorageMock.removeItem);

beforeEach(() => {
  localStorageMock.clear();
});

describe('Search component', () => {
  it('saves search term to local storage on button click', async () => {
    const searchText = 'test-search';

    const { getByRole, user } = render(<Search />);

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

    await waitFor(() => {
      expect(localStorageMock.getItem(LOCAL_STORAGE_KEY.SEARCH_TERM)).toBe(JSON.stringify(searchText));
    });

    const { getByRole } = render(<Search />);

    const searchInput = getByRole('textbox', { name: /search:/i });

    await waitFor(() => {
      expect(searchInput).toHaveValue(searchText);
    });
  });

  it('saves input value to local storage on Enter key press', async () => {
    const searchText = 'test-search';

    const { getByRole, user } = render(<Search />);

    const searchInput = getByRole('textbox', { name: /search:/i });

    await user.type(searchInput, searchText);

    expect(searchInput).toHaveValue(searchText);

    await user.keyboard('{Enter}');

    await waitFor(() => {
      const savedValue = localStorageMock.getItem(LOCAL_STORAGE_KEY.SEARCH_TERM);

      expect(savedValue).toBe(JSON.stringify(searchText));
    });
  });
});

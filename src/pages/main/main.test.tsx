import { ReactNode } from 'react';
import { renderRoutes, renderWithRouter, waitFor, act } from '@tests/utils';
import { describe, it, expect, vi } from 'vitest';
import { peopleApi, selectItem, unselectAllItems } from '@shared/store';
import { SelectedFlyoutProps } from '@widgets/selected-flyout';

import { PersonBriefMockSubsets } from '@tests/mock-data';
import { MainPage } from './index';
import { Person } from '@shared/api';

vi.mock('@shared/ui', () => ({
  Loader: (): ReactNode => <div>Loading...</div>,
  ErrorFallback: (): ReactNode => <div>Error!</div>,
}));

vi.mock('@features/pagination', () => ({
  Pagination: ({ totalPages }: { totalPages: number }): ReactNode => <div>{`Pagination: ${totalPages}`}</div>,
}));

vi.mock('@entities', () => ({
  Search: (): ReactNode => <div>Search</div>,
}));

vi.mock('@widgets', () => ({
  CardList: ({ results }: { results: Person[] }): ReactNode => <div>{`CardList: ${results.length}`}</div>,
  SelectedFlyout: ({ isOpen }: SelectedFlyoutProps): ReactNode => {
    isOpen && null;
    return <div>Selected Flyout</div>;
  },
}));

describe('Main page', () => {
  const refetch = vi.fn();

  it('renders correctly with initial state', () => {
    const useGetPeopleQueryMock = vi
      .spyOn(peopleApi, 'useGetPeopleQuery')
      .mockReturnValue({ data: undefined, isFetching: true, refetch });

    const { getByRole, getByText, queryByText } = renderWithRouter(<MainPage />);

    expect(getByRole('heading', { name: /React is Cool/i, level: 1 })).toBeInTheDocument();
    expect(getByText('Search')).toBeInTheDocument();
    expect(getByText('Loading...')).toBeInTheDocument();
    expect(queryByText('CardList: 0')).not.toBeInTheDocument();
    expect(queryByText('Pagination')).not.toBeInTheDocument();

    useGetPeopleQueryMock.mockRestore();
  });

  it('displays Loader while fetching', () => {
    const useGetPeopleQueryMock = vi
      .spyOn(peopleApi, 'useGetPeopleQuery')
      .mockReturnValue({ data: undefined, error: undefined, isFetching: true, refetch });

    const { getByText } = renderWithRouter(<MainPage />);

    expect(getByText('Loading...')).toBeInTheDocument();

    useGetPeopleQueryMock.mockRestore();
  });

  it('renders CardList and Pagination when data is fetched successfully', async () => {
    const mockData = {
      totalPages: 5,
      results: PersonBriefMockSubsets[2],
    };

    const { totalPages, results } = mockData;

    const useGetPeopleQueryMock = vi
      .spyOn(peopleApi, 'useGetPeopleQuery')
      .mockReturnValue({ data: mockData, isFetching: false, refetch });

    const { getByRole, getByText, queryByText } = renderWithRouter(<MainPage />);

    const cardListRegex = new RegExp(`CardList: ${results.length}`, 'i');
    const paginationRegex = new RegExp(`Pagination: ${totalPages}`, 'i');

    await waitFor(() => {
      expect(getByRole('heading', { name: /React is Cool/i, level: 1 })).toBeInTheDocument();
      expect(getByText('Search')).toBeInTheDocument();
      expect(queryByText('Loading...')).not.toBeInTheDocument();
      expect(queryByText(cardListRegex)).toBeInTheDocument();
      expect(getByText(paginationRegex)).toBeInTheDocument();
    });

    useGetPeopleQueryMock.mockRestore();
  });

  it('shows SelectedFlyout if there are selected items', async () => {
    const itemsToSelect = [1, 2, 3];

    const { queryByText, store } = renderWithRouter(<MainPage />);

    act(() => {
      itemsToSelect.forEach((id) => {
        store.dispatch(selectItem(id.toString()));
      });
    });

    const state = store.getState();
    const { selectedItems } = state.selectedItems;

    await waitFor(() => {
      expect(selectedItems.length).toEqual(itemsToSelect.length);
    });

    expect(queryByText('Selected Flyout')).toBeInTheDocument();
  });

  it('hides SelectedFlyout if there are no selected items', async () => {
    const { queryByText, store } = renderWithRouter(<MainPage />);

    let state = store.getState();
    let { selectedItems } = state.selectedItems;

    await waitFor(() => {
      expect(selectedItems.length).toEqual(0);
    });

    expect(queryByText('Selected Flyout')).not.toBeInTheDocument();

    const itemsToSelect = [1, 2, 3];

    act(() => {
      itemsToSelect.forEach((id) => {
        store.dispatch(selectItem(id.toString()));
      });
    });

    state = store.getState();
    ({ selectedItems } = state.selectedItems);

    await waitFor(() => {
      expect(selectedItems.length).toEqual(itemsToSelect.length);
    });

    expect(queryByText('Selected Flyout')).toBeInTheDocument();

    act(() => {
      store.dispatch(unselectAllItems());
    });

    state = store.getState();
    ({ selectedItems } = state.selectedItems);

    await waitFor(() => {
      expect(selectedItems.length).toEqual(0);
    });

    expect(queryByText('Selected Flyout')).not.toBeInTheDocument();
  });

  it('hides details when clicking outside of detailed card', async () => {
    const routes = [
      {
        path: '/',
        element: <MainPage />,
        children: [
          {
            index: true,
            element: <>Detailed Card</>,
          },
        ],
      },
    ];

    const initialEntries = [
      {
        pathname: '/',
        search: `?page=1&details=1`,
      },
    ];

    const { getByText, queryByText, user } = renderRoutes(routes, { memRouterOpts: { initialEntries } });

    await waitFor(() => {
      expect(queryByText('Detailed Card')).toBeInTheDocument();
    });

    const searchLabel = getByText(/search/i);

    await user.click(searchLabel);

    await waitFor(() => {
      expect(queryByText('Detailed Card')).not.toBeInTheDocument();
    });
  });
});

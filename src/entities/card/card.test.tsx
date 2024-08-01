import { renderWithRouter, renderRoutes, waitFor, screen, act } from '@tests/utils';
import { describe, it, expect, vi } from 'vitest';
import { Outlet } from 'react-router-dom';

import { PersonBriefMockSubsets } from '@mock-data';
import { peopleApi, SelectedItemsState, setupStore, selectItem } from '@shared/store';
import { Card } from './index';

const mockDataSet = PersonBriefMockSubsets[1];

describe('Card component', () => {
  describe('renders relevant data', () => {
    mockDataSet.forEach((mockData, idx) => {
      it(`with mock data ${idx}`, () => {
        const { getByRole, getByText } = renderWithRouter(<Card personBrief={mockData} />);

        const { name, height } = mockData;

        expect(getByRole('heading', { name })).toBeInTheDocument();

        const regexPattern = new RegExp(height, 'i');
        expect(getByText(regexPattern)).toBeInTheDocument();
      });
    });
  });

  it('opens detailed card on click', async () => {
    const mockData = mockDataSet[0];

    const fakeDetailedText = 'Detailed Card Fake';

    const routes = [
      {
        path: '/',
        element: (
          <>
            <Card personBrief={mockData} />
            <Outlet />
          </>
        ),
        children: [
          {
            index: true,
            element: <>{fakeDetailedText}</>,
          },
        ],
      },
    ];

    const initialEntries = [
      {
        pathname: '/',
        search: '?page=1',
      },
    ];

    const { user, getByText, router } = renderRoutes(routes, { memRouterOpts: { initialEntries } });

    const { name, id } = mockData;

    expect(router.state.location.pathname).toEqual('/');
    expect(router.state.location.search).toEqual('?page=1');

    await user.click(getByText(name));

    await waitFor(() => {
      expect(router.state.location.pathname).toEqual('/');
      expect(router.state.location.search).toEqual(`?page=1&details=${id}`);

      expect(screen.getByText(fakeDetailedText)).toBeInTheDocument();
    });
  });

  it('makes API call to get person details when card is clicked', async () => {
    const mockDataCard = mockDataSet[0];

    const { name, id } = mockDataCard;

    const useGetPersonByIdQuerySpy = vi.spyOn(peopleApi, 'useGetPersonByIdQuery');

    const { getByText, user, store } = renderWithRouter(<Card personBrief={mockDataCard} />);

    const state = store.getState();
    const { selectedItems } = state.selectedItems;
    const itemsCnt = selectedItems.length;

    await waitFor(() => {
      expect(itemsCnt).toEqual(0);
    });

    await user.click(getByText(name));

    await waitFor(() => {
      expect(useGetPersonByIdQuerySpy).toHaveBeenCalledWith(id, { skip: true });
    });

    useGetPersonByIdQuerySpy.mockRestore();
  });

  it('makes API call when checkbox is clicked', async () => {
    const mockData = mockDataSet[0];

    const { id } = mockData;

    const useGetPersonByIdQuerySpy = vi.spyOn(peopleApi, 'useGetPersonByIdQuery');

    const { getByRole, user, store } = renderWithRouter(<Card personBrief={mockData} />);

    const state = store.getState();
    const { selectedItems } = state.selectedItems;
    const itemsCnt = selectedItems.length;

    await waitFor(() => {
      expect(itemsCnt).toEqual(0);
    });

    const checkbox = getByRole('checkbox');

    await user.click(checkbox);

    await waitFor(() => {
      expect(useGetPersonByIdQuerySpy).toHaveBeenCalledWith(id, { skip: false });
    });

    useGetPersonByIdQuerySpy.mockRestore();
  });

  it('selects card when checkbox is clicked', async () => {
    const mockData = mockDataSet[0];

    const initialSelected: SelectedItemsState = { selectedItems: [] };

    const { getByRole, user, store } = renderWithRouter(<Card personBrief={mockData} />, {
      storeOpts: {
        preloadedState: { selectedItems: initialSelected },
      },
    });

    const { id } = mockData;

    const checkbox = getByRole('checkbox');

    await user.click(checkbox);

    await waitFor(() => {
      const state = store.getState();

      const { selectedItems } = state.selectedItems;

      expect(selectedItems.includes(id)).toBe(true);
    });
  });

  it('unselects card when checkbox is clicked again', async () => {
    const mockData = mockDataSet[0];

    const { id } = mockData;

    const store = setupStore();

    act(() => {
      store.dispatch(selectItem(id));
    });

    const { getByRole, user } = renderWithRouter(<Card personBrief={mockData} />, { storeOpts: { store } });

    const checkbox = getByRole('checkbox');

    await user.click(checkbox);

    await waitFor(() => {
      const state = store.getState();

      const { selectedItems } = state.selectedItems;

      expect(selectedItems.includes(id)).toBe(false);
    });
  });
});

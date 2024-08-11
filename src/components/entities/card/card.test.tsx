import { render, waitFor, act } from '@tests/utils';
import { describe, it, expect, vi } from 'vitest';
import mockRouter from 'next-router-mock';

import { PersonBriefMockSubsets } from '@mock-data';
import { SelectedItemsState, setupStore, selectItem } from '@store';
import { Card } from './index';

vi.mock('next/router', async () => {
  const routerMock = await vi.importActual('next-router-mock');
  return routerMock;
});

const mockDataSet = PersonBriefMockSubsets[1];

describe('Card component', () => {
  describe('renders relevant data', () => {
    mockDataSet.forEach((mockData, idx) => {
      it(`with mock data ${idx}`, () => {
        const { getByRole, getByText } = render(<Card personBrief={mockData} />);

        const { name, height } = mockData;

        expect(getByRole('heading', { name })).toBeInTheDocument();

        const regexPattern = new RegExp(height, 'i');
        expect(getByText(regexPattern)).toBeInTheDocument();
      });
    });
  });

  it('updates query to show details when card is clicked', async () => {
    const mockData = mockDataSet[0];

    const { name, id } = mockData;

    const initialPath = `/?page=1`;

    await mockRouter.push(initialPath);

    const { user, getByText } = render(<Card personBrief={mockData} />);

    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        pathname: '/',
        query: { page: '1' },
      });

      expect(mockRouter.query).toEqual({ page: '1' });
    });

    await user.click(getByText(name));

    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        pathname: '/',
        query: { page: '1', details: id },
      });

      expect(mockRouter.query).toEqual({ page: '1', details: id });
    });
  });

  it('selects card when checkbox is clicked', async () => {
    const mockData = mockDataSet[0];

    const initialSelected: SelectedItemsState = { selectedItems: [] };

    const { getByRole, user, store } = render(<Card personBrief={mockData} />, {
      preloadedState: { selectedItems: initialSelected },
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

    const { getByRole, user } = render(<Card personBrief={mockData} />, { store });

    const checkbox = getByRole('checkbox');

    await user.click(checkbox);

    await waitFor(() => {
      const state = store.getState();

      const { selectedItems } = state.selectedItems;

      expect(selectedItems.includes(id)).toBe(false);
    });
  });
});

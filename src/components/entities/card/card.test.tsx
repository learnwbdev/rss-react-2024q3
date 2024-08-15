import { render, waitFor, act } from '@tests/utils';
import { describe, it, expect, vi } from 'vitest';
import { PersonBriefMockSubsets } from '@mock-data';
import { setupStore } from '@store';
import { SelectedItemsState, selectItem } from '@lib-features/selected-items';
import { Card } from './index';
import { URL_PARAM } from '@constants';

const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  refresh: vi.fn(),
  prefetch: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
};

const mockSearchParams = new URLSearchParams({ [URL_PARAM.PAGE]: '1' });

vi.mock('next/navigation', async () => {
  const original = await vi.importActual('next/navigation');

  return {
    ...original,
    useRouter: () => mockRouter,
    useSearchParams: () => mockSearchParams,
  };
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

    const { user, getByText } = render(<Card personBrief={mockData} />);

    await waitFor(() => {
      expect(mockSearchParams.get(URL_PARAM.PAGE)).toEqual('1');
    });

    await user.click(getByText(name));

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith(`/?page=1&details=${id}`);
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

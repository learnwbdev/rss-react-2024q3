import { render, waitFor, act } from '@tests/utils';
import { describe, it, expect, vi } from 'vitest';

import { setupStore, selectItem, unselectAllItems } from '@store';
import { SelectedFlyout } from './index';

describe('SelectedFlyout component', () => {
  it('displays correct message for one selected item', () => {
    const id = '1';

    const store = setupStore();

    act(() => {
      store.dispatch(selectItem(id));
    });

    const { getByRole, getByText } = render(<SelectedFlyout isOpen />, { store });

    const downloadBtn = getByRole('button', { name: /download/i });
    const unselectAllBtn = getByRole('button', { name: /unselect all/i });

    expect(getByText(/1 item is selected/i)).toBeInTheDocument();
    expect(downloadBtn).toBeInTheDocument();
    expect(unselectAllBtn).toBeInTheDocument();
  });

  it('displays correct message for multiple selected items', async () => {
    const itemsToSelect = [1, 2, 5];

    const store = setupStore();

    act(() => {
      itemsToSelect.forEach((id) => {
        store.dispatch(selectItem(id.toString()));
      });
    });

    const state = store.getState();
    const { selectedItems } = state.selectedItems;
    const itemsCnt = selectedItems.length;

    await waitFor(() => {
      expect(itemsCnt).toEqual(itemsToSelect.length);
    });

    const { getByRole, getByText } = render(<SelectedFlyout isOpen />, { store });

    const downloadBtn = getByRole('button', { name: /download/i });
    const unselectAllBtn = getByRole('button', { name: /unselect all/i });

    const regexPattern = new RegExp(`${itemsCnt} items are selected`, 'i');

    expect(getByText(regexPattern)).toBeInTheDocument();
    expect(downloadBtn).toBeInTheDocument();
    expect(unselectAllBtn).toBeInTheDocument();
  });

  it('dispatches unselectAllItems action when Unselect All button is clicked', async () => {
    const itemsToSelect = [1, 2, 5];

    const store = setupStore();

    const dispatchSpy = vi.spyOn(store, 'dispatch');

    act(() => {
      itemsToSelect.forEach((id) => {
        store.dispatch(selectItem(id.toString()));
      });
    });

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalledWith(selectItem('1'));
      expect(dispatchSpy).toHaveBeenCalledWith(selectItem('2'));
      expect(dispatchSpy).toHaveBeenCalledWith(selectItem('5'));
    });

    const state = store.getState();
    const { selectedItems } = state.selectedItems;
    const itemsCnt = selectedItems.length;

    await waitFor(() => {
      expect(itemsCnt).toEqual(itemsToSelect.length);
    });

    const { getByRole, user } = render(<SelectedFlyout isOpen />, { store });

    const unselectAllBtn = getByRole('button', { name: /unselect all/i });

    await user.click(unselectAllBtn);

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalledWith(unselectAllItems());
    });

    await waitFor(() => {
      const state = store.getState();
      const { selectedItems } = state.selectedItems;

      expect(selectedItems.length).toEqual(0);
    });
  });
});

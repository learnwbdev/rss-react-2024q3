import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SelectedItemsState {
  selectedItems: string[];
}

const initialState: SelectedItemsState = {
  selectedItems: [],
};

export const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleSelectedItem: (state, action: PayloadAction<string>) => {
      const { selectedItems } = state;

      const itemId = action.payload;

      const selectedIdx = selectedItems.indexOf(itemId);

      if (selectedIdx !== -1) {
        selectedItems.splice(selectedIdx, 1);
      } else {
        selectedItems.push(itemId);
      }

      return state;
    },
    unselectAllItems: (state) => {
      const { selectedItems } = state;

      selectedItems.length = 0;

      return state;
    },
  },
});

export const { toggleSelectedItem, unselectAllItems } = selectedItemsSlice.actions;

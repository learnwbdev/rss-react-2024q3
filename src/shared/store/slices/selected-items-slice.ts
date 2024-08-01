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
    selectItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;

      state.selectedItems = [...state.selectedItems, itemId];
    },
    unselectItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;

      state.selectedItems = state.selectedItems.filter((item) => item !== itemId);
    },
    unselectAllItems: (state) => {
      state.selectedItems = [];
    },
  },
});

export const { selectItem, unselectItem, unselectAllItems } = selectedItemsSlice.actions;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormPost } from 'types';

interface FormsState {
  forms: FormPost[];
}

const initialState: FormsState = {
  forms: [],
};

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addFormData(state, action: PayloadAction<FormPost>) {
      state.forms.push(action.payload);
    },
    clearFreshFlag(state, action: PayloadAction<string>) {
      const postId = action.payload;

      const form = state.forms.find(({ id }) => id === postId);

      if (form) {
        form.isDataFresh = false;
      }
    },
  },
});

export const { addFormData, clearFreshFlag } = formsSlice.actions;

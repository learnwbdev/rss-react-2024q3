import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { clearFreshFlag, addFormData } from 'store/slices';
import { FormPost } from '@types';
import { FORM_HIGHLIGHT_DURATION_MS } from '@constants';

export const submitFormData = createAsyncThunk(
  'forms/submitFormData',
  async (formAction: Omit<FormPost, 'id' | 'isDataFresh'>, { dispatch }) => {
    const id = uuidv4();

    dispatch(addFormData({ ...formAction, id, isDataFresh: true }));

    await new Promise((resolve) => setTimeout(resolve, FORM_HIGHLIGHT_DURATION_MS));

    dispatch(clearFreshFlag(id));
  }
);

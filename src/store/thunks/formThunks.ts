import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearFreshFlag, FormAction, setFormData } from 'store/slices';
import { FORM_HIGHLIGHT_DURATION_MS } from '@constants';

export const submitFormData = createAsyncThunk('forms/submitFormData', async (formAction: FormAction, { dispatch }) => {
  dispatch(setFormData(formAction));

  const { formType } = formAction;

  await new Promise((resolve) => setTimeout(resolve, FORM_HIGHLIGHT_DURATION_MS));
  dispatch(clearFreshFlag(formType));
});

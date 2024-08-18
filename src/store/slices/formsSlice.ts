import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormFields, FormState, FormType } from 'types';

interface FormsState {
  forms: Record<FormType, FormState | null>;
}

export interface FormAction {
  formType: FormType;
  data: FormFields;
}

const initialState: FormsState = {
  forms: {
    uncontrolled: null,
    hook: null,
  },
};

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setFormData(state, action: PayloadAction<FormAction>) {
      const { formType, data } = action.payload;

      state.forms[formType] = {
        formData: data,
        isDataFresh: true,
      };
    },
    clearFreshFlag(state, action: PayloadAction<FormType>) {
      const formType = action.payload;

      const form = state.forms[formType];

      if (form) {
        form.isDataFresh = false;
      }
    },
  },
});

export const { setFormData, clearFreshFlag } = formsSlice.actions;

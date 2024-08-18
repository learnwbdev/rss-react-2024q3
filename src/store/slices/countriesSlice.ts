import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Country } from 'types';

interface CountriesState {
  countries: Country[];
}

const initialState: CountriesState = {
  countries: [],
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountries(state, action: PayloadAction<Country[]>) {
      state.countries = action.payload;
    },
  },
});

export const { setCountries } = countriesSlice.actions;

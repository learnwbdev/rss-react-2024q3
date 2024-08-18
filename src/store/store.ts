import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { formsSlice, countriesSlice } from './slices';

const reducer = combineReducers({
  [formsSlice.name]: formsSlice.reducer,
  [countriesSlice.name]: countriesSlice.reducer,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const setupStore = (preloadedState?: Partial<RootState>): AppStore => {
  return configureStore({
    reducer,
    preloadedState,
  });
};

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { selectedItemsSlice } from './features/selected-items';

const reducer = combineReducers({
  [selectedItemsSlice.name]: selectedItemsSlice.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const setupStore = (preloadedState?: Partial<RootState>): AppStore => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    preloadedState,
  });
};

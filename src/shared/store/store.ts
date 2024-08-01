import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { selectedItemsSlice, peopleApi } from './slices';

const reducer = combineReducers({
  [selectedItemsSlice.name]: selectedItemsSlice.reducer,
  [peopleApi.reducerPath]: peopleApi.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(peopleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

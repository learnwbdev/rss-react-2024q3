import { combineReducers, configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { themeSlice, toggleTheme } from './slices';
import { localStorageHelper } from '@shared/utils';

const reducer = combineReducers({
  [themeSlice.name]: themeSlice.reducer,
});

export const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const startAppListening = listenerMiddleware.startListening.withTypes<RootState, AppDispatch>();

startAppListening({
  actionCreator: toggleTheme,
  effect: (_, { getState }) => {
    const currentTheme = getState().theme.theme;

    document.documentElement.dataset.theme = currentTheme;
    localStorageHelper.set('theme', currentTheme);
  },
});

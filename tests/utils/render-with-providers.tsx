import { PropsWithChildren, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { RenderOptions, RenderResult, render } from '@testing-library/react';
import { setupStore, RootState, AppStore } from '@shared/store';
import { ThemeProvider } from '@shared/contexts';

export interface RenderProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export interface RenderProvidersResult extends RenderResult {
  store: AppStore;
}

export const renderWithProviders = (ui: ReactNode, options: RenderProvidersOptions = {}): RenderProvidersResult => {
  const { preloadedState = {}, store = setupStore(preloadedState), ...renderOptions } = options;

  const WrapperWithProviders = ({ children }: PropsWithChildren): ReactNode => (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );

  return {
    store,
    ...render(ui, { wrapper: WrapperWithProviders, ...renderOptions }),
  };
};

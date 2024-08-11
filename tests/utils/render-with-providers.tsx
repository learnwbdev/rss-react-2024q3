import { PropsWithChildren, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { RenderOptions, RenderResult, render } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { setupStore, RootState, AppStore } from '@store';
import { ThemeProvider } from '@shared/contexts';

export interface RenderProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export interface RenderProvidersResult extends RenderResult {
  user: UserEvent;
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
    user: userEvent.setup(),
    store,
    ...render(ui, { wrapper: WrapperWithProviders, ...renderOptions }),
  };
};

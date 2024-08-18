import { PropsWithChildren, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { RenderOptions, RenderResult, render } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { setupStore, RootState, AppStore } from '@store';

export interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export interface RenderWithProvidersResult extends RenderResult {
  user: UserEvent;
  store: AppStore;
}

export const renderWithProviders = (
  ui: ReactNode,
  options: RenderWithProvidersOptions = {}
): RenderWithProvidersResult => {
  const { preloadedState = {}, store = setupStore(preloadedState), ...renderOptions } = options;

  const WrapperWithProviders = ({ children }: PropsWithChildren): ReactNode => (
    <Provider store={store}>{children}</Provider>
  );

  return {
    user: userEvent.setup(),
    store,
    ...render(ui, { wrapper: WrapperWithProviders, ...renderOptions }),
  };
};

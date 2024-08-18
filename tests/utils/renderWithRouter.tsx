import { ReactNode } from 'react';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import { renderWithProviders, RenderWithProvidersResult, RenderWithProvidersOptions } from './renderWithProviders';

type MemoryRouterConfig = Pick<MemoryRouterProps, 'initialEntries' | 'initialIndex'>;

export const renderWithRouter = (
  ui: ReactNode,
  options: {
    storeOptions?: RenderWithProvidersOptions;
    routerConfig?: MemoryRouterConfig;
  } = {}
): RenderWithProvidersResult => {
  const { storeOptions = {}, routerConfig = {} } = options;

  const { initialEntries = ['/'], initialIndex } = routerConfig;

  return {
    ...renderWithProviders(
      <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
        {ui}
      </MemoryRouter>,
      storeOptions
    ),
  };
};

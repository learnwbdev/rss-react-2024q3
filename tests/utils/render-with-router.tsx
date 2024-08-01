import { ReactNode } from 'react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import { renderWithProviders as render, RenderProvidersResult, RenderProvidersOptions } from './render-with-providers';

type RenderRouterResult = RenderProvidersResult & {
  user: UserEvent;
};

type MemoryRouterEntries = Pick<MemoryRouterProps, 'initialEntries' | 'initialIndex'>;

export const renderWithRouter = (
  ui: ReactNode,
  options: {
    storeOpts?: RenderProvidersOptions;
    memRouterOpts?: MemoryRouterEntries;
  } = {}
): RenderRouterResult => {
  const { storeOpts = {}, memRouterOpts = {} } = options;

  const { initialEntries = ['/'], initialIndex } = memRouterOpts;

  return {
    user: userEvent.setup(),
    ...render(
      <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
        {ui}
      </MemoryRouter>,
      storeOpts
    ),
  };
};

import userEvent, { UserEvent } from '@testing-library/user-event';
import { MemoryRouterProps, RouteObject, RouterProvider, createMemoryRouter } from 'react-router-dom';
import { renderWithProviders as render, RenderProvidersResult, RenderProvidersOptions } from './render-with-providers';

type MemoryRouterEntries = Pick<MemoryRouterProps, 'initialEntries' | 'initialIndex'>;

type RenderRoutesResult = RenderProvidersResult & {
  user: UserEvent;
  router: ReturnType<typeof createMemoryRouter>;
};

export const renderRoutes = (
  routes: RouteObject[],
  options: {
    storeOpts?: RenderProvidersOptions;
    memRouterOpts?: MemoryRouterEntries;
  } = {}
): RenderRoutesResult => {
  const { storeOpts = {}, memRouterOpts } = options;

  const router = createMemoryRouter(routes, memRouterOpts);

  return {
    user: userEvent.setup(),
    router,
    ...render(<RouterProvider router={router} />, storeOpts),
  };
};

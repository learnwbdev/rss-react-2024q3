import { MemoryRouterProps, RouteObject, RouterProvider, createMemoryRouter } from 'react-router-dom';
import { renderWithProviders, RenderWithProvidersResult, RenderWithProvidersOptions } from './renderWithProviders';

type MemoryRouterConfig = Pick<MemoryRouterProps, 'initialEntries' | 'initialIndex'>;

type RenderWithRoutesResult = RenderWithProvidersResult & {
  router: ReturnType<typeof createMemoryRouter>;
};

export const renderWithRoutes = (
  routes: RouteObject[],
  options: {
    storeOptions?: RenderWithProvidersOptions;
    routerConfig?: MemoryRouterConfig;
  } = {}
): RenderWithRoutesResult => {
  const { storeOptions = {}, routerConfig } = options;

  const router = createMemoryRouter(routes, routerConfig);

  return {
    router,
    ...renderWithProviders(<RouterProvider router={router} />, storeOptions),
  };
};

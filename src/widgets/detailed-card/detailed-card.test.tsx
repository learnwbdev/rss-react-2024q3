import { renderRoutes, renderWithRouter, waitFor } from '@tests/utils';
import { describe, it, expect } from 'vitest';
import { mswServer } from '@tests/msw-server';
import { delayedHandler } from '@tests/handlers';
import { Outlet } from 'react-router-dom';

import { ApiPeopleMockList } from '@mock-data';
import { DetailedCard } from './index';

describe('DetailedCard component', () => {
  it('displays correct data', async () => {
    const personId = 1;

    const mockData = ApiPeopleMockList[personId - 1];

    const initialEntries = [
      {
        pathname: '/',
        search: `?page=1&details=${personId}`,
      },
    ];

    const { getByText, getByRole } = renderWithRouter(<DetailedCard />, { memRouterOpts: { initialEntries } });

    const {
      name,
      height,
      mass,
      hair_color: hairColor,
      skin_color: skinColor,
      eye_color: eyeColor,
      birth_year: birthYear,
      gender,
    } = mockData;

    await waitFor(() => {
      expect(getByRole('heading', { level: 2, name })).toBeInTheDocument();
      expect(getByText(`Height: ${height}`)).toBeInTheDocument();
      expect(getByText(`Mass: ${mass}`)).toBeInTheDocument();
      expect(getByText(`Hair color: ${hairColor}`)).toBeInTheDocument();
      expect(getByText(`Skin color: ${skinColor}`)).toBeInTheDocument();
      expect(getByText(`Eye color: ${eyeColor}`)).toBeInTheDocument();
      expect(getByText(`Birth year: ${birthYear}`)).toBeInTheDocument();
      expect(getByText(`Gender: ${gender}`)).toBeInTheDocument();
      getByRole('button', { name: /close/i });
    });
  });

  it('hides component when close button is clicked', async () => {
    const personId = 1;

    const mockData = ApiPeopleMockList[personId - 1];

    const routes = [
      {
        path: '/',
        element: (
          <>
            <Outlet />
          </>
        ),
        children: [
          {
            index: true,
            element: <DetailedCard />,
          },
        ],
      },
    ];

    const initialEntries = [
      {
        pathname: '/',
        search: `?page=1&details=${personId}`,
      },
    ];

    const { name } = mockData;

    const { getByRole, queryByRole, router, user } = renderRoutes(routes, { memRouterOpts: { initialEntries } });

    await waitFor(() => {
      expect(router.state.location.pathname).toEqual('/');
      expect(router.state.location.search).toEqual(`?page=1&details=${personId}`);

      expect(getByRole('heading', { level: 2, name })).toBeInTheDocument();
    });

    const closeButton = getByRole('button', { name: /close/i });

    await user.click(closeButton);

    await waitFor(() => {
      expect(router.state.location.pathname).toEqual('/');
      expect(router.state.location.search).toEqual('?page=1');

      expect(queryByRole('heading', { level: 2, name })).not.toBeInTheDocument();
    });
  });

  it('displays loader while data is being fetched', async () => {
    mswServer.use(delayedHandler);

    const personId = 1;

    const initialEntries = [
      {
        pathname: '/',
        search: `?page=1&details=${personId}`,
      },
    ];

    const mockData = ApiPeopleMockList[personId - 1];

    const { name } = mockData;

    const { getByTestId, queryByTestId, getByRole } = renderWithRouter(<DetailedCard />, {
      memRouterOpts: { initialEntries },
    });

    expect(getByTestId('loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(queryByTestId('loader')).not.toBeInTheDocument();

      expect(getByRole('heading', { level: 2, name })).toBeInTheDocument();
    });
  });
});

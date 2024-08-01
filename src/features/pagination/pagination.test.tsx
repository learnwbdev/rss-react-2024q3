import { renderRoutes, renderWithRouter, waitFor } from '@tests/utils';
import { describe, it, expect } from 'vitest';

import { Pagination } from './index';

describe('Pagination component', () => {
  describe('updates URL query parameters on page change', () => {
    it('on specific page click', async () => {
      const totalPages = 5;

      const initialPage = 1;

      const pages = [2, 5];

      const routes = [
        {
          path: '/',
          element: <Pagination totalPages={totalPages} />,
        },
      ];

      const initialEntries = [
        {
          pathname: '/',
          search: `?page=${initialPage}`,
        },
      ];

      const { getByRole, router, user } = renderRoutes(routes, { memRouterOpts: { initialEntries } });

      await waitFor(() => {
        expect(router.state.location.pathname).toEqual('/');
        expect(router.state.location.search).toEqual(`?page=${initialPage}`);
      });

      for await (const page of pages) {
        const pageBtn = getByRole('button', { name: `${page}` });

        await user.click(pageBtn);

        await waitFor(() => {
          expect(router.state.location.pathname).toEqual('/');
          expect(router.state.location.search).toEqual(`?page=${page}`);
        });
      }
    });

    it('on next and previous button clicks', async () => {
      const totalPages = 5;

      let page = 2;

      const routes = [
        {
          path: '/',
          element: <Pagination totalPages={totalPages} />,
        },
      ];

      const initialEntries = [
        {
          pathname: '/',
          search: `?page=${page}`,
        },
      ];

      const { getByRole, router, user } = renderRoutes(routes, { memRouterOpts: { initialEntries } });

      await waitFor(() => {
        expect(router.state.location.pathname).toEqual('/');
        expect(router.state.location.search).toEqual(`?page=${page}`);
      });

      const nextButton = getByRole('button', { name: /go to next page/i });
      await user.click(nextButton);

      page += 1;

      await waitFor(() => {
        expect(router.state.location.pathname).toEqual('/');
        expect(router.state.location.search).toEqual(`?page=${page}`);
      });

      const prevButton = getByRole('button', { name: /go to previous page/i });
      await user.click(prevButton);

      page -= 1;

      await waitFor(() => {
        expect(router.state.location.pathname).toEqual('/');
        expect(router.state.location.search).toEqual(`?page=${page}`);
      });
    });
  });

  it('disables previous button on first page and next button on last page', async () => {
    const totalPages = 5;

    let page = 1;

    const routes = [
      {
        path: '/',
        element: <Pagination totalPages={totalPages} />,
      },
    ];

    const initialEntries = [
      {
        pathname: '/',
        search: `?page=${page}`,
      },
    ];

    const { getByRole, router, user } = renderRoutes(routes, { memRouterOpts: { initialEntries } });

    await waitFor(() => {
      expect(router.state.location.pathname).toEqual('/');
      expect(router.state.location.search).toEqual(`?page=${page}`);
    });

    const prevButton = getByRole('button', { name: /go to previous page/i });
    expect(prevButton).toBeDisabled();

    page = totalPages;

    const lastPageBtn = getByRole('button', { name: `${page}` });
    await user.click(lastPageBtn);

    await waitFor(() => {
      expect(router.state.location.pathname).toEqual('/');
      expect(router.state.location.search).toEqual(`?page=${page}`);
    });

    const nextButton = getByRole('button', { name: /go to next page/i });
    expect(nextButton).toBeDisabled();
  });

  it('renders all pages when totalPages is less than or equal to 5', () => {
    const totalPages = 5;

    const { getByRole } = renderWithRouter(<Pagination totalPages={totalPages} />);

    for (let page = 1; page <= totalPages; page++) {
      const pageBtn = getByRole('button', { name: `${page}` });

      expect(pageBtn).toBeInTheDocument();
    }
  });

  it('renders pagination with ellipsis when totalPages is greater than 5', () => {
    const totalPages = 10;

    const { getByRole, getByText } = renderWithRouter(<Pagination totalPages={totalPages} />);

    expect(getByText('...')).toBeInTheDocument();

    for (let page = 1; page <= 3; page++) {
      const pageBtn = getByRole('button', { name: `${page}` });

      expect(pageBtn).toBeInTheDocument();
    }

    const lastPageBtn = getByRole('button', { name: `${totalPages}` });

    expect(lastPageBtn).toBeInTheDocument();
  });

  it('renders ellipsis and current page correctly when in the middle range', () => {
    const totalPages = 10;
    const currentPage = 5;

    const routes = [
      {
        path: '/',
        element: <Pagination totalPages={totalPages} />,
      },
    ];

    const initialEntries = [
      {
        pathname: '/',
        search: `?page=${currentPage}`,
      },
    ];

    const { getByRole, getAllByText } = renderRoutes(routes, { memRouterOpts: { initialEntries } });

    const currPageBtn = getByRole('button', { name: `${currentPage}` });
    const lastPageBtn = getByRole('button', { name: `${totalPages}` });

    const ellipsis = getAllByText('...');

    expect(ellipsis).toHaveLength(2);
    expect(currPageBtn).toBeInTheDocument();
    expect(currPageBtn).toBeDisabled();
    expect(lastPageBtn).toBeInTheDocument();
  });

  it('handles edge case where currentPage is the first page correctly', () => {
    const totalPages = 10;
    const currentPage = 1;

    const routes = [
      {
        path: '/',
        element: <Pagination totalPages={totalPages} />,
      },
    ];

    const initialEntries = [
      {
        pathname: '/',
        search: `?page=${currentPage}`,
      },
    ];

    const { getByRole, getByText } = renderRoutes(routes, { memRouterOpts: { initialEntries } });

    expect(getByText('...')).toBeInTheDocument();

    for (let page = 1; page <= 3; page++) {
      const pageBtn = getByRole('button', { name: `${page}` });

      expect(pageBtn).toBeInTheDocument();
    }

    const currPageBtn = getByRole('button', { name: `${currentPage}` });
    const lastPageBtn = getByRole('button', { name: `${totalPages}` });

    expect(currPageBtn).toBeInTheDocument();
    expect(currPageBtn).toBeDisabled();
    expect(lastPageBtn).toBeInTheDocument();
  });

  it('handles edge case where currentPage is the last page correctly', () => {
    const totalPages = 10;
    const currentPage = totalPages;

    const routes = [
      {
        path: '/',
        element: <Pagination totalPages={totalPages} />,
      },
    ];

    const initialEntries = [
      {
        pathname: '/',
        search: `?page=${currentPage}`,
      },
    ];

    const { getByRole, getByText } = renderRoutes(routes, { memRouterOpts: { initialEntries } });

    expect(getByText('...')).toBeInTheDocument();

    const lastPageBtn = getByRole('button', { name: `${totalPages}` });

    expect(lastPageBtn).toBeInTheDocument();
    expect(lastPageBtn).toBeDisabled();

    for (let page = totalPages - 2; page <= totalPages; page++) {
      const pageBtn = getByRole('button', { name: `${page}` });

      expect(pageBtn).toBeInTheDocument();
    }
  });
});

import { render, waitFor, renderHook, act } from '@tests/utils';
import { describe, it, expect, vi } from 'vitest';
import mockRouter from 'next-router-mock';
import { useLocationPage } from '@hooks';
import { Pagination } from './index';

vi.mock('next/router', async () => {
  const routerMock = await vi.importActual('next-router-mock');
  return routerMock;
});

vi.mock('@icons/chevron-left.svg', () => ({
  __esModule: true,
  default: (): JSX.Element => <svg data-testid="chevron-left"></svg>,
}));

vi.mock('@icons/chevron-right.svg', () => ({
  __esModule: true,
  default: (): JSX.Element => <svg data-testid="chevron-right"></svg>,
}));

describe('Pagination component', () => {
  describe('updates URL query parameters on page change', () => {
    it('on specific page click', async () => {
      const totalPages = 5;

      const initialPage = 1;

      const pages = [2, 5];

      const initialPath = `/?page=${initialPage}`;

      await mockRouter.push(initialPath);

      const { getByRole, user } = render(<Pagination totalPages={totalPages} />);

      await waitFor(() => {
        expect(mockRouter).toMatchObject({
          pathname: '/',
          query: { page: `${initialPage}` },
        });

        expect(mockRouter.query).toEqual({ page: `${initialPage}` });
      });

      for await (const page of pages) {
        const pageBtn = getByRole('button', { name: `${page}` });

        await user.click(pageBtn);

        await waitFor(() => {
          expect(mockRouter).toMatchObject({
            pathname: '/',
            query: { page: `${page}` },
          });

          expect(mockRouter.query).toEqual({ page: `${page}` });
        });
      }
    });

    it('on next and previous button clicks', async () => {
      const totalPages = 5;

      let page = 2;

      const initialPath = `/?page=${page}`;

      await mockRouter.push(initialPath);

      const { getByRole, user } = render(<Pagination totalPages={totalPages} />);

      await waitFor(() => {
        expect(mockRouter).toMatchObject({
          pathname: '/',
          query: { page: `${page}` },
        });

        expect(mockRouter.query).toEqual({ page: `${page}` });
      });

      const nextButton = getByRole('button', { name: /go to next page/i });
      await user.click(nextButton);

      page += 1;

      await waitFor(() => {
        expect(mockRouter).toMatchObject({
          pathname: '/',
          query: { page: `${page}` },
        });

        expect(mockRouter.query).toEqual({ page: `${page}` });
      });

      const prevButton = getByRole('button', { name: /go to previous page/i });
      await user.click(prevButton);

      page -= 1;

      await waitFor(() => {
        expect(mockRouter).toMatchObject({
          pathname: '/',
          query: { page: `${page}` },
        });

        expect(mockRouter.query).toEqual({ page: `${page}` });
      });
    });
  });

  it('disables previous button on first page and next button on last page', async () => {
    const totalPages = 5;

    let page = 1;

    const initialPath = `/?page=${page}`;

    await mockRouter.push(initialPath);

    const { getByRole, user } = render(<Pagination totalPages={totalPages} />);

    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        pathname: '/',
        query: { page: `${page}` },
      });

      expect(mockRouter.query).toEqual({ page: `${page}` });
    });

    const prevButton = getByRole('button', { name: /go to previous page/i });
    expect(prevButton).toBeDisabled();

    page = totalPages;

    const lastPageBtn = getByRole('button', { name: `${page}` });
    await user.click(lastPageBtn);

    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        pathname: '/',
        query: { page: `${page}` },
      });

      expect(mockRouter.query).toEqual({ page: `${page}` });
    });

    const nextButton = getByRole('button', { name: /go to next page/i });
    expect(nextButton).toBeDisabled();
  });

  it('renders all pages when totalPages is less than or equal to 5', () => {
    const totalPages = 5;

    const { getByRole } = render(<Pagination totalPages={totalPages} />);

    for (let page = 1; page <= totalPages; page++) {
      const pageBtn = getByRole('button', { name: `${page}` });

      expect(pageBtn).toBeInTheDocument();
    }
  });

  it('renders pagination with ellipsis when totalPages is greater than 5', () => {
    const totalPages = 10;

    const { getByRole, getAllByText } = render(<Pagination totalPages={totalPages} />);

    const ellipsis = getAllByText('...');

    ellipsis.forEach((ellipsisElement) => {
      expect(ellipsisElement).toBeInTheDocument();
    });

    const pages = [1, 5, 10];

    pages.forEach((page) => {
      const pageBtn = getByRole('button', { name: `${page}` });

      expect(pageBtn).toBeInTheDocument();
    });

    const lastPageBtn = getByRole('button', { name: `${totalPages}` });

    expect(lastPageBtn).toBeInTheDocument();
  });

  it('renders ellipsis and current page correctly when in the middle range', async () => {
    const totalPages = 10;
    const currentPage = 5;

    const initialPath = `/?page=${currentPage}`;

    await mockRouter.push(initialPath);

    const { getByRole, getAllByText } = render(<Pagination totalPages={totalPages} />);

    const currPageBtn = getByRole('button', { name: `${currentPage}` });
    const lastPageBtn = getByRole('button', { name: `${totalPages}` });

    const ellipsis = getAllByText('...');

    expect(ellipsis).toHaveLength(2);
    expect(currPageBtn).toBeInTheDocument();
    expect(currPageBtn).toBeDisabled();
    expect(lastPageBtn).toBeInTheDocument();
  });

  it('handles edge case where currentPage is the first page correctly', async () => {
    const totalPages = 10;
    const currentPage = 1;

    const initialPath = `/?page=${currentPage}`;

    await mockRouter.push(initialPath);

    const { getByRole, getByText } = render(<Pagination totalPages={totalPages} />);

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

  it('handles edge case where currentPage is the last page correctly', async () => {
    const totalPages = 10;
    const currentPage = totalPages;

    const initialPath = `/?page=${currentPage}`;

    await mockRouter.push(initialPath);

    const { getByRole, getByText } = render(<Pagination totalPages={totalPages} />);

    expect(getByText('...')).toBeInTheDocument();

    const lastPageBtn = getByRole('button', { name: `${totalPages}` });

    expect(lastPageBtn).toBeInTheDocument();
    expect(lastPageBtn).toBeDisabled();

    for (let page = totalPages - 2; page <= totalPages; page++) {
      const pageBtn = getByRole('button', { name: `${page}` });

      expect(pageBtn).toBeInTheDocument();
    }
  });

  it('renders all pages when totalPages is less than or equal to 5', () => {
    const totalPages = 5;

    const { getByRole } = render(<Pagination totalPages={totalPages} />);

    for (let page = 1; page <= totalPages; page++) {
      const pageBtn = getByRole('button', { name: `${page}` });

      expect(pageBtn).toBeInTheDocument();
    }
  });

  it('renders start and end chevrons', () => {
    const totalPages = 5;

    const { getByTestId } = render(<Pagination totalPages={totalPages} />);

    expect(getByTestId('chevron-left')).toBeInTheDocument();
    expect(getByTestId('chevron-right')).toBeInTheDocument();
  });

  it('advances to next page if current page < total pages', async () => {
    const page = 1;
    const totalPages = 3;

    const { result } = renderHook(() => useLocationPage());

    act(() => {
      result.current.setPage(page);
    });

    expect(result.current.page).toBe(page);

    const { getByRole, user } = render(<Pagination totalPages={totalPages} />);

    const nextPageButton = getByRole('button', { name: /go to next page/i });

    expect(nextPageButton).toBeInTheDocument();

    await user.click(nextPageButton);

    expect(result.current.page).toBe(page + 1);
  });

  it('should not advance page if at last page', async () => {
    const page = 3;
    const totalPages = 3;

    const { result } = renderHook(() => useLocationPage());

    act(() => {
      result.current.setPage(page);
    });

    expect(result.current.page).toBe(page);

    const { getByRole, user } = render(<Pagination totalPages={totalPages} />);

    const nextPageButton = getByRole('button', { name: /go to next page/i });

    expect(nextPageButton).toBeInTheDocument();

    await user.click(nextPageButton);

    expect(result.current.page).toBe(page);
  });

  it('advances to previous page if current page > firstPage', async () => {
    const page = 2;
    const totalPages = 3;

    const { result } = renderHook(() => useLocationPage());

    act(() => {
      result.current.setPage(page);
    });

    expect(result.current.page).toBe(page);

    const { getByRole, user } = render(<Pagination totalPages={totalPages} />);

    const prevPageButton = getByRole('button', { name: /go to previous page/i });

    expect(prevPageButton).toBeInTheDocument();

    await user.click(prevPageButton);

    expect(result.current.page).toBe(page - 1);
  });

  it('should not advance if current page is first page', async () => {
    const page = 1;

    const totalPages = 3;

    const { result } = renderHook(() => useLocationPage());

    act(() => {
      result.current.setPage(page);
    });

    expect(result.current.page).toBe(page);

    const { getByRole, user } = render(<Pagination totalPages={totalPages} />);

    const prevPageButton = getByRole('button', { name: /go to previous page/i });

    expect(prevPageButton).toBeInTheDocument();

    await user.click(prevPageButton);

    expect(result.current.page).toBe(page);
  });
});

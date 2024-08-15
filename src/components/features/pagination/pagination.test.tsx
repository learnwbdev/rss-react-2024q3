import { render, waitFor } from '@tests/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useSearchParams } from 'next/navigation';
import { Pagination } from './index';
import { URL_PARAM } from '@constants';

const mockPush = vi.fn();

const createMockUseSearchParams = (initialPage: string) => {
  const searchParams = new URLSearchParams();
  searchParams.set(URL_PARAM.PAGE, initialPage);
  return searchParams;
};

vi.mock('next/navigation', async () => {
  const original = await vi.importActual('next/navigation');

  return {
    ...original,
    useRouter: () => ({
      push: mockPush,
    }),
    useSearchParams: vi.fn(),
  };
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
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('updates URL query parameters on page change', () => {
    it('on specific page click', async () => {
      const initialPage = 1;

      (useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue(createMockUseSearchParams(initialPage.toString()));

      const totalPages = 5;

      const pages = [2, 5];

      const { getByRole, user } = render(<Pagination totalPages={totalPages} />);

      for await (const page of pages) {
        const pageBtn = getByRole('button', { name: `${page}` });

        await user.click(pageBtn);

        await waitFor(() => {
          expect(mockPush).toHaveBeenCalledWith(`/?page=${page}`);
        });
      }
    });

    it('on next button click', async () => {
      const initialPage = 2;

      (useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue(createMockUseSearchParams(initialPage.toString()));

      const totalPages = 5;

      let page = 2;

      const { getByRole, user } = render(<Pagination totalPages={totalPages} />);

      const nextButton = getByRole('button', { name: /go to next page/i });

      await user.click(nextButton);

      page += 1;

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith(`/?page=${page}`);
        expect(mockPush).toHaveBeenCalledTimes(1);
      });
    });

    it('on previous button click', async () => {
      const initialPage = 2;

      (useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue(createMockUseSearchParams(initialPage.toString()));

      const totalPages = 5;

      let page = 2;

      const { getByRole, user } = render(<Pagination totalPages={totalPages} />);

      const prevButton = getByRole('button', { name: /go to previous page/i });

      await user.click(prevButton);

      page -= 1;

      await waitFor(() => {
        expect(mockPush).toHaveBeenLastCalledWith(`/?page=${page}`);
        expect(mockPush).toHaveBeenCalledTimes(1);
      });
    });
  });

  it('disables previous button on first page', () => {
    const totalPages = 5;

    const page = 1;

    (useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue(createMockUseSearchParams(page.toString()));

    const { getByRole } = render(<Pagination totalPages={totalPages} />);

    const prevButton = getByRole('button', { name: /go to previous page/i });

    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    const totalPages = 5;

    const page = totalPages;

    (useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue(createMockUseSearchParams(page.toString()));

    const { getByRole } = render(<Pagination totalPages={totalPages} />);

    const nextButton = getByRole('button', { name: /go to next page/i });

    expect(nextButton).toBeDisabled();
  });

  it('renders all pages when totalPages is less than or equal to 5', () => {
    const totalPages = 5;

    const initialPage = 1;

    (useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue(createMockUseSearchParams(initialPage.toString()));

    const { getByRole } = render(<Pagination totalPages={totalPages} />);

    for (let page = 1; page <= totalPages; page++) {
      const pageBtn = getByRole('button', { name: `${page}` });

      expect(pageBtn).toBeInTheDocument();
    }
  });

  it('renders pagination with ellipsis when totalPages is greater than 5', () => {
    const totalPages = 10;

    const initialPage = 1;

    (useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue(createMockUseSearchParams(initialPage.toString()));

    const { getByRole, getAllByText } = render(<Pagination totalPages={totalPages} />);

    const ellipsis = getAllByText('...');

    ellipsis.forEach((ellipsisElement) => {
      expect(ellipsisElement).toBeInTheDocument();
    });

    const pages = [1, 2, 3, 10];

    pages.forEach((page) => {
      const pageBtn = getByRole('button', { name: `${page}` });

      expect(pageBtn).toBeInTheDocument();
    });

    const lastPageBtn = getByRole('button', { name: `${totalPages}` });

    expect(lastPageBtn).toBeInTheDocument();
  });

  it('renders ellipsis and current page correctly when in the middle range', () => {
    const totalPages = 10;

    const currentPage = 5;

    (useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue(createMockUseSearchParams(currentPage.toString()));

    const { getByRole, getAllByText } = render(<Pagination totalPages={totalPages} />);

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

    (useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue(createMockUseSearchParams(currentPage.toString()));

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

  it('handles edge case where currentPage is the last page correctly', () => {
    const totalPages = 10;
    const currentPage = totalPages;

    (useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue(createMockUseSearchParams(currentPage.toString()));

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

  it('renders start and end chevrons', () => {
    const totalPages = 5;

    const currentPage = 1;

    (useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue(createMockUseSearchParams(currentPage.toString()));

    const { getByTestId } = render(<Pagination totalPages={totalPages} />);

    expect(getByTestId('chevron-left')).toBeInTheDocument();
    expect(getByTestId('chevron-right')).toBeInTheDocument();
  });
});

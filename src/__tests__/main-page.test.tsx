import { ReactNode } from 'react';
import { render, waitFor } from '@tests/utils';
import { describe, it, expect, vi } from 'vitest';
import { PersonBriefMockSubsets } from '@tests/mock-data';
import { URL_PARAM } from '@constants';
import { People, Person } from '@app-types';
import { MainPage } from '@app/main-page';
import { useSearchParams } from 'next/navigation';

vi.mock('@features', () => ({
  Pagination: ({ totalPages }: { totalPages: number }): ReactNode => <div>{`Pagination: ${totalPages}`}</div>,
}));

vi.mock('@entities', async () => {
  const original = await vi.importActual('@entities');

  return {
    ...original,
    Search: (): ReactNode => <div>Search Component</div>,
  };
});

vi.mock('@widgets', async () => {
  const original = await vi.importActual('@widgets');

  return {
    ...original,
    CardList: ({ results }: { results: Person[] }): ReactNode => <div>{`CardList: ${results.length}`}</div>,
  };
});

const mockPush = vi.fn();

const createMockUseSearchParams = (initialPage: string, details?: string) => {
  const searchParams = new URLSearchParams();
  searchParams.set(URL_PARAM.PAGE, initialPage);

  if (details) {
    searchParams.set(URL_PARAM.DETAILS, details);
  }

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

describe('Main page', () => {
  it('should render Search, CardList, and Pagination correctly', () => {
    const results = PersonBriefMockSubsets[0];

    const totalPages = 3;

    const mockPeopleData: People = {
      totalPages,
      results,
    };

    const initialPage = 1;

    (useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue(createMockUseSearchParams(initialPage.toString()));

    const cardListRegex = new RegExp(`CardList: ${results.length}`, 'i');
    const paginationRegex = new RegExp(`Pagination: ${totalPages}`, 'i');

    const { getByText } = render(<MainPage peopleData={mockPeopleData} />);

    expect(getByText('Search Component')).toBeInTheDocument();
    expect(getByText(cardListRegex)).toBeInTheDocument();
    expect(getByText(paginationRegex)).toBeInTheDocument();
  });

  it('should close details on click', async () => {
    const results = PersonBriefMockSubsets[0];

    const totalPages = 3;

    const mockPeopleData: People = {
      totalPages,
      results,
    };

    const initialPage = 1;
    const details = 1;

    (useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue(
      createMockUseSearchParams(initialPage.toString(), details.toString())
    );

    const { getByText, user } = render(<MainPage peopleData={mockPeopleData} />);

    await user.click(getByText('Search Component'));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(`/?page=${initialPage}`);
    });
  });

  it('should not update URL if details are not open', async () => {
    const results = PersonBriefMockSubsets[0];

    const totalPages = 3;

    const mockPeopleData: People = {
      totalPages,
      results,
    };

    const initialPage = 1;

    (useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue(createMockUseSearchParams(initialPage.toString()));

    const { getByText, user } = render(<MainPage peopleData={mockPeopleData} />);

    await user.click(getByText('Search Component'));

    expect(mockPush).not.toHaveBeenCalled();
  });
});

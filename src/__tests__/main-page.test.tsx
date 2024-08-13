import { ReactNode } from 'react';
import { GetServerSidePropsContext } from 'next';
import { render, waitFor, act } from '@tests/utils';
import { describe, it, expect, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import mockRouter from 'next-router-mock';
import { mswServer } from '@tests/msw-server';
import { peopleApi, selectItem, unselectAllItems } from '@store';
import { SelectedFlyoutProps } from '@widgets';
import { PeopleMockList, PersonBriefMockSubsets } from '@tests/mock-data';
import { API_URL, URL_PARAM } from '@constants';
import { People, Person } from '@app-types/person';
import MainPage, { getServerSideProps } from '@pages/index';

vi.mock('next/router', async () => {
  const routerMock = await vi.importActual('next-router-mock');
  return routerMock;
});

vi.mock('@shared/ui', () => ({
  Loader: (): ReactNode => <div>Loading...</div>,
  ErrorFallback: (): ReactNode => <div>Error!</div>,
}));

vi.mock('@features', () => ({
  Pagination: ({ totalPages }: { totalPages: number }): ReactNode => <div>{`Pagination: ${totalPages}`}</div>,
}));

vi.mock('@entities', () => ({
  Search: (): ReactNode => <div>Search</div>,
}));

vi.mock('@widgets', () => ({
  DetailedCard: ({ person }: { person?: Person }): ReactNode => {
    person && null;
    return <>Detailed Card</>;
  },
  CardList: ({ results }: { results: Person[] }): ReactNode => <div>{`CardList: ${results.length}`}</div>,
  SelectedFlyout: ({ isOpen }: SelectedFlyoutProps): ReactNode => {
    isOpen && null;
    return <div>Selected Flyout</div>;
  },
}));

describe('Main page', () => {
  const refetch = vi.fn();

  it('renders correctly with initial state', () => {
    const useGetPeopleQueryMock = vi
      .spyOn(peopleApi, 'useGetPeopleQuery')
      .mockReturnValue({ data: undefined, isFetching: true, refetch });

    const { getByRole, getByText, queryByText } = render(<MainPage />);

    expect(getByRole('heading', { name: /React is Cool/i, level: 1 })).toBeInTheDocument();
    expect(getByText('Search')).toBeInTheDocument();
    expect(getByText('Loading...')).toBeInTheDocument();
    expect(queryByText('CardList: 0')).not.toBeInTheDocument();
    expect(queryByText('Pagination')).not.toBeInTheDocument();

    useGetPeopleQueryMock.mockRestore();
  });

  it('displays Loader while fetching', () => {
    const useGetPeopleQueryMock = vi
      .spyOn(peopleApi, 'useGetPeopleQuery')
      .mockReturnValue({ data: undefined, error: undefined, isFetching: true, refetch });

    const { getByText } = render(<MainPage />);

    expect(getByText('Loading...')).toBeInTheDocument();

    useGetPeopleQueryMock.mockRestore();
  });

  it('renders CardList and Pagination when data is fetched successfully', async () => {
    const mockData = {
      totalPages: 5,
      results: PersonBriefMockSubsets[2],
    };

    const { totalPages, results } = mockData;

    const useGetPeopleQueryMock = vi
      .spyOn(peopleApi, 'useGetPeopleQuery')
      .mockReturnValue({ data: mockData, isFetching: false, refetch });

    const { getByRole, getByText, queryByText } = render(<MainPage data={mockData} />);

    const cardListRegex = new RegExp(`CardList: ${results.length}`, 'i');
    const paginationRegex = new RegExp(`Pagination: ${totalPages}`, 'i');

    await waitFor(() => {
      expect(getByRole('heading', { name: /React is Cool/i, level: 1 })).toBeInTheDocument();
      expect(getByText('Search')).toBeInTheDocument();
      expect(queryByText('Loading...')).not.toBeInTheDocument();
      expect(queryByText(cardListRegex)).toBeInTheDocument();
      expect(getByText(paginationRegex)).toBeInTheDocument();
    });

    useGetPeopleQueryMock.mockRestore();
  });

  it('shows SelectedFlyout if there are selected items', async () => {
    const mockData: People = {
      totalPages: 5,
      results: PersonBriefMockSubsets[2],
    };

    const itemsToSelect = [1, 2, 3];

    const { queryByText, store } = render(<MainPage data={mockData} />);

    act(() => {
      itemsToSelect.forEach((id) => {
        store.dispatch(selectItem(id.toString()));
      });
    });

    const state = store.getState();
    const { selectedItems } = state.selectedItems;

    await waitFor(() => {
      expect(selectedItems.length).toEqual(itemsToSelect.length);
    });

    expect(queryByText('Selected Flyout')).toBeInTheDocument();
  });

  it('hides SelectedFlyout if there are no selected items', async () => {
    const mockData: People = {
      totalPages: 5,
      results: PersonBriefMockSubsets[2],
    };

    const { queryByText, store } = render(<MainPage data={mockData} />);

    let state = store.getState();
    let { selectedItems } = state.selectedItems;

    await waitFor(() => {
      expect(selectedItems.length).toEqual(0);
    });

    expect(queryByText('Selected Flyout')).not.toBeInTheDocument();

    const itemsToSelect = [1, 2, 3];

    act(() => {
      itemsToSelect.forEach((id) => {
        store.dispatch(selectItem(id.toString()));
      });
    });

    state = store.getState();
    ({ selectedItems } = state.selectedItems);

    await waitFor(() => {
      expect(selectedItems.length).toEqual(itemsToSelect.length);
    });

    expect(queryByText('Selected Flyout')).toBeInTheDocument();

    act(() => {
      store.dispatch(unselectAllItems());
    });

    state = store.getState();
    ({ selectedItems } = state.selectedItems);

    await waitFor(() => {
      expect(selectedItems.length).toEqual(0);
    });

    expect(queryByText('Selected Flyout')).not.toBeInTheDocument();
  });

  it('hides details when clicking outside of detailed card', async () => {
    const mockData: People = {
      totalPages: 5,
      results: PersonBriefMockSubsets[2],
    };

    const mockDetail: Person = PeopleMockList[1];

    const initialPath = `/?page=1&details=1`;

    await mockRouter.push(initialPath);

    const { getByText, queryByText, user } = render(<MainPage data={mockData} personDetail={mockDetail} />);

    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        pathname: '/',
        query: { page: '1', details: '1' },
      });

      expect(mockRouter.query).toEqual({ page: '1', details: '1' });
    });

    await waitFor(() => {
      expect(getByText('Detailed Card')).toBeInTheDocument();
    });

    const searchLabel = getByText(/search/i);

    await user.click(searchLabel);

    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        pathname: '/',
        query: { page: '1' },
      });

      expect(mockRouter.query).toEqual({ page: '1' });

      expect(queryByText('Detailed Card')).not.toBeInTheDocument();
    });
  });

  describe('getServerSideProps', () => {
    it('returns props with data when API call is successful', async () => {
      const itemsPerPage = 10;
      const totalPages = Math.ceil(PeopleMockList.length / itemsPerPage);

      const mockPeopleData: People = {
        totalPages,
        results: PersonBriefMockSubsets[2],
      };
      const mockPersonData = PeopleMockList[0];

      const { id } = mockPersonData;

      const context: Partial<GetServerSidePropsContext> = {
        query: {
          [URL_PARAM.PAGE]: '1',
          [URL_PARAM.DETAILS]: id,
        },
      };

      const result = await getServerSideProps(context as GetServerSidePropsContext);

      expect(result).toEqual({ props: { data: mockPeopleData, page: 1, personDetail: mockPersonData } });
    });

    it('returns notFound when API call fails', async () => {
      mswServer.use(
        http.get(
          API_URL,
          () =>
            new HttpResponse(null, {
              status: 400,
              statusText: 'Bad Request',
            })
        )
      );

      const context: Partial<GetServerSidePropsContext> = {
        query: {
          [URL_PARAM.PAGE]: '1',
          [URL_PARAM.SEARCH]: 'Luke',
        },
      };

      const result = await getServerSideProps(context as GetServerSidePropsContext);

      expect(result).toEqual({ notFound: true });
    });

    it('handles missing query parameters correctly', async () => {
      const itemsPerPage = 10;
      const totalPages = Math.ceil(PeopleMockList.length / itemsPerPage);

      const context: Partial<GetServerSidePropsContext> = {
        query: {},
      };

      const result = await getServerSideProps(context as GetServerSidePropsContext);

      expect(result).toEqual({
        props: { data: { totalPages, results: PersonBriefMockSubsets[2] }, page: 1, personDetail: null },
      });
    });

    it('returns personDetail when personId is provided', async () => {
      const mockPersonData = PeopleMockList[0];

      const { id } = mockPersonData;

      const context: Partial<GetServerSidePropsContext> = {
        query: {
          [URL_PARAM.DETAILS]: id,
        },
      };

      const result = await getServerSideProps(context as GetServerSidePropsContext);

      expect(result).toMatchObject({
        props: { personDetail: mockPersonData },
      });
    });

    it('returns default page number if page is not specified', async () => {
      const context: Partial<GetServerSidePropsContext> = {
        query: {
          [URL_PARAM.SEARCH]: 'Luke',
        },
      };

      const defaultPage = 1;

      const result = await getServerSideProps(context as GetServerSidePropsContext);

      expect(result).toMatchObject({ props: { page: defaultPage } });
    });
  });
});

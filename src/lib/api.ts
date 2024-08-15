import { API_URL, API_ITEMS_PER_PAGE, API_QUERY } from '@constants';
import { People, Person } from '@app-types';
import { convertPeople, convertPerson, isApiPeople, isApiPerson } from '@utils';

interface FetchPeopleParams {
  page?: string;
  searchTerm?: string;
}

interface FetchPersonParams {
  personId: string;
}

interface FetchPeopleResponse {
  data?: People;
  page?: number;
  error?: Error;
}

interface FetchPersonResponse {
  personDetail?: Person;
  error?: Error;
}

export async function fetchPeople({ page = '1', searchTerm = '' }: FetchPeopleParams): Promise<FetchPeopleResponse> {
  try {
    const url = new URL(API_URL);

    url.searchParams.set(API_QUERY.PAGE, page);

    if (searchTerm) url.searchParams.set(API_QUERY.SEARCH, searchTerm);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Error fetching people: ${response.statusText}`);
    }

    const data: unknown = await response.json();

    if (!isApiPeople(data)) {
      throw new Error(`Error fetching people: invalid response format`);
    }

    const { count, results } = data;

    const totalPages = Math.ceil(count / API_ITEMS_PER_PAGE);

    return {
      data: {
        totalPages,
        results: convertPeople(results),
      },
      page: Number(page),
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error };
    } else {
      return { error: new Error('Fetch people failed due to an unknown error.') };
    }
  }
}

export async function fetchPerson({ personId }: FetchPersonParams): Promise<FetchPersonResponse> {
  try {
    const url = `${API_URL}/${personId}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching person: ${response.statusText}`);
    }

    const data: unknown = await response.json();

    if (!isApiPerson(data)) {
      throw new Error(`Error fetching person: invalid response format`);
    }

    return { personDetail: convertPerson(data) };
  } catch (error) {
    if (error instanceof Error) {
      return { error };
    } else {
      return { error: new Error('Fetch person failed due to an unknown error.') };
    }
  }
}

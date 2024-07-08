import axios, { AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Result } from '@shared/api';
import { isApiResponse } from './isApiResponse';
import { ApiResponse, ApiResult } from './types';

const convertResult = (results: ApiResult[]): Result[] => {
  return results.map((result) => {
    const converted: Result = {
      id: uuidv4(),
      name: result.name,
      description: `Height: ${result.height}`,
    };

    return converted;
  });
};

export const getSearchResult = async (searchTerm: string): Promise<Result[]> => {
  const apiUrl = 'https://swapi.dev/api/people';

  const pageNumber = 1;

  const url = new URL(apiUrl);

  if (searchTerm) url.searchParams.set('search', searchTerm);
  url.searchParams.set('page', pageNumber.toString());

  try {
    const response: AxiosResponse<ApiResponse> = await axios.get(url.toString());

    const { data } = response;

    if (!isApiResponse(data)) throw new Error('Incorrect result from Api');

    return convertResult(data.results);
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error('Unknown Api Error');

    throw error;
  }
};

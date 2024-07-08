import axios, { AxiosResponse } from 'axios';
import { Result, API_URL } from '@shared/api';
import { isApiResponse, convertResult } from './utils';
import { ApiResponse } from './types';

export const getSearchResult = async (searchTerm: string): Promise<Result[]> => {
  const pageNumber = 1;

  const url = new URL(API_URL);

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

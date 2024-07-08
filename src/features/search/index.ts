import axios, { AxiosResponse } from 'axios';
import { Result, API_URL } from '@shared/api';
import { convertResult, getAllPages, getApiData } from './utils';

export const getSearchResult = async (searchTerm: string): Promise<Result[]> => {
  const pageNumber = 1;

  const url = new URL(API_URL);

  const isGetAllItems = !searchTerm;

  if (searchTerm) url.searchParams.set('search', searchTerm);

  const baseUrl = url;

  url.searchParams.set('page', pageNumber.toString());

  try {
    const response: AxiosResponse<unknown, unknown> = await axios(url.toString());

    const data = getApiData(response);

    if (isGetAllItems) return getAllPages(data, baseUrl);

    return convertResult(data.results);
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error('Unknown Api Error');

    throw error;
  }
};

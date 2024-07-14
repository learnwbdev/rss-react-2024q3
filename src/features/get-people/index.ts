import axios, { AxiosResponse } from 'axios';
import { DataResponse, API_URL } from '@shared/api';
import { getAllPages, getApiData } from './utils';

export const getPeople = async (searchTerm: string): Promise<DataResponse> => {
  const pageNumber = 1;

  const itemsPerPage = 10;

  const url = new URL(API_URL);

  if (searchTerm) url.searchParams.set('search', searchTerm);

  const baseUrl = url;

  url.searchParams.set('page', pageNumber.toString());

  try {
    const response: AxiosResponse<unknown, unknown> = await axios(url.toString());

    const data = getApiData(response);

    const { count } = data;

    const totalPages = Math.ceil(count / itemsPerPage);

    const results = await getAllPages(data, baseUrl);

    return { itemsPerPage, totalPages, results };
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error('Unknown Api Error');

    throw error;
  }
};

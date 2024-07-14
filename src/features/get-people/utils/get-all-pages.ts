import axios, { AxiosResponse } from 'axios';
import { DataResult } from '@shared/api';
import { ApiResponse } from '../types';
import { convertResult } from './convert-result';
import { getApiData } from './get-api-data';

export const getAllPages = async (data: ApiResponse, url: URL): Promise<DataResult[]> => {
  const itemsPerPageApi = 10;

  const { count, results: fstPageResults } = data;

  const numPages = Math.ceil(count / itemsPerPageApi);

  const startPage = 2;

  const promises: Promise<AxiosResponse<unknown, unknown>>[] = [...Array(numPages - 1).keys()].map((idx) => {
    const page = idx + startPage;
    url.searchParams.set('page', page.toString());

    return axios(url.toString());
  });

  try {
    const responseArr: AxiosResponse<unknown, unknown>[] = await Promise.all(promises);

    const results: DataResult[] = responseArr.reduce((acc: DataResult[], response) => {
      const { results: apiResults } = getApiData(response);

      return [...acc, ...convertResult(apiResults)];
    }, convertResult(fstPageResults));

    return results;
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error('Unknown Api Error');

    throw error;
  }
};

import axios, { AxiosResponse } from 'axios';
import { PersonBrief, convertPeople, ApiPeople } from '@shared/api';
import { getApiData } from './get-api-data';

export const getAllPages = async (data: ApiPeople, url: URL): Promise<PersonBrief[]> => {
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

    const results: PersonBrief[] = responseArr.reduce((acc: PersonBrief[], response) => {
      const { results: apiResults } = getApiData(response);

      return [...acc, ...convertPeople(apiResults)];
    }, convertPeople(fstPageResults));

    return results;
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error('Unknown Api Error');

    throw error;
  }
};

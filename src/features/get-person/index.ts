import axios, { AxiosResponse } from 'axios';
import { API_URL, convertPerson, Person } from '@shared/api';
import { getApiData } from './get-api-data';

export const getPerson = async (personId: string): Promise<Person> => {
  const url = new URL(personId, API_URL);

  try {
    const response: AxiosResponse<unknown, unknown> = await axios(url.toString());

    const apiResult = getApiData(response);

    return convertPerson(apiResult);
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error('Unknown Api Error');

    throw error;
  }
};

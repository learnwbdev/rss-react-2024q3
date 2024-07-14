import { AxiosResponse } from 'axios';
import { ApiPeople, isApiPeople } from '@shared/api';

export const getApiData = (response: AxiosResponse<unknown, unknown>): ApiPeople => {
  const { data } = response;

  if (!isApiPeople(data)) throw new Error('Incorrect result from Api');

  return data;
};

import { AxiosResponse } from 'axios';
import { ApiPerson, isApiPerson } from '@shared/api';

export const getApiData = (response: AxiosResponse<unknown, unknown>): ApiPerson => {
  const { data } = response;

  if (!isApiPerson(data)) throw new Error('Incorrect result from Api');

  return data;
};

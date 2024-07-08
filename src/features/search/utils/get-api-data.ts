import { AxiosResponse } from 'axios';
import { isApiResponse } from './is-api-response';
import { ApiResponse } from '../types';

export const getApiData = (response: AxiosResponse<unknown, unknown>): ApiResponse => {
  const { data } = response;

  if (!isApiResponse(data)) throw new Error('Incorrect result from Api');

  return data;
};

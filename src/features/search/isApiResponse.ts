import { ApiResponse, ApiResult } from './types';

const isApiResult = (response: unknown): response is ApiResult => {
  return (
    !!response &&
    typeof response === 'object' &&
    'name' in response &&
    'height' in response &&
    'hair_color' in response &&
    'gender' in response &&
    typeof response.name === 'string' &&
    typeof response.height === 'string' &&
    typeof response.hair_color === 'string' &&
    typeof response.gender === 'string'
  );
};

export const isApiResponse = (response: unknown): response is ApiResponse => {
  return (
    !!response &&
    typeof response === 'object' &&
    'count' in response &&
    'results' in response &&
    typeof response.count === 'number' &&
    Array.isArray(response.results) &&
    response.results.every((result) => isApiResult(result))
  );
};

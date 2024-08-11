import { ApiPeople, ApiPerson, ApiPersonBrief } from '@app-types/person';

export const isApiPersonBrief = (response: unknown): response is ApiPersonBrief => {
  return (
    !!response &&
    typeof response === 'object' &&
    'url' in response &&
    'name' in response &&
    'height' in response &&
    typeof response.url === 'string' &&
    typeof response.name === 'string' &&
    typeof response.height === 'string'
  );
};

export const isApiPerson = (response: unknown): response is ApiPerson => {
  return (
    isApiPersonBrief(response) &&
    'mass' in response &&
    'hair_color' in response &&
    'skin_color' in response &&
    'eye_color' in response &&
    'birth_year' in response &&
    'gender' in response &&
    typeof response.mass === 'string' &&
    typeof response.hair_color === 'string' &&
    typeof response.skin_color === 'string' &&
    typeof response.eye_color === 'string' &&
    typeof response.birth_year === 'string' &&
    typeof response.gender === 'string'
  );
};

export const isApiPeople = (response: unknown): response is ApiPeople => {
  return (
    !!response &&
    typeof response === 'object' &&
    'count' in response &&
    'results' in response &&
    typeof response.count === 'number' &&
    Array.isArray(response.results) &&
    response.results.every(isApiPersonBrief)
  );
};

export const isApiPersonList = (response: unknown): response is ApiPerson[] => {
  return !!response && Array.isArray(response) && response.every(isApiPerson);
};

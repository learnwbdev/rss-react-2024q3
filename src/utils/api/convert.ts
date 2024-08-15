import { ApiPerson, Person, ApiPersonBrief, PersonBrief } from '@app-types';

const getIdFromUrl = (url: string): string => url.split('/').slice(-2, -1)[0];

export const convertPeople = (results: ApiPersonBrief[]): PersonBrief[] => {
  return results.map(({ url, name, height }) => ({ id: getIdFromUrl(url), url, name, height }));
};

export const convertPerson = (result: ApiPerson): Person => {
  const {
    url,
    name,
    height,
    mass,
    hair_color: hairColor,
    skin_color: skinColor,
    eye_color: eyeColor,
    birth_year: birthYear,
    gender,
  } = result;

  return { id: getIdFromUrl(url), url, name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender };
};

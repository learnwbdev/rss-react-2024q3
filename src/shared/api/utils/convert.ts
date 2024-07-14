import { ApiPersonBrief, ApiPerson, PersonBrief, Person } from '../types';

export const convertPeople = (results: ApiPersonBrief[]): PersonBrief[] => {
  return results.map(({ name, height }, id) => ({ id, name, height }));
};

export const convertPerson = (id: number, result: ApiPerson): Person => {
  const {
    name,
    height,
    mass,
    hair_color: hairColor,
    skin_color: skinColor,
    eye_color: eyeColor,
    birth_year: birthYear,
    gender,
  } = result;

  return { id, name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender };
};

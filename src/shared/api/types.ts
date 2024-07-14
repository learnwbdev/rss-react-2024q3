export interface Person {
  id: number;
  name: string;
  height: string;
  mass: string;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  birthYear: string;
  gender: string;
}

export type PersonBrief = Pick<Person, 'id' | 'name' | 'height'>;

export interface People {
  itemsPerPage: number;
  totalPages: number;
  results: PersonBrief[];
}

export interface ApiPerson {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

export type ApiPersonBrief = Omit<PersonBrief, 'id'>;

export interface ApiPeople {
  count: number;
  results: ApiPersonBrief[];
}

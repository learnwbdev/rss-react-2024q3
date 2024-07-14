export interface Person {
  id: string;
  url: string;
  name: string;
  height: string;
  mass: string;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  birthYear: string;
  gender: string;
}

export type PersonBrief = Pick<Person, 'id' | 'url' | 'name' | 'height'>;

export interface People {
  itemsPerPage: number;
  totalPages: number;
  results: PersonBrief[];
}

export interface ApiPerson {
  url: string;
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

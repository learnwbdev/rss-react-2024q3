import { Person } from '@app-types';

const person: Person = {
  id: '1',
  url: 'https://swapi.dev/api/people/1/',
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hairColor: 'blond',
  skinColor: 'fair',
  eyeColor: 'blue',
  birthYear: '19BBY',
  gender: 'male',
};

const personComma: Person = {
  id: '29',
  url: 'https://swapi.dev/api/people/29/',
  name: 'Wicket, Systri Warrick',
  height: '88',
  mass: '20',
  hairColor: 'brown',
  skinColor: 'brown',
  eyeColor: 'brown',
  birthYear: '8BBY',
  gender: 'male',
};

const personNewLine: Person = {
  id: '30',
  url: 'https://swapi.dev/api/people/30/',
  name: 'Nien\nNunb',
  height: '160',
  mass: '68',
  hairColor: 'none',
  skinColor: 'grey',
  eyeColor: 'black',
  birthYear: 'unknown',
  gender: 'male',
};

const headers = 'id,url,name,height,mass,hairColor,skinColor,eyeColor,birthYear,gender';

const personStr = '1,https://swapi.dev/api/people/1/,Luke Skywalker,172,77,blond,fair,blue,19BBY,male';

const personCommaStr = '29,https://swapi.dev/api/people/29/,"Wicket, Systri Warrick",88,20,brown,brown,brown,8BBY,male';

const personNewLineStr = '30,https://swapi.dev/api/people/30/,"Nien\nNunb",160,68,none,grey,black,unknown,male';

export const PeopleMockCsvCheck = { person, personComma, personNewLine };

export const MockCsvExpected = { headers, personStr, personCommaStr, personNewLineStr };

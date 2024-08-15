import { PersonBrief } from '@app-types';

export const PersonBriefMock: PersonBrief[] = [
  { id: '1', url: 'https://swapi.dev/api/people/1/', name: 'Luke Skywalker', height: '172' },
  { id: '2', url: 'https://swapi.dev/api/people/2/', name: 'C-3PO', height: '167' },
  { id: '3', url: 'https://swapi.dev/api/people/3/', name: 'R2-D2', height: '96' },
  { id: '4', url: 'https://swapi.dev/api/people/4/', name: 'Darth Vader', height: '202' },
  { id: '5', url: 'https://swapi.dev/api/people/5/', name: 'Leia Organa', height: '150' },
  { id: '6', url: 'https://swapi.dev/api/people/6/', name: 'Owen Lars', height: '178' },
  { id: '7', url: 'https://swapi.dev/api/people/7/', name: 'Beru Whitesun lars', height: '165' },
  { id: '8', url: 'https://swapi.dev/api/people/8/', name: 'R5-D4', height: '97' },
  { id: '9', url: 'https://swapi.dev/api/people/9/', name: 'Biggs Darklighter', height: '183' },
  { id: '10', url: 'https://swapi.dev/api/people/10/', name: 'Obi-Wan Kenobi', height: '182' },
];

const getSubset = (start: number, end: number): PersonBrief[] => PersonBriefMock.slice(start, end);

const mockDataSet1: PersonBrief[] = getSubset(0, 2);

const mockDataSet2: PersonBrief[] = getSubset(0, 5);

const mockDataSet3: PersonBrief[] = getSubset(0, 10);

export const PersonBriefMockSubsets = [mockDataSet1, mockDataSet2, mockDataSet3];

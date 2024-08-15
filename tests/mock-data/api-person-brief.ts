import { ApiPersonBrief } from '@app-types';

const apiBaseMockData: ApiPersonBrief[] = [
  { url: 'https://swapi.dev/api/people/1/', name: 'Luke Skywalker', height: '172' },
  { url: 'https://swapi.dev/api/people/2/', name: 'C-3PO', height: '167' },
  { url: 'https://swapi.dev/api/people/3/', name: 'R2-D2', height: '96' },
  { url: 'https://swapi.dev/api/people/4/', name: 'Darth Vader', height: '202' },
  { url: 'https://swapi.dev/api/people/5/', name: 'Leia Organa', height: '150' },
  { url: 'https://swapi.dev/api/people/6/', name: 'Owen Lars', height: '178' },
  { url: 'https://swapi.dev/api/people/7/', name: 'Beru Whitesun lars', height: '165' },
  { url: 'https://swapi.dev/api/people/8/', name: 'R5-D4', height: '97' },
  { url: 'https://swapi.dev/api/people/9/', name: 'Biggs Darklighter', height: '183' },
  { url: 'https://swapi.dev/api/people/10/', name: 'Obi-Wan Kenobi', height: '182' },
];

const getSubset = (start: number, end: number): ApiPersonBrief[] => apiBaseMockData.slice(start, end);

const apiMockDataSet1: ApiPersonBrief[] = getSubset(0, 2);

const apiMockDataSet2: ApiPersonBrief[] = getSubset(0, 5);

const apiMockDataSet3: ApiPersonBrief[] = getSubset(0, 10);

export const ApiPersonBriefMockSubsets = [apiMockDataSet1, apiMockDataSet2, apiMockDataSet3];

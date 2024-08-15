import { describe, it, expect } from 'vitest';
import { ApiPersonBriefMockSubsets, PersonBriefMockSubsets, PeopleMockList, ApiPeopleMockList } from '@tests/mock-data';
import { convertPeople, convertPerson } from './convert';

describe('convertPeople', () => {
  it('should convert an array of ApiPersonBrief to PersonBrief', () => {
    const [apiPeopleBrief] = ApiPersonBriefMockSubsets;

    const [expectedPeopleBrief] = PersonBriefMockSubsets;

    const result = convertPeople(apiPeopleBrief);
    expect(result).toEqual(expectedPeopleBrief);
  });
});

describe('convertPerson', () => {
  it('should convert an ApiPerson to Person', () => {
    const apiPerson = ApiPeopleMockList[0];

    const expectedPerson = PeopleMockList[0];

    const result = convertPerson(apiPerson);
    expect(result).toEqual(expectedPerson);
  });
});

import { describe, it, expect } from 'vitest';

import { PeopleMockCsvCheck, MockCsvExpected } from '@tests/mock-data';
import { createCsvString } from './create-csv-string';

const { person, personComma, personNewLine } = PeopleMockCsvCheck;
const { headers, personStr, personCommaStr, personNewLineStr } = MockCsvExpected;

describe('createCsvString', () => {
  it('should return an empty string for an empty array', () => {
    expect(createCsvString([])).toBe('');
  });

  it('should create CSV string with headers and rows', () => {
    const data = [person, personComma];
    const expected = `${headers}\r\n${personStr}\r\n${personCommaStr}`;
    expect(createCsvString(data)).toBe(expected);
  });

  it('should quote values containing commas', () => {
    const data = [personComma];
    const expected = `${headers}\r\n${personCommaStr}`;
    expect(createCsvString(data)).toBe(expected);
  });

  it('should quote values containing newlines', () => {
    const data = [personNewLine];
    const expected = `${headers}\r\n${personNewLineStr}`;
    expect(createCsvString(data)).toBe(expected);
  });
});

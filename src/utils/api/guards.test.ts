import { describe, it, expect } from 'vitest';
import { isApiPersonBrief, isApiPerson, isApiPeople } from './guards'; // Adjust import based on your project structure
import { ApiPeople, ApiPerson, ApiPersonBrief } from '@app-types';

const validApiPersonBrief: ApiPersonBrief = {
  url: 'https://swapi.dev/api/people/1/',
  name: 'Luke Skywalker',
  height: '172',
};

const validApiPerson: ApiPerson = {
  ...validApiPersonBrief,
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
};

const validApiPeople: ApiPeople = {
  count: 1,
  results: [validApiPersonBrief],
};

describe('Api type guards', () => {
  describe('isApiPersonBrief', () => {
    it('should return true for a valid ApiPersonBrief object', () => {
      expect(isApiPersonBrief(validApiPersonBrief)).toBe(true);
    });

    it('should return false for an object with missing fields', () => {
      const invalid: Partial<ApiPersonBrief> = {
        url: 'http://example.com',
        name: 'John Doe',
      };

      expect(isApiPersonBrief(invalid)).toBe(false);
    });

    it('should return false for an object with incorrect field types', () => {
      const invalidNameType: unknown = {
        url: 'http://example.com',
        name: 123,
        height: '180',
      };

      expect(isApiPersonBrief(invalidNameType)).toBe(false);
    });

    it('should return false for non-object values', () => {
      expect(isApiPersonBrief(null)).toBe(false);
      expect(isApiPersonBrief(42)).toBe(false);
      expect(isApiPersonBrief('string')).toBe(false);
    });
  });

  describe('isApiPerson', () => {
    it('should return true for a valid ApiPerson object', () => {
      expect(isApiPerson(validApiPerson)).toBe(true);
    });

    it('should return false for an object missing ApiPerson-specific fields', () => {
      const invalidGenterType: unknown = {
        ...validApiPersonBrief,
        mass: '75',
        hair_color: 'black',
        skin_color: 'white',
        eye_color: 'blue',
        birth_year: '1990',
        gender: 123,
      };

      expect(isApiPerson(invalidGenterType)).toBe(false);
    });

    it('should return false for an ApiPersonBrief object', () => {
      expect(isApiPerson(validApiPersonBrief)).toBe(false);
    });

    it('should return false for non-object values', () => {
      expect(isApiPerson(null)).toBe(false);
      expect(isApiPerson(42)).toBe(false);
      expect(isApiPerson('string')).toBe(false);
    });
  });

  describe('isApiPeople', () => {
    it('should return true for a valid ApiPeople object', () => {
      expect(isApiPeople(validApiPeople)).toBe(true);
    });

    it('should return false for an object with incorrect results field type', () => {
      const invalidResultsType: unknown = {
        count: 1,
        results: 'not an array',
      };
      expect(isApiPeople(invalidResultsType)).toBe(false);
    });

    it('should return false for an object with invalid results items', () => {
      const invalidHeightType: unknown = {
        count: 1,
        results: [
          {
            url: 'http://example.com',
            name: 'John Doe',
            height: 180,
          },
        ],
      };
      expect(isApiPeople(invalidHeightType)).toBe(false);
    });

    it('should return false for non-object values', () => {
      expect(isApiPeople(null)).toBe(false);
      expect(isApiPeople(42)).toBe(false);
      expect(isApiPeople('string')).toBe(false);
    });
  });
});

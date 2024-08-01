import { describe, it, expect } from 'vitest';
import { isString, isObjKey } from './guards';

describe('Guards utility functions', () => {
  describe('isString', () => {
    it('returns true for a string value', () => {
      expect(isString('hello')).toBe(true);
    });

    it('returns false for a number', () => {
      expect(isString(123)).toBe(false);
    });

    it('returns false for a boolean', () => {
      expect(isString(true)).toBe(false);
    });

    it('returns false for an object', () => {
      expect(isString({})).toBe(false);
    });

    it('returns false for an array', () => {
      expect(isString([])).toBe(false);
    });

    it('returns false for null', () => {
      expect(isString(null)).toBe(false);
    });

    it('returns false for undefined', () => {
      expect(isString(undefined)).toBe(false);
    });
  });

  describe('isObjKey', () => {
    it('returns true for a valid key in an object', () => {
      const obj = { name: 'Luke', height: 172 };
      expect(isObjKey(obj, 'name')).toBe(true);
    });

    it('returns true for a numeric key in an object', () => {
      const obj = { 1: 'one', 2: 'two' };
      expect(isObjKey(obj, 1)).toBe(true);
    });

    it('returns false for a key not in the object', () => {
      const obj = { name: 'Luke' };
      expect(isObjKey(obj, 'age')).toBe(false);
    });

    it('returns false if the object is null', () => {
      expect(isObjKey(null, 'key')).toBe(false);
    });

    it('returns false if the object is not an object', () => {
      expect(isObjKey('string', 'length')).toBe(false);
      expect(isObjKey(123, 'toString')).toBe(false);
    });

    it('returns false if the key is not a valid property key', () => {
      const obj = { name: 'Luke' };

      const symbolKey = Symbol('symbol');
      expect(isObjKey(obj, symbolKey)).toBe(false);
    });
  });
});

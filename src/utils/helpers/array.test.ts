import { describe, it, expect } from 'vitest';
import { range } from './array';

describe('range', () => {
  it('should return an array of numbers from low to high inclusive', () => {
    const result = range(3, 7);
    expect(result).toEqual([3, 4, 5, 6, 7]);
  });

  it('should return an empty array if high is less than low', () => {
    const result = range(5, 3);
    expect(result).toEqual([]);
  });

  it('should handle a single-element range where low equals high', () => {
    const result = range(4, 4);
    expect(result).toEqual([4]);
  });

  it('should return an array with negative numbers if range includes negative numbers', () => {
    const result = range(-3, 2);
    expect(result).toEqual([-3, -2, -1, 0, 1, 2]);
  });

  it('should return an empty array when low and high are the same negative number', () => {
    const result = range(-5, -5);
    expect(result).toEqual([-5]);
  });

  it('should return an empty array if range is requested with zero length', () => {
    const result = range(10, 9);
    expect(result).toEqual([]);
  });
});

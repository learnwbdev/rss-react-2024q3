export const range = (low: number, high: number): number[] => {
  if (high <= low) return [];

  return Array.from({ length: high - low + 1 }, (_, idx) => low + idx);
};

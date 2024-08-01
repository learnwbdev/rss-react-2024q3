export const isString = (val: unknown): val is string => typeof val === 'string';

export const isObjKey = <T>(obj: T, key: PropertyKey): key is keyof T => {
  return typeof obj === 'object' && obj !== null && key in obj;
};

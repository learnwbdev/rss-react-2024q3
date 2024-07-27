import { jsonParseToType, TypeGuardCallback } from './json';

const storage = window.localStorage;

export const localStorageHelper = {
  get: <T>(key: string, guardFn: TypeGuardCallback<T>): T | null => jsonParseToType(storage.getItem(key), guardFn),
  set: <T = unknown>(key: string, value: T): void => storage.setItem(key, JSON.stringify(value)),
  remove: (key: string): void => storage.removeItem(key),
};

import { jsonParseToType, TypeGuardCallback } from './json';

const isServer = typeof window === 'undefined';

const createLocalStorageHelper = () => {
  const storage = window.localStorage;

  return {
    get: <T>(key: string, guardFn: TypeGuardCallback<T>): T | null => jsonParseToType(storage.getItem(key), guardFn),
    set: <T = unknown>(key: string, value: T): void => storage.setItem(key, JSON.stringify(value)),
    remove: (key: string): void => storage.removeItem(key),
  };
};

export const localStorageHelper = isServer ? null : createLocalStorageHelper();

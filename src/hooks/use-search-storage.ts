import { LOCAL_STORAGE_KEY } from '@constants';
import { isString, localStorageHelper } from '@utils';
import { useState, useEffect } from 'react';

type UseSearchStorageReturn = [string, React.Dispatch<React.SetStateAction<string>>];

const saveSearchTerm = (term: string): void => {
  if (!localStorageHelper) return;

  localStorageHelper.set(LOCAL_STORAGE_KEY.SEARCH_TERM, term);
};

const getSearchTerm = (): string => localStorageHelper?.get(LOCAL_STORAGE_KEY.SEARCH_TERM, isString) ?? '';

export const useSearchStorage = (): UseSearchStorageReturn => {
  const [searchTerm, setSearchTerm] = useState(getSearchTerm);

  useEffect(() => {
    saveSearchTerm(searchTerm);

    return (): void => {
      saveSearchTerm(searchTerm);
    };
  }, [searchTerm]);

  return [searchTerm, setSearchTerm];
};

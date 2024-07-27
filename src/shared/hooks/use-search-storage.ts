import { isString, localStorageHelper } from '@shared/utils';
import { useState, useEffect } from 'react';

type UseSearchStorageReturn = [string, React.Dispatch<React.SetStateAction<string>>];

const searchKey = 'searchTerm';

const saveSearchTerm = (term: string): void => {
  localStorageHelper.set(searchKey, term);
};

const getSearchTerm = (): string => localStorageHelper.get(searchKey, isString) ?? '';

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

import { isString, jsonParseToType } from '@shared/utils';
import { useState, useEffect } from 'react';

type UseSearchStorageReturn = [string, React.Dispatch<React.SetStateAction<string>>];

const searchKey = 'searchTerm';

const saveSearchTerm = (term: string): void => {
  window.localStorage.setItem(searchKey, JSON.stringify(term));
};

const getSearchTerm = (): string => {
  const localStVal = window.localStorage.getItem(searchKey) ?? '';

  const initialVal = jsonParseToType(localStVal, isString) ?? '';

  return initialVal;
};

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

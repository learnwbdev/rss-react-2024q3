'use client';

import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input, Button } from '@shared/ui';
import { useSearchStorage } from '@hooks';
import { ErrorSection } from '@widgets';
import { API_INITIAL_PAGE, URL_PARAM } from '@constants';
import styles from './styles.module.css';

interface SearchProps {
  disabled?: boolean;
}

export const Search = ({ disabled }: SearchProps): ReactNode => {
  const [searchTerm, setSearchTerm] = useSearchStorage();

  const router = useRouter();
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState(searchTerm);

  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) return;

    hasMounted.current = true;

    if (!searchParams.get(URL_PARAM.SEARCH) && searchTerm) {
      const newSearchParams = new URLSearchParams(searchParams);

      newSearchParams.set(URL_PARAM.SEARCH, searchTerm);

      router.push(`/?${newSearchParams.toString()}`);
    }
  }, [searchParams, searchTerm, router]);

  const handleSearch = useCallback(
    (searchTerm: string): void => {
      const newSearchParams = new URLSearchParams(searchParams);

      if (searchTerm === '') {
        newSearchParams.delete(URL_PARAM.SEARCH);
      } else {
        newSearchParams.set(URL_PARAM.SEARCH, searchTerm);
      }

      newSearchParams.set(URL_PARAM.PAGE, API_INITIAL_PAGE);

      router.push(`/?${newSearchParams.toString()}`);

      setSearchTerm(searchTerm);
    },
    [searchParams, router, setSearchTerm]
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    event.stopPropagation();
    handleSearch(inputValue);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    setInputValue(value.trim());
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    const { key } = event;

    if (key === 'Enter') handleSearch(inputValue);
  };

  return (
    <div className={styles.search}>
      <Input
        name="search"
        label="Search"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleEnter}
        disabled={disabled}
      />
      <div>
        <Button text="Search" onClick={handleClick} disabled={disabled} />
      </div>
      <div>
        <ErrorSection />
      </div>
    </div>
  );
};

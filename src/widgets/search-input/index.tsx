import { ReactNode, useState, useEffect } from 'react';
import { Input, Button } from '@shared/ui';
import styles from './styles.module.css';

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
  disabled: boolean;
}

const saveSearchTerm = (term: string): void => {
  localStorage.setItem('searchTerm', JSON.stringify(term));
};

export const SearchInput = ({ onSearch, disabled }: SearchInputProps): ReactNode => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    setSearchTerm(value.trim());
  };

  const handleClick = (): void => {
    saveSearchTerm(searchTerm);
    onSearch(searchTerm);
  };

  useEffect(() => {
    const localStVal = localStorage.getItem('searchTerm');

    const initialVal = '';

    if (!localStVal) {
      onSearch(initialVal);
      return;
    }

    const savedTerm: unknown = JSON.parse(localStVal);

    if (typeof savedTerm === 'string') {
      setSearchTerm(savedTerm);
      onSearch(savedTerm);
    }
  }, [onSearch]);

  return (
    <div className={styles.search_input}>
      <Input name="search" label="Search" value={searchTerm} onChange={handleInputChange} disabled={disabled} />
      <div>
        <Button text="Search" onClick={handleClick} disabled={disabled} />
      </div>
    </div>
  );
};

import { ReactNode, useState } from 'react';
import { Input, Button } from '@shared/ui';
import { useSearchStorage } from '@shared/hooks';
import styles from './styles.module.css';

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
  disabled: boolean;
}

export const SearchInput = ({ onSearch, disabled }: SearchInputProps): ReactNode => {
  const [searchTerm, setSearchTerm] = useSearchStorage();

  const [inputValue, setInputValue] = useState(searchTerm);

  const handleClick = (): void => {
    setSearchTerm(inputValue);
    onSearch(inputValue);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    setInputValue(value.trim());
  };

  return (
    <div className={styles.search_input}>
      <Input name="search" label="Search" value={inputValue} onChange={handleChange} disabled={disabled} />
      <div>
        <Button text="Search" onClick={handleClick} disabled={disabled} />
      </div>
    </div>
  );
};

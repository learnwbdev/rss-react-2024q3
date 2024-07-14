import { ReactNode, useState } from 'react';
import { Input, Button } from '@shared/ui';
import { useSearchStorage } from '@shared/hooks';
import styles from './styles.module.css';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
  disabled: boolean;
}

export const Search = ({ onSearch, disabled }: SearchProps): ReactNode => {
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

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    const { key } = event;

    if (key === 'Enter') handleClick();
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
    </div>
  );
};

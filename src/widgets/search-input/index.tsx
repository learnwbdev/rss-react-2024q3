import { ReactNode, useContext } from 'react';
import { Input, Button } from '@shared/ui';
import { SearchTermContext } from '@shared/contexts';
import styles from './styles.module.css';

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

const saveSearchTerm = (term: string): void => {
  localStorage.setItem('searchTerm', JSON.stringify(term));
};

export const SearchInput = ({ onSearch, onChange, disabled }: SearchInputProps): ReactNode => {
  const searchTerm = useContext(SearchTermContext);

  const handleClick = (): void => {
    saveSearchTerm(searchTerm);
    onSearch(searchTerm);
  };

  return (
    <div className={styles.search_input}>
      <Input name="search" label="Search" value={searchTerm} onChange={onChange} disabled={disabled} />
      <div>
        <Button text="Search" onClick={handleClick} disabled={disabled} />
      </div>
    </div>
  );
};

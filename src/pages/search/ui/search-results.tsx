import { SearchResult } from '@widgets/search-result';
import { Result } from '@shared/api';
import { ReactNode } from 'react';
import styles from './styles.module.css';

interface SearchResultsProps {
  results: Result[];
}

export const SearchResults = ({ results }: SearchResultsProps): ReactNode => {
  return results.length === 0 ? (
    <div>No results found</div>
  ) : (
    <div className={styles.results}>
      {results.map(({ id, name, description }) => (
        <SearchResult key={id} name={name} description={description} />
      ))}
    </div>
  );
};

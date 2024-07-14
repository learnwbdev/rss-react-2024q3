import { ReactNode } from 'react';
import styles from './styles.module.css';

export interface SearchResultProps {
  name: string;
  description: string;
}

export const SearchResult = ({ name, description }: SearchResultProps): ReactNode => {
  return (
    <div className={styles.search_result}>
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
};

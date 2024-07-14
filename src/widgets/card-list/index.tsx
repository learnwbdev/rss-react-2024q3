import { Card } from '@entities/card';
import { DataResult } from '@shared/api';
import { ReactNode } from 'react';
import styles from './styles.module.css';

interface CardListProps {
  results: DataResult[];
}

export const CardList = ({ results }: CardListProps): ReactNode => {
  return results.length === 0 ? (
    <div>No results found</div>
  ) : (
    <div className={styles.card_list}>
      {results.map(({ id, name, description }) => (
        <Card key={id} name={name} description={description} />
      ))}
    </div>
  );
};

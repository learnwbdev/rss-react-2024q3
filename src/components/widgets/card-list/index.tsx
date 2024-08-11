import { Card } from '@entities';
import { PersonBrief } from '@app-types/person';
import { ReactNode } from 'react';
import styles from './styles.module.css';

interface CardListProps {
  results: PersonBrief[];
}

export const CardList = ({ results }: CardListProps): ReactNode => {
  return results.length === 0 ? (
    <div>No results found</div>
  ) : (
    <div className={styles.card_list}>
      {results.map(({ id, url, name, height }) => (
        <Card key={id} personBrief={{ id, url, name, height }} />
      ))}
    </div>
  );
};

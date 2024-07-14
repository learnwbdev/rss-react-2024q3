import { Card } from '@entities/card';
import { PersonBrief } from '@shared/api';
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
      {results.map(({ id, name, height }) => (
        <Card
          key={id}
          id={id}
          name={name}
          height={height}
          showDetails={(id: number) => {
            console.log(id);
          }}
        />
      ))}
    </div>
  );
};

import { ReactNode } from 'react';
import styles from './styles.module.css';
import { PersonBrief } from '@shared/api';

export interface CardProps {
  personBrief: PersonBrief;
  showDetails: (id: string, url: string) => void;
}

export const Card = ({ personBrief, showDetails }: CardProps): ReactNode => {
  const { id, url, name, height } = personBrief;

  return (
    <div className={styles.card} onClick={() => showDetails(id, url)}>
      <h2>{name}</h2>
      <p>{`Height: ${height}`}</p>
    </div>
  );
};

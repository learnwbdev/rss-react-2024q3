import { ReactNode } from 'react';
import styles from './styles.module.css';

export interface CardProps {
  id: number;
  name: string;
  height: string;
  showDetails: (id: number) => void;
}

export const Card = ({ id, name, height, showDetails }: CardProps): ReactNode => {
  return (
    <div className={styles.card} onClick={() => showDetails(id)}>
      <h2>{name}</h2>
      <p>{`Height: ${height}`}</p>
    </div>
  );
};

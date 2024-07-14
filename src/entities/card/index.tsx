import { ReactNode } from 'react';
import styles from './styles.module.css';

export interface CardProps {
  name: string;
  description: string;
}

export const Card = ({ name, description }: CardProps): ReactNode => {
  return (
    <div className={styles.card}>
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
};

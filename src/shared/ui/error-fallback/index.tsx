import { ReactNode } from 'react';
import styles from './styles.module.css';

export const ErrorFallback = (): ReactNode => {
  return (
    <section className={styles.fallback}>
      <h2 className={styles.error_header}>Sorry.. there was an error</h2>
    </section>
  );
};

import { Component } from 'react';
import styles from './styles.module.css';

export class ErrorFallback extends Component {
  render(): React.ReactNode {
    return (
      <section className={styles.fallback}>
        <h2 className={styles.error_header}>Sorry.. there was an error</h2>
      </section>
    );
  }
}

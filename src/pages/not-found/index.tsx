import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@shared/ui';
import styles from './styles.module.css';
import { ThemeToggleBtn } from '@widgets/theme-toggle-btn';

export const NotFoundPage = (): ReactNode => {
  return (
    <>
      <ThemeToggleBtn />
      <main className={styles.page}>
        <h1 className={styles.visually_hidden}>React Routing</h1>
        <section className={styles.section}>
          <h2 className={styles.heading}>404</h2>
          <p className={styles.subheading}>Page Not Found</p>
          <p className={styles.text}>Whoops! Sorry, we can&apos;t find that page.</p>
          <Link to="/">
            <Button className={styles.btn} text="Back to Homepage" />
          </Link>
        </section>
      </main>
    </>
  );
};

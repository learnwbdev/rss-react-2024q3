import { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@shared/ui';
import styles from './not-found-page.module.css';

const NotFoundPage = (): ReactNode => {
  return (
    <>
      <h1 className="visually_hidden">Page Not Found</h1>
      <section className={styles.section}>
        <h2 className={styles.heading}>404</h2>
        <p className={styles.subheading}>Page Not Found</p>
        <p className={styles.text}>Whoops! Sorry, we can&apos;t find that page.</p>
        <Link href="/">
          <Button className={styles.btn} text="Back to Homepage" />
        </Link>
      </section>
    </>
  );
};

export default NotFoundPage;

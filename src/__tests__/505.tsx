import { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@shared/ui';
import styles from './not-found-page.module.css';

const Custom505 = (): ReactNode => {
  return (
    <>
      <h1 className={styles.visually_hidden}>Server Error</h1>
      <section className={styles.section}>
        <h2 className={styles.heading}>505</h2>
        <p className={styles.subheading}>Server Error</p>
        <p className={styles.text}>Whoops! Sorry, something went wrong on our end.</p>
        <Link href="/">
          <Button className={styles.btn} text="Back to Homepage" />
        </Link>
      </section>
    </>
  );
};

export default Custom505;

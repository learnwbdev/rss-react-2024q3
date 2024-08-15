import { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@shared/ui';
import styles from '@styles/not-found-page.module.css';

const Custom505 = (): ReactNode => {
  return (
    <>
      <Head>
        <title>Server Error</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <main className={styles.page}>
        <h1 className={styles.visually_hidden}>Server Error</h1>
        <section className={styles.section}>
          <h2 className={styles.heading}>505</h2>
          <p className={styles.subheading}>Server Error</p>
          <p className={styles.text}>Whoops! Sorry, something went wrong on our end.</p>
          <Link href="/">
            <Button className={styles.btn} text="Back to Homepage" />
          </Link>
        </section>
      </main>
    </>
  );
};

export default Custom505;

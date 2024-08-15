import { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@shared/ui';
import styles from '@styles/not-found-page.module.css';

const NotFoundPage = (): ReactNode => {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <main className={styles.page}>
        <h1 className={styles.visually_hidden}>Page Not Found</h1>
        <section className={styles.section}>
          <h2 className={styles.heading}>404</h2>
          <p className={styles.subheading}>Page Not Found</p>
          <p className={styles.text}>Whoops! Sorry, we can&apos;t find that page.</p>
          <Link href="/">
            <Button className={styles.btn} text="Back to Homepage" />
          </Link>
        </section>
      </main>
    </>
  );
};

export default NotFoundPage;

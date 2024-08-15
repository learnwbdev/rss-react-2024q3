'use client';

import { ReactNode, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search } from '@entities';
import { CardList } from '@widgets';
import { Pagination } from '@features';
import { URL_PARAM } from '@constants';
import { People } from '@app-types';
import styles from './main-page.module.css';

interface MainPageProps {
  peopleData: People;
}

export const MainPage = ({ peopleData }: MainPageProps): ReactNode => {
  const { totalPages, results } = peopleData;

  const router = useRouter();

  const searchParams = useSearchParams();

  const handleCloseDetails = useCallback(() => {
    if (!searchParams.get(URL_PARAM.DETAILS)) return;

    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.delete(URL_PARAM.DETAILS);

    router.push(`/?${newSearchParams.toString()}`);
  }, [searchParams, router]);

  return (
    <div className={styles.content} onClick={handleCloseDetails}>
      <section className={styles.section}>
        <Search />
      </section>
      <section className={styles.section}>
        <CardList results={results} />
        <Pagination className={styles.pagination} totalPages={totalPages} />
      </section>
    </div>
  );
};

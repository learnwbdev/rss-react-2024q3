import { ReactNode, useCallback, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Search } from '@entities';
import { CardList, DetailedCard, SelectedFlyout } from '@widgets';
import { Loader } from '@shared/ui';
import { useSearchStorage } from '@hooks';
import { peopleApi, store, useAppSelector } from '@store';
import { Pagination } from '@features';
import { API_URL, URL_PARAM } from '@constants';
import { People, Person } from '@app-types/person';
import styles from '@styles/main-page.module.css';

const initialPage = 1;

interface MainPageProps {
  data?: People;
  personDetail?: Person;
  page?: number;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const {
    [URL_PARAM.PAGE]: page = '1',
    [URL_PARAM.SEARCH]: searchTerm = '',
    [URL_PARAM.DETAILS]: personId = '',
  } = query;

  const url = new URL(API_URL);

  url.searchParams.set(URL_PARAM.PAGE, page.toString());

  if (searchTerm) url.searchParams.set(URL_PARAM.SEARCH, searchTerm.toString());

  const listResult = await store.dispatch(
    peopleApi.endpoints.getPeople.initiate({ page: Number(page.toString()), searchTerm: searchTerm.toString() })
  );

  const { data } = listResult;

  if (!data || listResult.error) {
    return { notFound: true };
  }

  const { totalPages, results } = data;

  let personDetail: Person | null = null;

  if (personId) {
    const personResult = await store.dispatch(peopleApi.endpoints.getPersonById.initiate(personId.toString()));

    personDetail = personResult?.data ?? null;
  }

  return {
    props: {
      data: {
        totalPages,
        results,
      },
      page: Number(page.toString()),
      personDetail,
    },
  };
};

const MainPage = ({ data, personDetail }: MainPageProps): ReactNode => {
  const detailedCardRef = useRef<HTMLDivElement | null>(null);

  const { totalPages = 0, results = [] } = data ?? {};

  const { selectedItems } = useAppSelector((store) => store.selectedItems);

  const hasSelectedItems = selectedItems.length > 0;

  const { query, push, pathname } = useRouter();

  const details = (query?.[URL_PARAM.DETAILS] ?? '').toString();

  const [searchTerm, setSearchTerm] = useSearchStorage();

  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) return;

    hasMounted.current = true;

    if (!query[URL_PARAM.SEARCH] && searchTerm) {
      void push({
        pathname,
        query: { ...query, searchTerm },
      });
    }
  }, [query, push, pathname, searchTerm]);

  const handleSearch = useCallback(
    (searchTerm: string): void => {
      void push({
        pathname,
        query: { ...query, searchTerm: searchTerm === '' ? undefined : searchTerm, page: initialPage },
      });
      setSearchTerm(searchTerm);
    },
    [query, push, pathname, setSearchTerm]
  );

  const handleDetailsClose = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const { target } = event;

      if (detailedCardRef.current && detailedCardRef.current !== target) {
        const { [URL_PARAM.DETAILS]: _, ...newQuery } = query;

        void push({
          pathname,
          query: { ...newQuery },
        });
      }
    },
    [query, push, pathname]
  );

  return (
    <>
      <Head>
        <title>React Next.js</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <main className={styles.page}>
        <h1 className="visually_hidden">React is Cool</h1>
        <div className={`${styles.page_details} ${hasSelectedItems ? styles.page_details_flyout : ''}`}>
          <div className={styles.content} onClick={handleDetailsClose}>
            <section className={styles.section}>
              <Search onSearch={handleSearch} />
            </section>
            <section className={styles.section}>
              {results.length === 0 ? (
                <Loader />
              ) : (
                <>
                  <CardList results={results} />
                  <Pagination className={styles.pagination} totalPages={totalPages} />
                </>
              )}
            </section>
          </div>
          {details && personDetail && (
            <aside className={`${styles.section} ${styles.aside}`} ref={detailedCardRef}>
              <DetailedCard person={personDetail} />
            </aside>
          )}
        </div>
        {hasSelectedItems && (
          <section className={styles.section}>
            <SelectedFlyout isOpen={hasSelectedItems} />
          </section>
        )}
      </main>
    </>
  );
};

export default MainPage;

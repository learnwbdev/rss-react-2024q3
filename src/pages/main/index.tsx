import { ReactNode, useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from '@entities';
import { CardList, ErrorSection } from '@widgets';
import { People } from '@shared/api';
import { Loader } from '@shared/ui';
import { ErrorBoundary } from '@shared/utils';
import { ErrorFallback } from '@shared/ui';
import { useSearchStorage } from '@shared/hooks';
import { getPeople } from '@features/get-people';
import { Pagination } from '@features/pagination';
import styles from './styles.module.css';

interface SearchResultState {
  response: People | Record<string, never>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

const defaultResult = {
  response: {},
  isLoading: false,
  isError: false,
  error: null,
};

export const MainPage = (): ReactNode => {
  const initialPage = 1;

  const [searchParams, setSearchParams] = useSearchParams();

  const setPage = useCallback((pageNew: number) => setSearchParams({ page: pageNew.toString() }), [setSearchParams]);

  const [searchTerm] = useSearchStorage();

  const [result, setResult] = useState<SearchResultState>(defaultResult);
  const { response, isLoading, isError } = result;
  const { itemsPerPage, totalPages, results } = response;

  const pageStr = searchParams.get('page') ?? '';
  const page = Number.parseInt(pageStr) || initialPage;
  const isSetPage = !pageStr;

  const startItem = (page - 1) * itemsPerPage;
  const stopItem = page * itemsPerPage;

  const onPageChange = (newPage: number): void => {
    setPage(newPage);
  };

  const getData = useCallback(
    (searchTerm: string): void => {
      setResult((prev) => ({ ...prev, isLoading: true }));

      getPeople(searchTerm)
        .then((response) => {
          setResult({ response, isLoading: false, isError: false, error: null });
        })
        .catch((err: unknown) => {
          const error = err instanceof Error ? err : new Error('Unknown Api Error');

          setResult({ response: {}, isLoading: false, isError: true, error });
        });
    },
    [setResult]
  );

  const handleSearch = useCallback(
    (searchTerm: string): void => {
      setPage(initialPage);
      getData(searchTerm);
    },
    [getData, setPage]
  );

  useEffect(() => {
    getData(searchTerm);
  }, [searchTerm, getData]);

  useEffect(() => {
    if (isSetPage) setPage(initialPage);
  }, [setPage, isSetPage]);

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <main className={styles.page}>
        <h1 className={styles.visually_hidden}>React Routing</h1>
        <section className={styles.section}>
          <Search onSearch={handleSearch} disabled={isLoading} />
        </section>
        <section className={styles.section}>
          {isLoading && <Loader />}
          {!isLoading && isError && <div>Api Error</div>}
          {!isLoading && !isError && !!results && (
            <>
              <CardList results={results.slice(startItem, stopItem)} />
              <Pagination
                className={styles.pagination}
                page={page}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </>
          )}
        </section>
        <ErrorSection />
      </main>
    </ErrorBoundary>
  );
};

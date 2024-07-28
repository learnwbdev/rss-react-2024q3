import { ReactNode, useState, useCallback, useEffect } from 'react';
import { useSearchParams, Outlet } from 'react-router-dom';
import { Search } from '@entities';
import { CardList } from '@widgets';
import { People } from '@shared/api';
import { Loader } from '@shared/ui';
import { ErrorBoundary } from '@shared/utils';
import { ErrorFallback } from '@shared/ui';
import { useSearchStorage } from '@shared/hooks';
import { useAppSelector } from '@shared/store';
import { SelectedFlyout } from '@widgets';
import { getPeople } from '@features/get-people';
import { Pagination } from '@features/pagination';
import { URL_PARAM } from '@shared/constants';
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

  const { selectedItems } = useAppSelector((store) => store.selectedItems);

  const hasSelectedItems = selectedItems.length > 0;

  const [searchParams, setSearchParams] = useSearchParams();

  const setPage = useCallback(
    (pageNew: number) =>
      setSearchParams((prev) => {
        prev.set(URL_PARAM.PAGE, pageNew.toString());
        return prev;
      }),
    [setSearchParams]
  );

  const [searchTerm] = useSearchStorage();

  const [result, setResult] = useState<SearchResultState>(defaultResult);

  const { response, isLoading, isError } = result;
  const { itemsPerPage, totalPages, results } = response;

  const pageStr = searchParams.get(URL_PARAM.PAGE) ?? '';
  const page = Number.parseInt(pageStr) || initialPage;
  const isSetPage = !pageStr;

  const startItem = (page - 1) * itemsPerPage;
  const stopItem = page * itemsPerPage;

  const details = searchParams.get(URL_PARAM.DETAILS) ?? '';

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

  const handleDetailsClose = useCallback(() => {
    setSearchParams((prev) => {
      prev.delete(URL_PARAM.DETAILS);
      return prev;
    });
  }, [setSearchParams]);

  useEffect(() => {
    getData(searchTerm);
  }, [searchTerm, getData]);

  useEffect(() => {
    if (isSetPage) setPage(initialPage);
  }, [setPage, isSetPage]);

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <main className={styles.page}>
        <h1 className="visually_hidden">React Routing</h1>
        <div className={styles.page_details}>
          <div className={styles.content} onClick={handleDetailsClose}>
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
          </div>
          {details && (
            <aside className={`${styles.section} ${styles.aside}`}>
              <Outlet />
            </aside>
          )}
        </div>
        {hasSelectedItems && (
          <section className={styles.section}>
            <SelectedFlyout />
          </section>
        )}
      </main>
    </ErrorBoundary>
  );
};

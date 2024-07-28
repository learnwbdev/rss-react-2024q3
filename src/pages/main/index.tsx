import { ReactNode, useCallback, useEffect } from 'react';
import { useSearchParams, Outlet } from 'react-router-dom';
import { Search } from '@entities';
import { CardList } from '@widgets';
import { Loader } from '@shared/ui';
import { ErrorBoundary } from '@shared/utils';
import { ErrorFallback } from '@shared/ui';
import { useSearchStorage } from '@shared/hooks';
import { useAppSelector, peopleApi } from '@shared/store';
import { SelectedFlyout } from '@widgets';
import { Pagination } from '@features/pagination';
import { URL_PARAM } from '@shared/constants';
import styles from './styles.module.css';

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

  const [searchTerm, setSearchTerm] = useSearchStorage();

  const pageStr = searchParams.get(URL_PARAM.PAGE) ?? '';
  const page = Number.parseInt(pageStr) || initialPage;
  const isSetPage = !pageStr;

  const details = searchParams.get(URL_PARAM.DETAILS) ?? '';

  const { data, error, isFetching } = peopleApi.useGetPeopleQuery({ page, searchTerm });

  const { totalPages, results } = data ?? {};

  const onPageChange = (newPage: number): void => {
    setPage(newPage);
  };

  const handleSearch = useCallback(
    (searchTerm: string): void => {
      setPage(initialPage);
      setSearchTerm(searchTerm);
    },
    [setPage, setSearchTerm]
  );

  const handleDetailsClose = useCallback(() => {
    setSearchParams((prev) => {
      prev.delete(URL_PARAM.DETAILS);
      return prev;
    });
  }, [setSearchParams]);

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
              <Search onSearch={handleSearch} disabled={isFetching} />
            </section>
            <section className={styles.section}>
              {isFetching && <Loader />}
              {!isFetching && error && <div>Api Error</div>}
              {!isFetching && !error && !!data && !!results && !!totalPages && (
                <>
                  <CardList results={results} />
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

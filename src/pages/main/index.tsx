import { ReactNode, useCallback, useRef } from 'react';
import { useSearchParams, Outlet } from 'react-router-dom';
import { Search } from '@entities';
import { CardList } from '@widgets';
import { Loader } from '@shared/ui';
import { ErrorBoundary } from '@shared/utils';
import { ErrorFallback } from '@shared/ui';
import { useLocationPage, useSearchStorage } from '@shared/hooks';
import { useAppSelector, peopleApi } from '@shared/store';
import { SelectedFlyout } from '@widgets';
import { Pagination } from '@features/pagination';
import { URL_PARAM } from '@shared/constants';
import styles from './styles.module.css';

const initialPage = 1;

export const MainPage = (): ReactNode => {
  const detailedCardRef = useRef(null);

  const { page, setPage } = useLocationPage();

  const { selectedItems } = useAppSelector((store) => store.selectedItems);

  const hasSelectedItems = selectedItems.length > 0;

  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useSearchStorage();

  const details = searchParams.get(URL_PARAM.DETAILS) ?? '';

  const { data, error, isFetching } = peopleApi.useGetPeopleQuery({ page, searchTerm });

  const { totalPages, results } = data ?? {};

  const handleSearch = useCallback(
    (searchTerm: string): void => {
      setPage(initialPage);
      setSearchTerm(searchTerm);
    },
    [setPage, setSearchTerm]
  );

  const handleDetailsClose = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const { target } = event;

      if (detailedCardRef.current && detailedCardRef.current !== target) {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete(URL_PARAM.DETAILS);

        setSearchParams(newSearchParams.toString());
      }
    },
    [searchParams, setSearchParams]
  );

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <main className={styles.page}>
        <h1 className="visually_hidden">React Routing</h1>
        <div className={`${styles.page_details} ${hasSelectedItems ? styles.page_details_flyout : ''}`}>
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
                  <Pagination className={styles.pagination} totalPages={totalPages} />
                </>
              )}
            </section>
          </div>
          {details && (
            <aside className={`${styles.section} ${styles.aside}`} ref={detailedCardRef}>
              <Outlet />
            </aside>
          )}
        </div>
        {hasSelectedItems && (
          <section className={styles.section}>
            <SelectedFlyout isOpen={hasSelectedItems} />
          </section>
        )}
      </main>
    </ErrorBoundary>
  );
};

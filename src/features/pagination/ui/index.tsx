import { ReactNode, ComponentProps } from 'react';
import { PaginationNavEnd, PaginationNavStart } from './pagination-nav';
import { PaginationPages } from './pagination-pages';
import { PageContext } from '../context';
import styles from './pagination.module.css';
import { useLocationPage } from '@shared/hooks';

interface PaginationProps extends ComponentProps<'nav'> {
  totalPages: number;
}

export const Pagination = ({ totalPages, ...props }: PaginationProps): ReactNode => {
  const { page, setPage } = useLocationPage();

  return (
    <nav aria-label="page navigation" {...props}>
      <ul className={styles.pagination}>
        <PageContext.Provider value={{ page, setPage }}>
          <PaginationNavStart />
          <PaginationPages totalPages={totalPages} />
          <PaginationNavEnd totalPages={totalPages} />
        </PageContext.Provider>
      </ul>
    </nav>
  );
};

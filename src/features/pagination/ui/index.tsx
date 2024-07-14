import { ReactNode, ComponentProps } from 'react';
import styles from './pagination.module.css';
import { PaginationNavEnd, PaginationNavStart } from './pagination-nav';
import { PaginationPages } from './pagination-pages';

interface PaginationProps extends ComponentProps<'nav'> {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ page, totalPages, onPageChange, ...props }: PaginationProps): ReactNode => {
  return (
    <nav aria-label="page navigation" {...props}>
      <ul className={styles.pagination}>
        <PaginationNavStart page={page} onPageChange={onPageChange} />
        <PaginationPages page={page} totalPages={totalPages} onPageChange={onPageChange} />
        <PaginationNavEnd page={page} totalPages={totalPages} onPageChange={onPageChange} />
      </ul>
    </nav>
  );
};

import { ReactNode } from 'react';
import { PaginationItem } from './pagination-item';
import { range } from '@shared/utils';
import styles from './pagination.module.css';

interface PaginationPagesProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Ellipsis = (): ReactNode => {
  return (
    <li>
      <div className={styles.ellipsis}>...</div>
    </li>
  );
};

const PaginationEllipsis = ({ page, totalPages, onPageChange }: PaginationPagesProps): ReactNode => {
  const fstPage = 1;
  const startShow = 3;
  const endShow = totalPages - startShow + 1;

  return (
    <>
      {page > startShow ? (
        <PaginationItem itemPage={fstPage} onPageChange={onPageChange} isActivePage={page === fstPage} />
      ) : (
        range(fstPage, startShow).map((pageNum) => (
          <PaginationItem
            key={pageNum}
            itemPage={pageNum}
            onPageChange={onPageChange}
            isActivePage={pageNum === page}
          />
        ))
      )}
      <Ellipsis />
      {page > startShow && page < endShow && (
        <>
          <PaginationItem itemPage={page} onPageChange={onPageChange} isActivePage />
          <Ellipsis />
        </>
      )}
      {page < endShow ? (
        <PaginationItem itemPage={totalPages} onPageChange={onPageChange} isActivePage={page === totalPages} />
      ) : (
        range(endShow, totalPages).map((pageNum) => (
          <PaginationItem
            key={pageNum}
            itemPage={pageNum}
            onPageChange={onPageChange}
            isActivePage={pageNum === page}
          />
        ))
      )}
    </>
  );
};

export const PaginationPages = ({ page, totalPages, onPageChange }: PaginationPagesProps): ReactNode => {
  const numShowAll = 5;
  const fstPage = 1;

  return (
    <>
      {totalPages <= numShowAll ? (
        range(fstPage, totalPages).map((pageNum) => (
          <PaginationItem
            key={pageNum}
            itemPage={pageNum}
            onPageChange={onPageChange}
            isActivePage={pageNum === page}
          />
        ))
      ) : (
        <PaginationEllipsis page={page} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </>
  );
};

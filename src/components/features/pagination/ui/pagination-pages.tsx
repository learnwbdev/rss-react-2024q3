'use client';

import { ReactNode, useContext } from 'react';
import { PaginationItem } from './pagination-item';
import { range } from '@utils';
import { PageContext } from '../context';
import styles from './pagination.module.css';

interface PaginationPagesProps {
  totalPages: number;
}

const Ellipsis = (): ReactNode => {
  return (
    <li>
      <div className={styles.ellipsis}>...</div>
    </li>
  );
};

const PaginationEllipsis = ({ totalPages }: PaginationPagesProps): ReactNode => {
  const { page } = useContext(PageContext);

  const fstPage = 1;
  const startShow = 3;
  const endShow = totalPages - startShow + 1;

  return (
    <>
      {page > startShow ? (
        <PaginationItem itemPage={fstPage} isActivePage={page === fstPage} />
      ) : (
        range(fstPage, startShow).map((pageNum) => (
          <PaginationItem key={pageNum} itemPage={pageNum} isActivePage={pageNum === page} />
        ))
      )}
      <Ellipsis />
      {page > startShow && page < endShow && (
        <>
          <PaginationItem itemPage={page} isActivePage />
          <Ellipsis />
        </>
      )}
      {page < endShow ? (
        <PaginationItem itemPage={totalPages} isActivePage={page === totalPages} />
      ) : (
        range(endShow, totalPages).map((pageNum) => (
          <PaginationItem key={pageNum} itemPage={pageNum} isActivePage={pageNum === page} />
        ))
      )}
    </>
  );
};

export const PaginationPages = ({ totalPages }: PaginationPagesProps): ReactNode => {
  const { page } = useContext(PageContext);

  const numShowAll = 5;
  const fstPage = 1;

  return (
    <>
      {totalPages <= numShowAll ? (
        range(fstPage, totalPages).map((pageNum) => (
          <PaginationItem key={pageNum} itemPage={pageNum} isActivePage={pageNum === page} />
        ))
      ) : (
        <PaginationEllipsis totalPages={totalPages} />
      )}
    </>
  );
};

'use client';

import { ReactNode, useCallback, useContext } from 'react';
import { PageContext } from '../context';
import styles from './pagination.module.css';

interface PaginationItemProps {
  itemPage: number;
  isActivePage?: boolean;
}

export const PaginationItem = ({ itemPage, isActivePage = false }: PaginationItemProps): ReactNode => {
  const { setPage } = useContext(PageContext);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      event.stopPropagation();
      setPage(itemPage);
    },
    [setPage, itemPage]
  );

  return (
    <li aria-current={isActivePage && 'page'}>
      <button
        type="button"
        className={`${styles.btn_item} ${styles.page_item} ${isActivePage ? styles.page_item__active : ''}`}
        disabled={isActivePage}
        onClick={handleClick}
      >
        {itemPage}
      </button>
    </li>
  );
};

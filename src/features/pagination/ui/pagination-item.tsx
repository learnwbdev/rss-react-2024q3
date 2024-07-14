import { ReactNode } from 'react';
import styles from './pagination.module.css';

interface PaginationItemProps {
  itemPage: number;
  onPageChange: (page: number) => void;
  isActivePage?: boolean;
}

export const PaginationItem = ({ itemPage, onPageChange, isActivePage = false }: PaginationItemProps): ReactNode => {
  const handleClick = (): void => onPageChange(itemPage);

  return (
    <li aria-current={isActivePage && 'page'}>
      <button
        type="button"
        className={`${styles.btn} ${styles.page_item} ${isActivePage ? styles.page_item__active : ''}`}
        onClick={handleClick}
      >
        {itemPage}
      </button>
    </li>
  );
};

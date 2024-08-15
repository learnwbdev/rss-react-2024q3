import { ReactNode, useContext, useCallback } from 'react';
import ChevronLeft from '@icons/chevron-left.svg';
import ChevronRight from '@icons/chevron-right.svg';
import { PageContext } from '../context';
import styles from './pagination.module.css';

interface PaginationNavProps {
  onClick: () => void;
  ariaLabel: string;
  children?: ReactNode;
  disabled?: boolean;
}

interface PaginationNavEndProps {
  totalPages: number;
}

const PaginationNav = ({ onClick, ariaLabel, children, disabled = false }: PaginationNavProps): ReactNode => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      event.stopPropagation();
      onClick();
    },
    [onClick]
  );

  return (
    <button
      type="button"
      className={`${styles.btn} ${styles.page_nav}`}
      disabled={disabled}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export const PaginationNavStart = (): ReactNode => {
  const { page, setPage } = useContext(PageContext);

  const frstPage = 1;

  const goToPrevPage = (): void => {
    if (page > frstPage) setPage(page - 1);
  };

  return (
    <li>
      <PaginationNav onClick={goToPrevPage} disabled={page === frstPage} ariaLabel="go to previous page">
        <div className={styles.ico}>
          <ChevronLeft />
        </div>
      </PaginationNav>
    </li>
  );
};

export const PaginationNavEnd = ({ totalPages }: PaginationNavEndProps): ReactNode => {
  const { page, setPage } = useContext(PageContext);

  const goToNextPage = (): void => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <li>
      <PaginationNav onClick={goToNextPage} disabled={page === totalPages} ariaLabel="go to next page">
        <div className={styles.ico}>
          <ChevronRight />
        </div>
      </PaginationNav>
    </li>
  );
};

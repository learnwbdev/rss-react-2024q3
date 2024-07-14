import { ReactNode, ReactEventHandler } from 'react';
import ChevronLeft from '@assets/chevron-left.svg';
import ChevronRight from '@assets/chevron-right.svg';
import styles from './pagination.module.css';

interface PaginationNavProps {
  onClick: ReactEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  disabled?: boolean;
}

interface PaginationNavStartProps {
  page: number;
  onPageChange: (page: number) => void;
}

interface PaginationNavEndProps extends PaginationNavStartProps {
  totalPages: number;
}

const PaginationNav = ({ onClick, children, disabled = false }: PaginationNavProps): ReactNode => {
  return (
    <button type="button" className={`${styles.btn} ${styles.page_nav}`} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export const PaginationNavStart = ({ page, onPageChange }: PaginationNavStartProps): ReactNode => {
  const frstPage = 1;

  const goToPrevPage = (): void => {
    if (page > frstPage) onPageChange(page - 1);
  };

  return (
    <li>
      <PaginationNav onClick={goToPrevPage} disabled={page === frstPage}>
        <div className={styles.ico}>
          <ChevronLeft />
        </div>
      </PaginationNav>
    </li>
  );
};

export const PaginationNavEnd = ({ page, totalPages, onPageChange }: PaginationNavEndProps): ReactNode => {
  const goToNextPage = (): void => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <li>
      <PaginationNav onClick={goToNextPage} disabled={page === totalPages}>
        <div className={styles.ico}>
          <ChevronRight />
        </div>
      </PaginationNav>
    </li>
  );
};

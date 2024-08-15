import { Suspense, ReactNode } from 'react';
import { Loader } from '../loader';
import styles from './styles.module.css';

interface SuspenseWrapperProps {
  children: ReactNode;
}

export const SuspenseWrapper = ({ children }: SuspenseWrapperProps): ReactNode => {
  return (
    <Suspense
      fallback={
        <div className={styles.loader_wrapper}>
          <Loader />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

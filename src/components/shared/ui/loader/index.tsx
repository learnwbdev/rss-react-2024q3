'use client';

import { ReactNode } from 'react';
import styles from './loader.module.css';

export const Loader = (): ReactNode => {
  return <div className={styles.loader} data-testid="loader"></div>;
};

'use client';

import { ReactNode } from 'react';
import { useAppSelector } from '@hooks';
import { SelectedFlyout } from '@widgets';
import styles from './layout-with-flyout.module.css';

interface LayoutWithFlyoutProps {
  children: ReactNode;
}

export const LayoutWithFlyout = ({ children }: LayoutWithFlyoutProps) => {
  const { selectedItems } = useAppSelector((store) => store.selectedItems);
  const hasSelectedItems = selectedItems.length > 0;

  const classWrapper = hasSelectedItems ? styles.page_details_flyout : '';

  return (
    <>
      <div className={`${styles.page_details} ${classWrapper}`}>{children}</div>
      {hasSelectedItems && (
        <section className={styles.flyout_section}>
          <SelectedFlyout isOpen={hasSelectedItems} />
        </section>
      )}
    </>
  );
};

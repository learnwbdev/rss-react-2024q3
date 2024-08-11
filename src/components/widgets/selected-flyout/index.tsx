import { ReactNode } from 'react';
import { unselectAllItems, useAppDispatch, useAppSelector } from '@store';
import { Button } from '@shared/ui';
import { DownloadItems } from '@features';
import styles from './styles.module.css';

export interface SelectedFlyoutProps {
  isOpen?: boolean;
}

export const SelectedFlyout = ({ isOpen = false }: SelectedFlyoutProps): ReactNode => {
  const { selectedItems } = useAppSelector((store) => store.selectedItems);

  const selectedCnt = selectedItems.length;

  const dispatch = useAppDispatch();

  const handleUnselectAll = (): void => {
    dispatch(unselectAllItems());
  };

  return (
    <div className={`${styles.flyout} ${isOpen ? styles.flyout_open : ''}`}>
      <p className={styles.info}>{`${selectedCnt} ${selectedCnt > 1 ? 'items are selected' : 'item is selected'}`}</p>
      <div className={styles.actions}>
        <DownloadItems />
        <Button text="Unselect All" color="warning" onClick={handleUnselectAll} />
      </div>
    </div>
  );
};

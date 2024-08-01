import { ReactNode } from 'react';
import { useAppSelector } from '@shared/store';
import { Button } from '@shared/ui';
import { exportCsv } from './utils';
import { useGetPersonByIdQueries } from './hooks';

export const DownloadItems = (): ReactNode => {
  const { selectedItems } = useAppSelector((store) => store.selectedItems);

  const selectedCnt = selectedItems.length;

  const { data, isLoading } = useGetPersonByIdQueries(selectedItems);

  const handleDownload = (): void => {
    const filename = `${selectedCnt}_${selectedCnt === 1 ? 'person' : 'people'}`;

    exportCsv(filename, data ?? []);
  };

  return <Button text="Download" onClick={handleDownload} disabled={isLoading} />;
};

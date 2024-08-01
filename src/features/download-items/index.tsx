import { ReactNode, useState } from 'react';
import { useAppSelector } from '@shared/store';
import { Button } from '@shared/ui';
import { useGetPersonByIdQueries } from './hooks';
import { FileDownload } from './file-download';

export const DownloadItems = (): ReactNode => {
  const { selectedItems } = useAppSelector((store) => store.selectedItems);

  const [triggerDownload, setTriggerDownload] = useState(false);

  const selectedCnt = selectedItems.length;

  const { data, isLoading } = useGetPersonByIdQueries(selectedItems);

  const filename = `${selectedCnt}_${selectedCnt === 1 ? 'person' : 'people'}`;

  const handleDownload = (): void => {
    setTriggerDownload(true);
  };

  const onDownloadComplete = (): void => setTriggerDownload(false);

  return (
    <>
      <Button text="Download" onClick={handleDownload} disabled={isLoading} />
      {triggerDownload && (
        <FileDownload filename={filename} data={data ?? []} onDownloadComplete={onDownloadComplete} />
      )}
    </>
  );
};

'use client';

import { ReactNode, useState } from 'react';
import { useAppSelector } from '@hooks';
import { Button } from '@shared/ui';
import { FileDownload } from './file-download';
import styles from './download-items.module.css';

const extractFilename = (contentDisposition: string | null): string => {
  const defaultFilename = 'data.csv';

  if (!contentDisposition) return defaultFilename;

  const matches = /filename="([^"]+)"/.exec(contentDisposition);
  return matches ? matches[1] : defaultFilename;
};

export const DownloadItems = (): ReactNode => {
  const { selectedItems } = useAppSelector((store) => store.selectedItems);

  const [isDownloading, setIsDownloading] = useState(false);

  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const [filename, setFilename] = useState<string | null>(null);

  const [error, setError] = useState<Error | null>(null);

  const handleDownload = async (): Promise<void> => {
    setIsDownloading(true);
    setError(null);
    setFilename(null);

    try {
      const response = await fetch(`/api/download?ids=${selectedItems.join(',')}`);

      if (!response.ok) {
        setError(new Error('Failed to download file'));
      }

      const contentDisposition = response.headers.get('Content-Disposition');
      const filenameApi = extractFilename(contentDisposition);

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      setFilename(filenameApi);
    } catch (error) {
      if (error instanceof Error) {
        setError(new Error('Download failed: ' + error.message));
      } else {
        setError(new Error('Download failed due to an unknown error.'));
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const onDownloadComplete = (): void => {
    setIsDownloading(false);
    setDownloadUrl(null);
  };

  return (
    <div className={styles.download}>
      <Button text="Download" onClick={() => void handleDownload()} disabled={isDownloading} />
      {downloadUrl && filename && (
        <FileDownload url={downloadUrl} filename={filename} onDownloadComplete={onDownloadComplete} />
      )}
      {error && <div className={styles.error}>{error.message}</div>}
    </div>
  );
};

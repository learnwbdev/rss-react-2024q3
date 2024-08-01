import { ReactNode, useEffect, useRef } from 'react';
import { Person } from '@shared/api';
import { createCsvString } from './utils';

export interface FileDownloadProps {
  filename: string;
  data: Person[];
  onDownloadComplete?: () => void;
}

export const FileDownload = ({ filename, data, onDownloadComplete }: FileDownloadProps): ReactNode => {
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const hasDownloaded = useRef(false);

  useEffect(() => {
    if (!linkRef.current || hasDownloaded.current) return;

    hasDownloaded.current = true;

    const csvString = createCsvString(data);
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    linkRef.current.href = url;
    linkRef.current.download = `${filename}.csv`;

    linkRef.current.click();

    URL.revokeObjectURL(url);

    if (onDownloadComplete) {
      onDownloadComplete();
    }
  }, [filename, data, onDownloadComplete]);

  return (
    <a ref={linkRef} style={{ display: 'none' }}>
      Download
    </a>
  );
};

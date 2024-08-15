'use client';

import { ReactNode, useEffect, useRef } from 'react';

export interface FileDownloadProps {
  url: string;
  filename: string;
  onDownloadComplete?: () => void;
}

export const FileDownload = ({ url, filename, onDownloadComplete }: FileDownloadProps): ReactNode => {
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const hasDownloaded = useRef(false);

  useEffect(() => {
    if (!linkRef.current || hasDownloaded.current) return;

    hasDownloaded.current = true;

    linkRef.current.href = url;
    linkRef.current.download = filename;

    linkRef.current.click();

    if (onDownloadComplete) {
      onDownloadComplete();
    }
  }, [url, filename, onDownloadComplete]);

  return (
    <a ref={linkRef} style={{ display: 'none' }}>
      Download
    </a>
  );
};

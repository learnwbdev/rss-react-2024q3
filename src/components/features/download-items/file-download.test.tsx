import { render, waitFor } from '@tests/utils';
import { describe, it, expect, vi } from 'vitest';
import mockRouter from 'next-router-mock';
import { FileDownload } from './file-download';

vi.mock('next/router', async () => {
  const routerMock = await vi.importActual('next-router-mock');
  return routerMock;
});

describe('FileDownload', () => {
  it('renders and triggers download', async () => {
    const mockUrl = 'blob:http://example.com/download';
    const mockFilename = 'test-file.csv';
    const mockOnDownloadComplete = vi.fn();

    const initialPath = `/?page=1`;

    await mockRouter.push(initialPath);

    const { getByText } = render(
      <FileDownload url={mockUrl} filename={mockFilename} onDownloadComplete={mockOnDownloadComplete} />
    );

    const linkElement = getByText('Download');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toBeInstanceOf(HTMLAnchorElement);

    if (linkElement instanceof HTMLAnchorElement) {
      expect(linkElement.href).toBe(mockUrl);
      expect(linkElement.download).toBe(mockFilename);
    } else {
      throw new Error('Expected element to be an HTMLAnchorElement');
    }

    await waitFor(() => {
      expect(mockOnDownloadComplete).toHaveBeenCalled();
    });
  });

  it('does not trigger download more than once', async () => {
    const mockUrl = 'blob:http://example.com/download';
    const mockFilename = 'test-file.csv';
    const mockOnDownloadComplete = vi.fn();

    const initialPath = `/?page=1`;

    await mockRouter.push(initialPath);

    render(<FileDownload url={mockUrl} filename={mockFilename} onDownloadComplete={mockOnDownloadComplete} />);

    await waitFor(() => {
      expect(mockOnDownloadComplete).toHaveBeenCalledTimes(1);
    });
  });

  it('does not call onDownloadComplete if it is undefined', async () => {
    const mockUrl = 'blob:http://example.com/download';
    const mockFilename = 'test-file.csv';

    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => ({}));

    const initialPath = `/?page=1`;

    await mockRouter.push(initialPath);

    render(<FileDownload url={mockUrl} filename={mockFilename} />);

    expect(clickSpy).toHaveBeenCalled();

    clickSpy.mockRestore();
  });
});

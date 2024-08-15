import { render, waitFor } from '@tests/utils';
import { describe, it, expect, vi } from 'vitest';
import { FileDownload } from './file-download';

vi.mock('next/navigation', async () => {
  const original = await vi.importActual('next/navigation');

  return {
    ...original,
    useRouter: () => ({
      push: vi.fn(),
    }),
    useSearchParams: () => new URLSearchParams('page=1'),
  };
});

describe('FileDownload', () => {
  it('renders and triggers download only once', async () => {
    const mockUrl = 'blob:http://example.com/download';
    const mockFilename = 'test-file.csv';
    const mockOnDownloadComplete = vi.fn();

    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => ({}));

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

    linkElement.click();

    await waitFor(() => {
      expect(mockOnDownloadComplete).toHaveBeenCalledTimes(1);
    });

    clickSpy.mockRestore();
  });

  it('does not call onDownloadComplete if it is undefined', () => {
    const mockUrl = 'blob:http://example.com/download';
    const mockFilename = 'test-file.csv';

    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => ({}));

    render(<FileDownload url={mockUrl} filename={mockFilename} />);

    expect(clickSpy).toHaveBeenCalled();

    clickSpy.mockRestore();
  });
});

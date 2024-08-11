import { ReactNode } from 'react';
import { render, waitFor, act } from '@tests/utils';
import { describe, it, expect, vi, beforeAll } from 'vitest';

import { PeopleMockList } from '@tests/mock-data';
import { selectItem, setupStore } from '@store';

import { FileDownloadProps } from './file-download';
import { DownloadItems } from './index';

vi.mock('./file-download', () => ({
  FileDownload: ({ filename, url, onDownloadComplete }: FileDownloadProps): ReactNode => {
    url && onDownloadComplete && null;

    return <div data-testid="file-download">{filename}</div>;
  },
}));

beforeAll(() => {
  global.URL.createObjectURL = vi.fn(() => 'mocked-url');
});

describe('DownloadItems component', () => {
  it('renders download button and it is enabled when not loading', () => {
    const { getByRole } = render(<DownloadItems />);

    const downloadBtn = getByRole('button', { name: /download/i });

    expect(downloadBtn).toBeInTheDocument();
    expect(downloadBtn).toBeEnabled();
  });

  it('disables download button when loading', async () => {
    const store = setupStore();

    const fakeBlob = new Blob(['test'], { type: 'text/csv' });

    global.fetch = vi.fn(
      (): Promise<Response> =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(
              new Response(fakeBlob, {
                status: 200,
                headers: {
                  'Content-Disposition': 'attachment; filename="1_person.csv"',
                },
              })
            );
          }, 500);
        })
    );

    const { getByRole, user } = render(<DownloadItems />, { store });

    const downloadBtn = getByRole('button', { name: /download/i });

    expect(downloadBtn).toBeInTheDocument();
    expect(downloadBtn).toBeEnabled();

    await user.click(downloadBtn);

    await waitFor(() => {
      expect(downloadBtn).toBeInTheDocument();
      expect(downloadBtn).toBeDisabled();
    });
  });

  describe('generates correct filename', () => {
    it('for one selected item', async () => {
      const mockData = PeopleMockList[0];

      const { id } = mockData;

      const store = setupStore();
      act(() => {
        store.dispatch(selectItem(id.toString()));
      });

      const fakeBlob = new Blob(['test'], { type: 'text/csv' });

      global.fetch = vi.fn(() =>
        Promise.resolve(
          new Response(fakeBlob, {
            status: 200,
            headers: {
              'Content-Disposition': 'attachment; filename="1_person.csv"',
            },
          })
        )
      );

      const state = store.getState();
      const { selectedItems } = state.selectedItems;
      const itemsCnt = selectedItems.length;

      await waitFor(() => {
        expect(itemsCnt).toEqual(1);
      });

      const { getByRole, user, getByTestId } = render(<DownloadItems />, { store });

      const downloadBtn = getByRole('button', { name: /download/i });

      expect(downloadBtn).toBeInTheDocument();
      expect(downloadBtn).toBeEnabled();

      await user.click(downloadBtn);

      await waitFor(() => {
        const fileDownload = getByTestId('file-download');

        expect(fileDownload).toBeInTheDocument();
        expect(fileDownload).toHaveTextContent('1_person.csv');
      });
    });

    it('for several selected items', async () => {
      const cntItems = 3;

      const mockData = [...PeopleMockList.slice(-cntItems)];

      const store = setupStore();

      const itemsToSelect = mockData.map(({ id }) => id);

      act(() => {
        itemsToSelect.forEach((id) => {
          store.dispatch(selectItem(id.toString()));
        });
      });

      const state = store.getState();
      const { selectedItems } = state.selectedItems;
      const itemsCnt = selectedItems.length;

      await waitFor(() => {
        expect(itemsCnt).toEqual(itemsToSelect.length);
      });

      const fakeBlob = new Blob(['test'], { type: 'text/csv' });

      global.fetch = vi.fn(() =>
        Promise.resolve(
          new Response(fakeBlob, {
            status: 200,
            headers: {
              'Content-Disposition': `attachment; filename="${cntItems}_people.csv"`,
            },
          })
        )
      );

      const { getByRole, getByTestId, user } = render(<DownloadItems />, { store });

      const downloadBtn = getByRole('button', { name: /download/i });

      expect(downloadBtn).toBeInTheDocument();
      expect(downloadBtn).toBeEnabled();

      await user.click(downloadBtn);

      await waitFor(() => {
        const fileDownload = getByTestId('file-download');

        expect(fileDownload).toBeInTheDocument();
        expect(fileDownload).toHaveTextContent(`${cntItems}_people.csv`);
      });
    });
  });
});

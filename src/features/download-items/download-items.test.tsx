import { ReactNode } from 'react';
import { renderWithRouter, waitFor, act } from '@tests/utils';
import { describe, it, expect, vi } from 'vitest';

import { PeopleMockList } from '@tests/mock-data';
import { selectItem, setupStore } from '@shared/store';
import * as useGetPersonByIdQueries from './hooks';

import { FileDownloadProps } from './file-download';
import { DownloadItems } from './index';

vi.mock('./file-download', () => ({
  FileDownload: ({ filename, data, onDownloadComplete }: FileDownloadProps): ReactNode => {
    data && onDownloadComplete && null;

    return <div data-testid="file-download">{filename}</div>;
  },
}));

describe('DownloadItems component', () => {
  it('renders download button and it is enabled when not loading', () => {
    const useGetPersonByIdQueryMock = vi
      .spyOn(useGetPersonByIdQueries, 'useGetPersonByIdQueries')
      .mockReturnValue({ data: [PeopleMockList[0]], isLoading: false });

    const { getByRole } = renderWithRouter(<DownloadItems />);

    const downloadBtn = getByRole('button', { name: /download/i });

    expect(downloadBtn).toBeInTheDocument();
    expect(downloadBtn).toBeEnabled();

    useGetPersonByIdQueryMock.mockRestore();
  });

  it('disables download button when loading', () => {
    const useGetPersonByIdQueryMock = vi
      .spyOn(useGetPersonByIdQueries, 'useGetPersonByIdQueries')
      .mockReturnValue({ data: [], isLoading: true });

    const { getByRole } = renderWithRouter(<DownloadItems />);

    const downloadBtn = getByRole('button', { name: /download/i });

    expect(downloadBtn).toBeInTheDocument();
    expect(downloadBtn).toBeDisabled();

    useGetPersonByIdQueryMock.mockRestore();
  });

  describe('generates correct filename', () => {
    it('for one selected item', async () => {
      const mockData = PeopleMockList[0];

      const { id } = mockData;

      const store = setupStore();
      act(() => {
        store.dispatch(selectItem(id.toString()));
      });

      const useGetPersonByIdQueryMock = vi
        .spyOn(useGetPersonByIdQueries, 'useGetPersonByIdQueries')
        .mockReturnValue({ data: [mockData], isLoading: false });

      const state = store.getState();
      const { selectedItems } = state.selectedItems;
      const itemsCnt = selectedItems.length;

      await waitFor(() => {
        expect(itemsCnt).toEqual(1);
      });

      const { getByRole, user, getByTestId } = renderWithRouter(<DownloadItems />, { storeOpts: { store } });

      const downloadBtn = getByRole('button', { name: /download/i });

      expect(downloadBtn).toBeInTheDocument();
      expect(downloadBtn).toBeEnabled();

      await user.click(downloadBtn);

      await waitFor(() => {
        const fileDownload = getByTestId('file-download');

        expect(fileDownload).toBeInTheDocument();
        expect(fileDownload).toHaveTextContent('1_person');
      });

      useGetPersonByIdQueryMock.mockRestore();
    });

    it('for several selected items', async () => {
      const cntItems = 3;

      const mockData = [...PeopleMockList.slice(-cntItems)];

      const useGetPersonByIdQueryMock = vi
        .spyOn(useGetPersonByIdQueries, 'useGetPersonByIdQueries')
        .mockReturnValue({ data: mockData, isLoading: false });

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

      const { getByRole, getByTestId, user } = renderWithRouter(<DownloadItems />, { storeOpts: { store } });

      const downloadBtn = getByRole('button', { name: /download/i });

      expect(downloadBtn).toBeInTheDocument();
      expect(downloadBtn).toBeEnabled();

      await user.click(downloadBtn);

      await waitFor(() => {
        const fileDownload = getByTestId('file-download');

        expect(fileDownload).toBeInTheDocument();
        expect(fileDownload).toHaveTextContent(`${cntItems}_people`);
      });

      useGetPersonByIdQueryMock.mockRestore();
    });
  });
});

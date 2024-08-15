import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { URL_PARAM } from '@constants';

interface UseLocationPageReturn {
  page: number;
  setPage: (page: number) => void;
}

const initialPage = 1;

export const useLocationPage = (): UseLocationPageReturn => {
  const { query, push } = useRouter();

  const setPage = useCallback(
    (pageNew: number) => {
      const newQuery = { ...query, [URL_PARAM.PAGE]: pageNew.toString() };

      void push({ query: newQuery }, undefined);
    },
    [query, push]
  );

  const pageStr = (query?.[URL_PARAM.PAGE] ?? '').toString();
  const page = Number.parseInt(pageStr, 10) || initialPage;

  return { page, setPage };
};

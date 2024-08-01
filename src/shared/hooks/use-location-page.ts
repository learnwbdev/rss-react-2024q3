import { URL_PARAM } from '@shared/constants';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

interface UseLocationPageReturn {
  page: number;
  setPage: (page: number) => void;
}

const initialPage = 1;

export const useLocationPage = (): UseLocationPageReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setPage = useCallback(
    (pageNew: number) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(URL_PARAM.PAGE, pageNew.toString());

      setSearchParams(newSearchParams.toString());
    },
    [searchParams, setSearchParams]
  );

  const pageStr = searchParams.get(URL_PARAM.PAGE) ?? '';
  const page = Number.parseInt(pageStr) || initialPage;

  return { page, setPage };
};

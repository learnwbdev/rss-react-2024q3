'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { API_INITIAL_PAGE, URL_PARAM } from '@constants';

interface UseLocationPageReturn {
  page: number;
  setPage: (page: number) => void;
}

export const useLocationPage = (): UseLocationPageReturn => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const setPage = useCallback(
    (pageNew: number) => {
      const newSearchParams = new URLSearchParams(searchParams);

      newSearchParams.set(URL_PARAM.PAGE, pageNew.toString());

      router.push(`/?${newSearchParams.toString()}`);
    },
    [searchParams, router]
  );

  const pageStr = searchParams.get(URL_PARAM.PAGE) ?? API_INITIAL_PAGE;
  const page = Number.parseInt(pageStr, 10);

  return { page, setPage };
};

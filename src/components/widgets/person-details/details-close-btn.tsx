'use client';

import { Button } from '@components/shared/ui';
import { URL_PARAM } from '@constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useCallback } from 'react';

export const DetailsCloseButton = (): ReactNode => {
  const router = useRouter();

  const searchParamsHook = useSearchParams();

  const handleCloseDetails = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParamsHook);

    newSearchParams.delete(URL_PARAM.DETAILS);

    router.push(`/?${newSearchParams.toString()}`);
  }, [searchParamsHook, router]);

  return (
    <div>
      <Button text="Close" onClick={handleCloseDetails} />
    </div>
  );
};

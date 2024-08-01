import { useEffect } from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Person } from '@shared/api';
import { peopleApi, useAppDispatch, useAppSelector } from '@shared/store';

interface UseGetPersonByIdQueriesResult {
  data?: Person[];
  error?: FetchBaseQueryError | SerializedError;
  isLoading: boolean;
}

export const useGetPersonByIdQueries = (ids: string[]): UseGetPersonByIdQueriesResult => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const subscriptions = ids.map((id) => {
      return dispatch(peopleApi.endpoints.getPersonById.initiate(id));
    });
    return (): void => {
      subscriptions.forEach((subscr) => {
        subscr.unsubscribe();
      });
    };
  }, [dispatch, ids]);

  const combinedResults = useAppSelector((state) => {
    return ids.map((id) => {
      return peopleApi.endpoints.getPersonById.select(id)(state);
    });
  });

  const isLoading = combinedResults.some((result) => result.isLoading);

  const error = combinedResults.find((result) => result.error)?.error;

  const data =
    !isLoading && !error
      ? combinedResults.map((result) => result.data).filter((data) => typeof data !== 'undefined')
      : undefined;

  return { data, error, isLoading };
};

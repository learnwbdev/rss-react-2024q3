import { useEffect } from 'react';
import { createSelector, SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Person } from '@shared/api';
import { peopleApi, useAppDispatch, useAppSelector, RootState } from '@shared/store';

interface UseGetPersonByIdQueriesResult {
  data?: Person[];
  error?: FetchBaseQueryError | SerializedError;
  isLoading: boolean;
}

const selectPersonById = (state: RootState, id: string) => {
  return peopleApi.endpoints.getPersonById.select(id)(state);
};

const getSelectCombinedResults = () =>
  createSelector(
    (state: RootState): RootState => state,
    (_, ids: string[]): string[] => ids,
    (state: RootState, ids: string[]) => ids.map((id) => selectPersonById(state, id))
  );

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

  const selectCombinedResults = getSelectCombinedResults();

  const combinedResults = useAppSelector((state) => selectCombinedResults(state, ids));

  const isLoading = combinedResults.some((result) => result.isLoading);

  const error = combinedResults.find((result) => result.error)?.error;

  const data =
    !isLoading && !error
      ? combinedResults.map((result) => result.data).filter((data) => typeof data !== 'undefined')
      : undefined;

  return { data, error, isLoading };
};

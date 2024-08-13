import { CombinedState, createApi, fetchBaseQuery, EndpointDefinitions } from '@reduxjs/toolkit/query/react';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../store';
import { ApiPeople, ApiPerson, People, Person } from '@app-types/person';
import { convertPeople, convertPerson } from '@utils';

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export const peopleApi = createApi({
  reducerPath: 'peopleApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  extractRehydrationInfo(action, { reducerPath }): CombinedState<EndpointDefinitions, string, 'peopleApi'> | undefined {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getPeople: builder.query<People, { page: number; searchTerm?: string }>({
      query: ({ page, searchTerm: search }) => ({
        url: 'people/',
        params: {
          page,
          search,
        },
      }),
      transformResponse: (response: ApiPeople) => {
        const { count, results } = response;

        const itemsPerPage = 10;
        const totalPages = Math.ceil(count / itemsPerPage);

        return { totalPages, results: convertPeople(results) };
      },
    }),
    getPersonById: builder.query<Person, string>({
      query: (id: string) => `people/${id}`,
      keepUnusedDataFor: 120 * 60,
      transformResponse: (response: ApiPerson) => convertPerson(response),
    }),
  }),
});

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiPeople, ApiPerson, convertPeople, convertPerson, People, Person } from '@shared/api';

export const peopleApi = createApi({
  reducerPath: 'peopleApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
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
      transformResponse: (response: ApiPerson) => convertPerson(response),
    }),
  }),
});

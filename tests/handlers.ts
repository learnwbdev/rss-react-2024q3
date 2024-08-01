import { http, HttpResponse, delay } from 'msw';
import { ApiPeopleMockList } from './mock-data';

export const handlers = [
  http.get('https://swapi.dev/api/people', ({ request }) => {
    const url = new URL(request.url);

    const pageStr = url.searchParams.get('page');
    const search = url.searchParams.get('search');

    const filteredPeople = search
      ? ApiPeopleMockList.filter((person) => person.name.toLowerCase().includes(search?.toLowerCase() ?? ''))
      : null;

    const results = filteredPeople ?? ApiPeopleMockList;

    const resultsPerPage = 10;
    const page = Number(pageStr);

    const paginatedPeople = results.slice((page - 1) * resultsPerPage, page * resultsPerPage);

    return HttpResponse.json({ count: results.length, results: paginatedPeople });
  }),
  http.get('https://swapi.dev/api/people/:id', ({ params }) => {
    const { id } = params;

    if (!id || typeof id !== 'string' || isNaN(parseInt(id, 10)) || parseInt(id, 10) <= 0) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Incorrect id parameter',
      });
    }

    const idx = parseInt(id, 10);

    const data = ApiPeopleMockList?.[idx - 1];

    if (data) {
      return HttpResponse.json(data);
    } else {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Not Found',
      });
    }
  }),
];

export const delayedHandler = http.get('https://swapi.dev/api/people/:id', async ({ params }) => {
  const { id } = params;

  if (!id || typeof id !== 'string' || isNaN(parseInt(id, 10)) || parseInt(id, 10) <= 0) {
    return new HttpResponse(null, {
      status: 404,
      statusText: 'Incorrect id parameter',
    });
  }

  const idx = parseInt(id, 10);

  const data = ApiPeopleMockList?.[idx - 1];

  await delay();

  if (data) {
    return HttpResponse.json(data);
  } else {
    return new HttpResponse(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }
});

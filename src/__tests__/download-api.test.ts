import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { mswServer } from '@tests/msw-server';
import { NextRequest } from 'next/server';
import { API_URL } from '@constants';
import { ApiPeopleMockList, PeopleCsvList } from '@tests/mock-data';
import { ApiPerson } from '@app-types';
import { GET as downloadCsv } from '@app/api/download/route';

const ROUTE_URL = 'http://localhost/api/download';

describe('API Route: download', () => {
  it('returns a CSV string for valid ids', async () => {
    const mockData = PeopleCsvList.slice(0, 3);
    const ids = mockData.map(({ id }) => id).join(',');

    const url = new URL(`${ROUTE_URL}?ids=${ids}`);
    const req = new NextRequest(url);

    const res = await downloadCsv(req);

    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toBe('text/csv');

    const resText = await res.text();

    mockData.forEach(({ csvStr }) => {
      expect(resText).toContain(csvStr);
    });
  });

  it('returns 400 if ids parameter is missing', async () => {
    const url = new URL(ROUTE_URL);
    const req = new NextRequest(url);

    const res = await downloadCsv(req);

    expect(res.status).toBe(400);

    const resText = await res.text();
    expect(resText).toEqual(JSON.stringify({ error: 'Missing or invalid ids parameter' }));
  });

  it('returns 500 for an invalid ids', async () => {
    const ids = 'invalid';

    const url = new URL(`${ROUTE_URL}?ids=${ids}`);
    const req = new NextRequest(url);

    const res = await downloadCsv(req);

    expect(res.status).toBe(500);

    const resText = await res.text();
    expect(resText).toEqual(JSON.stringify({ error: 'Failed to generate CSV' }));
  });

  it('returns 400 for an invalid API response', async () => {
    const mockData: Partial<ApiPerson> = ApiPeopleMockList[0];

    delete mockData.height;

    mswServer.use(http.get(`${API_URL}/:id`, () => HttpResponse.json(mockData)));

    const ids = '1';

    const url = new URL(`${ROUTE_URL}?ids=${ids}`);
    const req = new NextRequest(url);

    const res = await downloadCsv(req);

    expect(res.status).toBe(400);

    const resText = await res.text();
    expect(resText).toEqual(JSON.stringify({ error: 'Invalid response' }));
  });

  it('handles server errors gracefully', async () => {
    mswServer.use(
      http.get(
        `${API_URL}/:id`,
        () =>
          new HttpResponse(null, {
            status: 500,
            statusText: 'Internal Server Error',
          })
      )
    );

    const ids = '1,2,3';

    const url = new URL(`${ROUTE_URL}?ids=${ids}`);
    const req = new NextRequest(url);

    const res = await downloadCsv(req);

    expect(res.status).toBe(500);

    const resText = await res.text();
    expect(resText).toEqual(JSON.stringify({ error: 'Failed to generate CSV' }));
  });
});

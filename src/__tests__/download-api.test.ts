import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { mswServer } from '@tests/msw-server';
import { createMocks } from 'node-mocks-http';
import { API_URL } from '@constants';
import { ApiPeopleMockList, PeopleCsvList } from '@tests/mock-data';
import handler from '@pages/api/download';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiPerson } from '@app-types/person';

describe('API Route: download', () => {
  it('returns a CSV string for valid ids', async () => {
    const mockData = PeopleCsvList.slice(0, 3);

    const ids = mockData.map(({ id }) => id).join(',');

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: {
        ids,
      },
    });

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getHeaders()['content-type']).toBe('text/csv');

    mockData.forEach(({ csvStr }) => {
      expect(res._getData()).toContain(csvStr);
    });
  });

  it('returns 400 if ids parameter is missing', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
    });

    await handler(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._getData()).toEqual(JSON.stringify({ error: 'Missing or invalid ids parameter' }));
  });

  it('returns 500 for an invalid ids', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: {
        ids: 'invalid',
      },
    });

    await handler(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._getData()).toEqual(JSON.stringify({ error: 'Failed to generate CSV' }));
  });

  it('returns 400 for an invalid API response', async () => {
    const mockData: Partial<ApiPerson> = ApiPeopleMockList[0];

    delete mockData.height;

    mswServer.use(http.get(`${API_URL}:id`, () => HttpResponse.json(mockData)));

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: {
        ids: '1',
      },
    });

    await handler(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._getData()).toEqual(JSON.stringify({ error: 'Invalid response' }));
  });

  it('handles server errors gracefully', async () => {
    mswServer.use(
      http.get(
        `${API_URL}:id`,
        () =>
          new HttpResponse(null, {
            status: 500,
            statusText: 'Internal Server Error',
          })
      )
    );

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: {
        ids: '1,2,3',
      },
    });

    await handler(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._getData()).toEqual(JSON.stringify({ error: 'Failed to generate CSV' }));
  });
});

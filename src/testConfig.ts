import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { mswServer } from '@tests/msw-server';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';

beforeAll(() => mswServer.listen({ onUnhandledRequest: 'error' }));

afterAll(() => mswServer.close());

afterEach(() => {
  cleanup();
  vi.clearAllTimers();
  vi.clearAllMocks();
  mswServer.resetHandlers();
});

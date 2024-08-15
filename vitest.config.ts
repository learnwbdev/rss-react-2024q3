/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/testConfig.ts'],
    coverage: {
      provider: 'istanbul',
    },
  },
});

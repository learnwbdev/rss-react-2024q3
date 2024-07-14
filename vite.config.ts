/// <reference types="vitest" />

import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr({ svgrOptions: { exportType: 'default', ref: true, svgo: false, titleProp: true }, include: '**/*.svg' }),
    dts(),
    react(),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/testConfig.ts'],
    coverage: {
      provider: 'istanbul',
    },
  },
});

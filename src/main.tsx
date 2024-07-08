import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@app';
import { ErrorBoundary } from '@shared/utils';
import { ErrorFallback } from '@shared/ui';
import 'modern-normalize';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorFallback />}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

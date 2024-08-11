import 'modern-normalize';
import '@styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@store';
import { ThemeProvider } from '@shared/contexts';
import { Layout } from '@components/layout';
import { ErrorFallback } from '@shared/ui';
import { ErrorBoundary } from '@utils';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <div className="app">
          <Layout>
            <ErrorBoundary fallback={<ErrorFallback />}>
              <Component {...pageProps} />
            </ErrorBoundary>
          </Layout>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

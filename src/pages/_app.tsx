import 'modern-normalize';
import '@styles/globals.css';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { store } from '@store';
import { ThemeProvider } from '@shared/contexts';
import { Layout } from '@components/layout';
import { ErrorFallback } from '@shared/ui';
import { ErrorBoundary } from '@utils';
import { Loader } from '@shared/ui';

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleComplete);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <div className="app">
          <Layout>
            <ErrorBoundary fallback={<ErrorFallback />}>
              {isLoading ? (
                <div className="page-loader">
                  <Loader />
                </div>
              ) : (
                <Component {...pageProps} />
              )}
            </ErrorBoundary>
          </Layout>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

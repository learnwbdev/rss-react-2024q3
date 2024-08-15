import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'modern-normalize';
import './globals.css';
import { ThemeProvider } from '@shared/contexts';
import { ThemeToggleBtn } from '@widgets';
import { ErrorBoundary } from '@utils';
import { LayoutWithTheme } from './layout-with-theme';
import { LayoutWithFlyout } from './layout-with-flyout';
import StoreProvider from './store-provider';
import ErrorFallback from './error';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'React Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <ThemeProvider>
            <ErrorBoundary fallback={<ErrorFallback />}>
              <div className="app">
                <LayoutWithTheme>
                  <ThemeToggleBtn />
                  <main className="page">
                    <LayoutWithFlyout>{children}</LayoutWithFlyout>
                  </main>
                </LayoutWithTheme>
              </div>
            </ErrorBoundary>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

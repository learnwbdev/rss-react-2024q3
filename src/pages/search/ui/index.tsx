import { ReactNode, useState, useCallback } from 'react';
import { SearchInput } from '@widgets/search-input';
import { SearchResults } from './search-results';
import { ErrorSection } from './error-section';
import { Result } from '@shared/api';
import { Loader } from '@shared/ui';
import { ErrorBoundary } from '@shared/utils';
import { ErrorFallback } from '@shared/ui';
import { getSearchResult } from '@features/search';
import styles from './styles.module.css';

interface SearchResultState {
  results: Result[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

const defaultResult = {
  results: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const SearchPage = (): ReactNode => {
  const [result, setResult] = useState<SearchResultState>(defaultResult);

  const { results, isLoading, isError } = result;

  const handleSearch = useCallback(
    (searchTerm: string): void => {
      setResult((prev) => ({ ...prev, isLoading: true }));

      getSearchResult(searchTerm)
        .then((results) => {
          setResult({ results, isLoading: false, isError: false, error: null });
        })
        .catch((err: unknown) => {
          const error = err instanceof Error ? err : new Error('Unknown Api Error');

          setResult({ results: [], isLoading: false, isError: true, error });
        });
    },
    [setResult]
  );

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <main className={styles.page}>
        <h1 className={styles.visually_hidden}>React Routing</h1>
        <section className={styles.section}>
          <SearchInput onSearch={handleSearch} disabled={isLoading} />
        </section>
        <section className={styles.section}>
          {isLoading ? <Loader /> : isError ? <div>Api Error</div> : <SearchResults results={results} />}
        </section>
        <ErrorSection />
      </main>
    </ErrorBoundary>
  );
};

import { Component } from 'react';
import { SearchInput } from '@widgets/search-input';
import { SearchResults } from './search-results';
import { ErrorSection } from './error-section';
import { Result } from '@shared/api';
import styles from './styles.module.css';
import { Loader } from '@shared/ui';
import { getSearchResult } from '@features/search';

interface SearchPageState {
  results: Result[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export class SearchPage extends Component<Record<string, never>, SearchPageState> {
  state = { results: [], isLoading: false, isError: false, error: null };

  handleSearch = (searchTerm: string): void => {
    this.setState({ isLoading: true });

    getSearchResult(searchTerm)
      .then((results) => {
        this.setState({ results, isLoading: false, isError: false, error: null });
      })
      .catch((err: unknown) => {
        const error = err instanceof Error ? err : new Error('Unknown Api Error');

        this.setState({ results: [], isLoading: false, isError: true, error });
      });
  };

  render(): React.ReactNode {
    return (
      <main className={styles.page}>
        <h1 className={styles.visually_hidden}>Class Components</h1>
        <section className={styles.section}>
          <SearchInput onSearch={this.handleSearch} disabled={this.state.isLoading} />
        </section>
        <section className={styles.section}>
          {this.state.isLoading ? (
            <Loader />
          ) : this.state.isError ? (
            <div>Api Error</div>
          ) : (
            <SearchResults results={this.state.results} />
          )}
        </section>
        <ErrorSection />
      </main>
    );
  }
}

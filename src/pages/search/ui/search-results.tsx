import { SearchResult } from '@widgets/search-result';
import { Result } from '@shared/api';
import { Component } from 'react';
import styles from './styles.module.css';

interface SearchResultsProps {
  results: Result[];
}

export class SearchResults extends Component<SearchResultsProps> {
  render(): React.ReactNode {
    return this.props.results.length === 0 ? (
      <div>No results found</div>
    ) : (
      <div className={styles.results}>
        {this.props.results.map(({ id, name, description }) => (
          <SearchResult key={id} name={name} description={description} />
        ))}
      </div>
    );
  }
}

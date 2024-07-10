import { Component } from 'react';
import styles from './styles.module.css';

export interface SearchResultProps {
  name: string;
  description: string;
}

export class SearchResult extends Component<SearchResultProps> {
  render(): React.ReactNode {
    return (
      <div className={styles.search_result}>
        <h2>{this.props.name}</h2>
        <p>{this.props.description}</p>
      </div>
    );
  }
}

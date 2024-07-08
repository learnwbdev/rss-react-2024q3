import { Component } from 'react';
import { Input, Button } from '@shared/ui';
import styles from './styles.module.css';

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
  disabled: boolean;
}

interface SearchInputState {
  searchTerm: string;
}

export class SearchInput extends Component<SearchInputProps, SearchInputState> {
  state = { searchTerm: '' };

  saveSearchTerm = (): void => {
    localStorage.setItem('searchTerm', JSON.stringify(this.state.searchTerm));
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    this.setState({ searchTerm: value.trim() });
  };

  componentDidMount(): void {
    const localStVal = localStorage.getItem('searchTerm');

    if (!localStVal) {
      this.props.onSearch(this.state.searchTerm);
      return;
    }

    const searchTerm: unknown = JSON.parse(localStVal);

    if (typeof searchTerm === 'string') {
      this.setState({ searchTerm });
      this.props.onSearch(searchTerm);
    }
  }

  render(): React.ReactNode {
    return (
      <div className={styles.search_input}>
        <Input
          name="search"
          label="Search"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
          disabled={this.props.disabled}
        />
        <div>
          <Button
            text="Search"
            onClick={() => {
              this.saveSearchTerm();
              this.props.onSearch(this.state.searchTerm);
            }}
            disabled={this.props.disabled}
          />
        </div>
      </div>
    );
  }
}

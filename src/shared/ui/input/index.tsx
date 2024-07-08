import { Component } from 'react';
import styles from './input.module.css';

interface InputProps {
  name: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler;
}

export class Input extends Component<InputProps> {
  render(): React.ReactNode {
    return (
      <label className={styles.label}>
        <span className={styles.label_text}>{`${this.props.label}:`}</span>
        <input
          type="text"
          name={this.props.name}
          className={styles.input}
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </label>
    );
  }
}

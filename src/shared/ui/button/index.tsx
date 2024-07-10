import { Component } from 'react';
import styles from './button.module.css';

interface ButtonProps {
  text: string;
  onClick: React.MouseEventHandler;
  disabled?: boolean;
}

export class Button extends Component<ButtonProps> {
  render(): React.ReactNode {
    return (
      <button type="button" className={styles.btn} onClick={this.props.onClick} disabled={this.props.disabled}>
        {this.props.text}
      </button>
    );
  }
}

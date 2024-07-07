import { Component } from 'react';
import styles from './loader.module.css';

export class Loader extends Component {
  render(): React.ReactNode {
    return <div className={styles.loader}></div>;
  }
}

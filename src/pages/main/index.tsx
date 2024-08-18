import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '@constants';
import styles from './styles.module.css';

export const MainPage = (): ReactNode => {
  return (
    <main className="main_container">
      <h1 className={styles.heading}>Main Page</h1>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to={PATH.UNCONTROLLED_FORM} className="link">
              Go to Uncontrolled Form
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to={PATH.HOOK_FORM} className="link">
              Go to Hook Form
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  );
};

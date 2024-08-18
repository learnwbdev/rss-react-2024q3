import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

export const NotFoundPage = (): ReactNode => {
  return (
    <main className="main-container">
      <h1 className={styles.heading}>404 - Page Not Found</h1>
      <p className={styles.text}>The page you are looking for does not exist.</p>
      <div className={styles.link}>
        <Link to="/" className="link">
          Return to Main Page
        </Link>
      </div>
    </main>
  );
};

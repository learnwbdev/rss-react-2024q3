import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '@constants';
import { useAppSelector } from '@store';
import { Tile } from '@components';
import styles from './styles.module.css';

export const MainPage = (): ReactNode => {
  const {
    forms: { uncontrolled: uncontrolledForm, hook: hookForm },
  } = useAppSelector((state) => state.forms);

  return (
    <main className="main-container">
      <h1 className={styles.heading}>Main Page</h1>
      <div className="wrapper">
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
        <section className={styles.tilesContainer}>
          <Tile heading="Uncontrolled Form Data" form={uncontrolledForm} />
          <Tile heading="Hook Form Data" form={hookForm} />
        </section>
      </div>
    </main>
  );
};

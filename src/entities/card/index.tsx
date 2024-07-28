import { ReactNode, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PersonBrief } from '@shared/api';
import { URL_PARAM } from '@shared/constants';
import styles from './styles.module.css';

export interface CardProps {
  personBrief: PersonBrief;
}

export const Card = ({ personBrief }: CardProps): ReactNode => {
  const [, setSearchParams] = useSearchParams();

  const { id, name, height } = personBrief;

  const setDetails = useCallback(
    (personId: string) =>
      setSearchParams((prev) => {
        prev.set(URL_PARAM.DETAILS, personId);
        return prev;
      }),
    [setSearchParams]
  );

  const handleOpenDetails = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    e.stopPropagation();
    setDetails(id);
  };

  return (
    <div className={styles.card} onClick={handleOpenDetails}>
      <h2>{name}</h2>
      <p>{`Height: ${height}`}</p>
    </div>
  );
};

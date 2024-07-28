import { ReactNode, useState, useEffect, useCallback } from 'react';
import { Person } from '@shared/api';
import { useSearchParams } from 'react-router-dom';
import { getPerson } from '@features/get-person';
import { Button, Loader } from '@shared/ui';
import { URL_PARAM } from '@shared/constants';
import styles from './styles.module.css';

export const DetailedCard = (): ReactNode => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);

  const [result, setResult] = useState<Person | null>(null);

  const personId = searchParams.get('details') ?? '';

  const handleClose = useCallback(() => {
    setSearchParams((prev) => {
      prev.delete(URL_PARAM.DETAILS);
      return prev;
    });
  }, [setSearchParams]);

  useEffect(() => {
    if (!personId) return;

    setIsLoading(true);

    getPerson(personId)
      .then((data: Person) => setResult(data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [personId]);

  if (!personId || !result) return null;

  const { name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender } = result;

  return (
    <div className={styles.detailed_card}>
      {isLoading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        <>
          <div className={styles.details}>
            <h2 className={styles.details_title}>{name}</h2>
            <p>{`Gender: ${gender}`}</p>
            <p>{`Birth year: ${birthYear}`}</p>
            <p>{`Height: ${height}`}</p>
            <p>{`Mass: ${mass}`}</p>
            <p>{`Hair color: ${hairColor}`}</p>
            <p>{`Skin color: ${skinColor}`}</p>
            <p>{`Eye color: ${eyeColor}`}</p>
          </div>
          <div>
            <Button text="Close" onClick={handleClose} />
          </div>
        </>
      )}
    </div>
  );
};

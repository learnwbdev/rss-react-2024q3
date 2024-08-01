import { ReactNode, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { peopleApi } from '@shared/store';
import { Button, Loader } from '@shared/ui';
import { URL_PARAM } from '@shared/constants';
import styles from './styles.module.css';

export const DetailedCard = (): ReactNode => {
  const [searchParams, setSearchParams] = useSearchParams();

  const personId = searchParams.get('details') ?? '';

  const { data, isFetching } = peopleApi.useGetPersonByIdQuery(personId, {
    skip: !personId,
  });

  const handleClose = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete(URL_PARAM.DETAILS);

    setSearchParams(newSearchParams.toString());
  }, [searchParams, setSearchParams]);

  if (!personId) return null;

  if (isFetching || !data)
    return (
      <div className={styles.detailed_card}>
        <div className={styles.loader}>
          <Loader />
        </div>
      </div>
    );

  const { name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender } = data;

  return (
    <div className={styles.detailed_card}>
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
    </div>
  );
};

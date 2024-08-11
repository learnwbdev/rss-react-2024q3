import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@shared/ui';
import { URL_PARAM } from '@constants';
import { Person } from '@app-types/person';
import styles from './styles.module.css';

interface DetailedCard {
  person?: Person;
}

export const DetailedCard = ({ person }: DetailedCard): ReactNode => {
  const router = useRouter();

  if (!person) return null;

  const { name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender } = person;

  const handleClose = () => {
    const { [URL_PARAM.DETAILS]: _, ...newQuery } = router.query;

    void router.push({
      pathname: router.pathname,
      query: { ...newQuery },
    });
  };

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

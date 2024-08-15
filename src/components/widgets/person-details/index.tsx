import { JSX } from 'react';
import { fetchPerson } from '@api';
import { DetailsCloseButton } from './details-close-btn';
import styles from './styles.module.css';

interface PersonDetailsProps {
  personId: string;
}

export const PersonDetails = async ({ personId }: PersonDetailsProps): Promise<JSX.Element | null> => {
  const { personDetail, error } = await fetchPerson({ personId });

  if (!personDetail) return <div>{error?.message}</div>;

  const { name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender } = personDetail;

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
      <DetailsCloseButton />
    </div>
  );
};

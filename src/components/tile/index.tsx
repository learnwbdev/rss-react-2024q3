import { ReactNode } from 'react';
import { FormFields } from '@types';
import styles from './styles.module.css';

interface TileProps {
  heading: string;
  data: FormFields;
  isDataFresh: boolean;
}

export const Tile = ({ heading, data, isDataFresh }: TileProps): ReactNode => {
  const { name, age, email, password, confirmPassword, gender, termsAccepted, imageBase64, country } = data;

  const fields = [
    { key: 'name', label: 'Name', value: name },
    { key: 'age', label: 'Age', value: age },
    { key: 'email', label: 'Email', value: email },
    { key: 'password', label: 'Password', value: password },
    { key: 'confirmPassword', label: 'Confirm Password', value: confirmPassword },
    { key: 'gender', label: 'Gender', value: gender },
    { key: 'termsAccepted', label: 'Terms and Conditions Accepted', value: termsAccepted ? 'Yes' : 'No' },
    { key: 'country', label: 'Country', value: country },
  ];

  return (
    <div className={`${styles.tile} ${isDataFresh ? styles.isFreshData : ''}`}>
      <div className={styles.content}>
        <h2 className={styles.heading}>{heading}</h2>
        {fields.map(({ key, label, value }) => (
          <p key={key} className={styles.line}>
            <span className={styles.textBold}>{`${label}:`}</span>
            <span className={styles.text}>{value}</span>
          </p>
        ))}
        {imageBase64 && (
          <div className={styles.imageContainer}>
            <img src={imageBase64} alt="Uploaded preview" className={styles.image} />{' '}
          </div>
        )}
      </div>
    </div>
  );
};

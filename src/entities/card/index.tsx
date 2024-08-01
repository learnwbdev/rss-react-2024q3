import { ReactNode, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PersonBrief } from '@shared/api';
import { URL_PARAM } from '@shared/constants';
import { peopleApi, toggleSelectedItem, useAppDispatch, useAppSelector } from '@shared/store';
import styles from './styles.module.css';

export interface CardProps {
  personBrief: PersonBrief;
}

export const Card = ({ personBrief }: CardProps): ReactNode => {
  const { id, name, height } = personBrief;

  const [searchParams, setSearchParams] = useSearchParams();

  const { selectedItems } = useAppSelector((store) => store.selectedItems);

  const { refetch } = peopleApi.endpoints.getPersonById.useQuerySubscription(id);

  const isSelected = selectedItems.includes(id);

  const dispatch = useAppDispatch();

  const setDetails = useCallback(
    (personId: string) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(URL_PARAM.DETAILS, personId);

      setSearchParams(newSearchParams.toString());
    },
    [searchParams, setSearchParams]
  );

  const handleOpenDetails = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    e.stopPropagation();
    setDetails(id);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.stopPropagation();
    dispatch(toggleSelectedItem(id));

    const { target } = event;

    if (target.checked) {
      void refetch();
    }
  };

  const handleCheckboxClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    e.stopPropagation();
  };

  return (
    <div className={styles.card_cntr}>
      <div className={styles.select_card} onClick={handleCheckboxClick}>
        <label className="visually_hidden" htmlFor={`select-${id}`}>
          {`Select card with name ${name} and id ${id}`}
        </label>
        <input
          className={styles.input}
          type="checkbox"
          name={`select-${id}`}
          id={`select-${id}`}
          checked={isSelected}
          onChange={handleSelect}
        />
      </div>
      <div className={styles.card} onClick={handleOpenDetails}>
        <h2>{name}</h2>
        <p>{`Height: ${height}`}</p>
      </div>
    </div>
  );
};

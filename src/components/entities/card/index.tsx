import { ReactNode, useCallback } from 'react';
import { useRouter } from 'next/router';
import { PersonBrief } from '@app-types/person';
import { URL_PARAM } from '@constants';
import { selectItem, unselectItem, useAppDispatch, useAppSelector } from '@store';
import styles from './styles.module.css';

export interface CardProps {
  personBrief: PersonBrief;
}

export const Card = ({ personBrief }: CardProps): ReactNode => {
  const { id, name, height } = personBrief;

  const { query, push } = useRouter();

  const { selectedItems } = useAppSelector((store) => store.selectedItems);

  const isSelected = selectedItems.includes(id);

  const dispatch = useAppDispatch();

  const setDetails = useCallback(
    (personId: string) => {
      const newQuery = { ...query, [URL_PARAM.DETAILS]: personId };

      void push({ query: newQuery });
    },
    [query, push]
  );

  const handleOpenDetails = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    e.stopPropagation();
    setDetails(id);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.stopPropagation();

    const { target } = event;

    if (target.checked) {
      dispatch(selectItem(id));
    } else {
      dispatch(unselectItem(id));
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

'use client';

import { ReactNode, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PersonBrief } from '@app-types';
import { URL_PARAM } from '@constants';
import { selectItem, unselectItem } from '@lib-features/selected-items';
import { useAppDispatch, useAppSelector } from '@hooks';
import styles from './styles.module.css';

export interface CardProps {
  personBrief: PersonBrief;
}

export const Card = ({ personBrief }: CardProps): ReactNode => {
  const { id, name, height } = personBrief;

  const router = useRouter();

  const searchParams = useSearchParams();

  const { selectedItems } = useAppSelector((store) => store.selectedItems);

  const isSelected = selectedItems.includes(id);

  const dispatch = useAppDispatch();

  const setDetails = useCallback(
    (personId: string) => {
      const newSearchParams = new URLSearchParams(searchParams);

      newSearchParams.set(URL_PARAM.DETAILS, personId);

      router.push(`/?${newSearchParams.toString()}`);
    },
    [searchParams, router]
  );

  const handleOpenDetails = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    event.stopPropagation();
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

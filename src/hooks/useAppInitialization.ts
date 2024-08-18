import { useEffect } from 'react';
import { setCountries, useAppDispatch } from '@store';
import { countries } from '@data';

export const useAppInitialization = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCountries(countries));
  }, [dispatch]);
};

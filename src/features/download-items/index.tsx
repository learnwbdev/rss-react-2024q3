import { ReactNode } from 'react';
import { useAppSelector } from '@shared/store';
import { Button } from '@shared/ui';
import { Person } from '@shared/api';
import { exportCsv } from './utils';

export const DownloadItems = (): ReactNode => {
  const { selectedItems } = useAppSelector((store) => store.selectedItems);

  const selectedCnt = selectedItems.length;

  const data: Person[] = [
    {
      id: '1',
      url: '1',
      name: 'Geeks',
      height: '45',
      mass: '45',
      hairColor: 'brown',
      skinColor: 'white',
      eyeColor: 'blue',
      birthYear: '234612',
      gender: 'male',
    },
    {
      id: '2',
      url: '2',
      name: 'Geeks',
      height: '45',
      mass: '45',
      hairColor: 'brown',
      skinColor: 'white',
      eyeColor: 'blue',
      birthYear: '234612',
      gender: 'male',
    },
  ];

  const handleDownload = (): void => {
    const filename = `${selectedCnt}_${selectedCnt === 1 ? 'person' : 'people'}`;
    exportCsv(filename, data);
  };

  return <Button text="Download" onClick={handleDownload} />;
};

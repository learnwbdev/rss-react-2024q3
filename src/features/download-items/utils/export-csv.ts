import { Person } from '@shared/api';
import { createCsvString } from './create-csv-string';

export const exportCsv = (filename: string, data: Person[]): void => {
  const csvString = createCsvString(data);

  const blob = new Blob([csvString], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.csv`;

  a.click();
};

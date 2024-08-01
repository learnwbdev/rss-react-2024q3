import { Person } from '@shared/api';
import { getQuotedValue } from './get-quoted-value';
import { isObjKey } from '@shared/utils';

export const createCsvString = (data: Person[]): string => {
  if (data.length < 1) return '';

  const csvRows = [];

  const headers = Object.keys(data[0]).join(',');

  csvRows.push(headers);

  data.forEach((person) => {
    const rowStr: string[] = [];

    Object.keys(person).forEach((key) => {
      if (isObjKey(person, key)) {
        const keyVal = person[key].toString();
        rowStr.push(getQuotedValue(keyVal));
      }
    });

    if (rowStr.length > 0) csvRows.push(rowStr.join(','));
  });

  return csvRows.join('\r\n');
};

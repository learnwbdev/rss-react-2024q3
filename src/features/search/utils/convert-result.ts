import { v4 as uuidv4 } from 'uuid';
import { Result } from '@shared/api';
import { ApiResult } from '../types';

export const convertResult = (results: ApiResult[]): Result[] => {
  return results.map((result) => {
    const converted: Result = {
      id: uuidv4(),
      name: result.name,
      description: `Height: ${result.height}`,
    };

    return converted;
  });
};

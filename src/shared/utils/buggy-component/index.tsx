import { ReactNode } from 'react';

export const BuggyComponent = (): ReactNode => {
  throw new Error('Error for Error Boundary Check');
  return;
};

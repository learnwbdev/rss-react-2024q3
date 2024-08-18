import { ReactNode } from 'react';
import { useAppInitialization } from '@hooks';

export const App = (): ReactNode => {
  useAppInitialization();

  return <div>Forms</div>;
};

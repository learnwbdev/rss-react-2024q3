import { ReactNode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@routes/router';
import { useAppInitialization } from '@hooks';

export const App = (): ReactNode => {
  useAppInitialization();

  return <RouterProvider router={router} />;
};

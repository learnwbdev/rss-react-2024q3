import { ReactNode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export const App = (): ReactNode => {
  return <RouterProvider router={router} />;
};

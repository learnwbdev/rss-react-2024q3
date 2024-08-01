import { ReactNode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useTheme } from '@shared/contexts';
import { router } from './router';

export const App = (): ReactNode => {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <RouterProvider router={router} />
    </div>
  );
};

import { createBrowserRouter } from 'react-router-dom';
import { SearchPage } from '@pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SearchPage />,
  },
]);

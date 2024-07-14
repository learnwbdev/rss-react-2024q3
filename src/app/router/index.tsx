import { createBrowserRouter } from 'react-router-dom';
import { SearchPage, NotFoundPage } from '@pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SearchPage />,
    errorElement: <NotFoundPage />,
  },
]);

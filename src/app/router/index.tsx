import { createBrowserRouter } from 'react-router-dom';
import { MainPage, NotFoundPage } from '@pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <NotFoundPage />,
  },
]);

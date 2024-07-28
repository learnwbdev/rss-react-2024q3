import { createBrowserRouter } from 'react-router-dom';
import { MainPage, NotFoundPage } from '@pages';
import { Root } from './root';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
    ],
  },
]);

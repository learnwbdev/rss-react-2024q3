import { createBrowserRouter } from 'react-router-dom';
import { MainPage, NotFoundPage } from '@pages';
import { DetailedCard } from '@widgets/detailed-card';
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
        children: [
          {
            index: true,
            element: <DetailedCard />,
          },
        ],
      },
    ],
  },
]);

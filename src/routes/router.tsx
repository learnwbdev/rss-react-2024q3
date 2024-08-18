import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { MainPage, HookFormPage, UncontrolledFormPage, NotFoundPage } from '@pages';
import { PATH } from '@constants';

export const routes: RouteObject[] = [
  {
    path: PATH.MAIN,
    element: <MainPage />,
  },
  {
    path: PATH.UNCONTROLLED_FORM,
    element: <UncontrolledFormPage />,
  },
  {
    path: PATH.HOOK_FORM,
    element: <HookFormPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export const router = createBrowserRouter(routes);

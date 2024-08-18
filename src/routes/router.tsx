import { createBrowserRouter } from 'react-router-dom';
import { MainPage, HookFormPage, UncontrolledFormPage, NotFoundPage } from '@pages';
import { PATH } from '@constants';

export const router = createBrowserRouter([
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
]);

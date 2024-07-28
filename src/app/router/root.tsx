import { ThemeToggleBtn } from '@widgets/theme-toggle-btn';
import { Outlet } from 'react-router-dom';

export const Root = (): React.ReactNode => {
  return (
    <>
      <ThemeToggleBtn />
      <Outlet />
    </>
  );
};

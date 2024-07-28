import { ThemeToggleBtn } from '@widgets/theme-toggle-btn';
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

export const Root = (): ReactNode => {
  return (
    <>
      <ThemeToggleBtn />
      <Outlet />
    </>
  );
};

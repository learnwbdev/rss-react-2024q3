import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeToggleBtn } from '@widgets/theme-toggle-btn';

export const Root = (): ReactNode => {
  return (
    <>
      <ThemeToggleBtn />
      <Outlet />
    </>
  );
};

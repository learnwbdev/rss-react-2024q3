import { ReactNode } from 'react';
import { useTheme } from '@shared/contexts';
import { ThemeToggleBtn } from '@widgets';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps): ReactNode => {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <ThemeToggleBtn />
      <div>{children}</div>
    </div>
  );
};

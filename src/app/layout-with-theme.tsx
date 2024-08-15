'use client';

import { ReactNode } from 'react';
import { useTheme } from '@shared/contexts';

export const LayoutWithTheme = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();

  return <div className={`app ${theme}`}>{children}</div>;
};

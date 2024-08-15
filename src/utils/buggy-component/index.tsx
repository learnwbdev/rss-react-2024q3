'use client';

import { ReactNode } from 'react';

interface ErrorSimulatorProps {
  isThrowError?: boolean;
}

export const ErrorSimulator = ({ isThrowError = true }: ErrorSimulatorProps): ReactNode => {
  if (isThrowError) {
    throw new Error('Simulated error for Error Boundary Check');
  }

  return <div>Everything is fine!</div>;
};

import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { ErrorBoundary } from './index';

const ErrorComponent = () => {
  throw new Error('Test error');
};

const Fallback = (): ReactNode => <div>Something went wrong</div>;

describe('ErrorBoundary', () => {
  it('should render children when no error occurs', () => {
    render(
      <ErrorBoundary fallback={<Fallback />}>
        <div>Test Child</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('should render fallback UI when an error is thrown', () => {
    render(
      <ErrorBoundary fallback={<Fallback />}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('should call componentDidCatch and log the error', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => ({}));

    const expectedError = new Error('Test error');

    render(
      <ErrorBoundary fallback={<Fallback />}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(consoleSpy).toHaveBeenCalledWith('There was an error: ', expectedError);

    consoleSpy.mockRestore();
  });
});

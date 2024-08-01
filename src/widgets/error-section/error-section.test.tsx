import { renderWithRouter } from '@tests/utils';
import { describe, it, expect } from 'vitest';

import { ErrorSection } from './index';

describe('ErrorSection', () => {
  it('renders the button', () => {
    const { getByRole } = renderWithRouter(<ErrorSection />);

    const throwErrorBtn = getByRole('button', { name: /throw error/i });

    expect(throwErrorBtn).toBeInTheDocument();
  });

  it('does not render BuggyComponent initially', () => {
    const { queryByText } = renderWithRouter(<ErrorSection />);

    const errorTextRegex = new RegExp('there was an error', 'i');

    expect(queryByText(errorTextRegex)).toBeNull();
  });
});

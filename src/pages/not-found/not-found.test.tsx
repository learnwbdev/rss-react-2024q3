import { renderWithRouter } from '@tests/utils';
import { describe, it, expect } from 'vitest';

import { NotFoundPage } from './index';

describe('NotFound page', () => {
  it('renders correctly', () => {
    const { getByRole, getByText } = renderWithRouter(<NotFoundPage />);

    const regexThemeBtn = new RegExp('switch to (.*) theme', 'i');

    expect(getByRole('heading', { name: /404/i, level: 2 })).toBeInTheDocument();
    expect(getByText(/page not found/i)).toBeInTheDocument();
    expect(getByText(/whoops! sorry, we can't find that page\./i)).toBeInTheDocument();

    const backHomeBtn = getByRole('button', { name: /back to homepage/i });
    const toggleThemeBtn = getByRole('button', { name: regexThemeBtn });

    expect(backHomeBtn).toBeInTheDocument();
    expect(toggleThemeBtn).toBeInTheDocument();
  });
});

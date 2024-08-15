import { render } from '@tests/utils';
import { describe, it, expect } from 'vitest';

import NotFoundPage from '@app/not-found';

describe('NotFound page', () => {
  it('renders correctly', () => {
    const { getByRole, getByText, getAllByText } = render(<NotFoundPage />);

    expect(getByRole('heading', { name: /404/i, level: 2 })).toBeInTheDocument();

    const textNotFoundList = getAllByText(/page not found/i);

    textNotFoundList.forEach((textNotFound) => {
      expect(textNotFound).toBeInTheDocument();
    });

    expect(getByText(/whoops! sorry, we can't find that page\./i)).toBeInTheDocument();

    const backHomeBtn = getByRole('button', { name: /back to homepage/i });

    expect(backHomeBtn).toBeInTheDocument();
  });
});

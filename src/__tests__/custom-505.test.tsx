import { render } from '@tests/utils';
import { describe, it, expect } from 'vitest';

import Custom505 from '@pages/505';

describe('Custom505 page', () => {
  it('renders correctly', () => {
    const { getByRole, getByText, getAllByText } = render(<Custom505 />);

    expect(getByRole('heading', { name: /505/i, level: 2 })).toBeInTheDocument();

    const textNotFoundList = getAllByText(/server error/i);

    textNotFoundList.forEach((textNotFound) => {
      expect(textNotFound).toBeInTheDocument();
    });

    expect(getByText(/whoops! sorry, something went wrong on our end\./i)).toBeInTheDocument();

    const backHomeBtn = getByRole('button', { name: /back to homepage/i });

    expect(backHomeBtn).toBeInTheDocument();
  });
});

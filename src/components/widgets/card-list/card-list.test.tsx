import { render } from '@tests/utils';
import { describe, it, expect, vi } from 'vitest';
import mockRouter from 'next-router-mock';

import { PersonBriefMockSubsets } from '@mock-data';
import { CardList } from './index';

vi.mock('next/router', async () => {
  const routerMock = await vi.importActual('next-router-mock');
  return routerMock;
});

describe('CardList component', () => {
  describe('renders correct number of cards based on names', () => {
    PersonBriefMockSubsets.forEach((mockData, idx) => {
      it(`with mock data ${idx}`, async () => {
        const initialPath = `/?page=1`;

        await mockRouter.push(initialPath);

        const { getByRole, getAllByRole, getByText } = render(<CardList results={mockData} />);

        const cards = getAllByRole('heading');
        expect(cards.length).toBe(mockData.length);

        mockData.forEach(({ name, height }) => {
          expect(getByRole('heading', { name })).toBeInTheDocument();

          const regexPattern = new RegExp(height, 'i');
          expect(getByText(regexPattern)).toBeInTheDocument();
        });
      });
    });
  });

  it('renders correct message when there is no cards', () => {
    const { getByText } = render(<CardList results={[]} />);

    const noResultsMessage = getByText('No results found');
    expect(noResultsMessage).toBeInTheDocument();
  });
});

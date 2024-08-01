import { renderWithRouter } from '@tests/utils';
import { describe, it, expect } from 'vitest';

import { PersonBriefMockSubsets } from '@mock-data';
import { CardList } from './index';

describe('CardList component', () => {
  describe('renders correct number of cards based on names', () => {
    PersonBriefMockSubsets.forEach((mockData, idx) => {
      it(`with mock data ${idx}`, () => {
        const { getByRole, getAllByRole, getByText } = renderWithRouter(<CardList results={mockData} />);

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
    const { getByText } = renderWithRouter(<CardList results={[]} />);

    const noResultsMessage = getByText('No results found');
    expect(noResultsMessage).toBeInTheDocument();
  });
});

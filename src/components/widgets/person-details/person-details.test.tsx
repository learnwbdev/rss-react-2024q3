import { render, waitFor } from '@tests/utils';
import { describe, it, expect, vi } from 'vitest';
import { fetchPerson } from '@api';
import { PeopleMockList } from '@mock-data';
import { PersonDetails } from './index';

vi.mock('@api', () => ({
  fetchPerson: vi.fn(),
}));

const mockPush = vi.fn();

vi.mock('next/navigation', async () => {
  const original = await vi.importActual('next/navigation');

  return {
    ...original,
    useRouter: () => ({
      push: mockPush,
    }),
    useSearchParams: () => new URLSearchParams('page=1&details=1'),
  };
});

describe('PersonDetails component', () => {
  it('displays correct data when person prop is provided', async () => {
    const personId = 1;

    const mockData = PeopleMockList[personId - 1];

    (fetchPerson as ReturnType<typeof vi.fn>).mockResolvedValue({ personDetail: mockData, error: null });

    const { getByText, getByRole } = render(await PersonDetails({ personId: personId.toString() }));

    const { name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender } = mockData;

    await waitFor(() => {
      expect(getByRole('heading', { level: 2, name })).toBeInTheDocument();
      expect(getByText(`Height: ${height}`)).toBeInTheDocument();
      expect(getByText(`Mass: ${mass}`)).toBeInTheDocument();
      expect(getByText(`Hair color: ${hairColor}`)).toBeInTheDocument();
      expect(getByText(`Skin color: ${skinColor}`)).toBeInTheDocument();
      expect(getByText(`Eye color: ${eyeColor}`)).toBeInTheDocument();
      expect(getByText(`Birth year: ${birthYear}`)).toBeInTheDocument();
      expect(getByText(`Gender: ${gender}`)).toBeInTheDocument();
      getByRole('button', { name: /close/i });
    });
  });

  it('updates URL query when close button is clicked', async () => {
    const personId = 1;

    const { getByRole, user } = render(await PersonDetails({ personId: personId.toString() }));

    const closeButton = getByRole('button', { name: /close/i });

    await user.click(closeButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(`/?page=1`);
    });
  });
});

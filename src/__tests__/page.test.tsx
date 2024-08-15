import { render, waitFor } from '@tests/utils';
import { describe, it, expect, vi } from 'vitest';
import Page from '@app/page';
import { PersonBriefMock } from '@tests/mock-data';

const fetchPeopleMock = vi.fn();

vi.doMock('@api', () => ({
  fetchPeople: fetchPeopleMock,
}));

vi.mock('next/navigation', async () => {
  const original = await vi.importActual('next/navigation');

  return {
    ...original,
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
    }),
    useSearchParams: () => ({
      get: vi.fn().mockImplementation((key) => {
        if (key === 'page') return '1';
        return null;
      }),
      set: vi.fn(),
      delete: vi.fn(),
      has: vi.fn().mockImplementation((key) => key === 'page'),
    }),
  };
});

vi.mock('@icons/chevron-left.svg', () => ({
  __esModule: true,
  default: (): JSX.Element => <svg data-testid="chevron-left"></svg>,
}));

vi.mock('@icons/chevron-right.svg', () => ({
  __esModule: true,
  default: (): JSX.Element => <svg data-testid="chevron-right"></svg>,
}));

describe('Page Component', () => {
  it('renders correctly with fetched data', async () => {
    const mockPersonBrief = PersonBriefMock[0];

    const { name } = mockPersonBrief;

    fetchPeopleMock.mockResolvedValue({
      data: {
        totalPages: 5,
        results: [mockPersonBrief],
      },
    });

    const { getByText } = render(await Page({ searchParams: { page: '1' } }));

    await waitFor(() => {
      expect(getByText('React is Cool')).toBeInTheDocument();
      expect(getByText(name)).toBeInTheDocument();
    });
  });

  it('shows error message if fetchPeople fails', async () => {
    const { getByText } = render(await Page({ searchParams: { page: '10' } }));

    await waitFor(() => {
      expect(getByText('No results found')).toBeInTheDocument();
    });
  });
});

import { render, waitFor } from '@tests/utils';
import { describe, it, expect, vi } from 'vitest';
import mockRouter from 'next-router-mock';

import { PeopleMockList } from '@mock-data';
import { DetailedCard } from './index';

vi.mock('next/router', async () => {
  const routerMock = await vi.importActual('next-router-mock');
  return routerMock;
});

describe('DetailedCard component', () => {
  it('displays correct data when person prop is provided', async () => {
    const personId = 1;

    const mockData = PeopleMockList[personId - 1];

    const initialPath = `/?page=1&details=${personId}`;

    await mockRouter.push(initialPath);

    const { getByText, getByRole } = render(<DetailedCard person={mockData} />);

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

  it('does not render when person prop is not provided', () => {
    const { container } = render(<DetailedCard person={undefined} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('updates URL query when close button is clicked', async () => {
    const personId = 1;

    const mockData = PeopleMockList[personId - 1];

    const initialPath = `/?page=1&details=${personId}`;

    await mockRouter.push(initialPath);

    const { name } = mockData;

    const { getByRole, user } = render(<DetailedCard person={mockData} />);

    await waitFor(() => {
      expect(getByRole('heading', { level: 2, name })).toBeInTheDocument();

      expect(mockRouter).toMatchObject({
        pathname: '/',
        query: { page: '1', details: personId.toString() },
      });

      expect(mockRouter.query).toEqual({ page: '1', details: personId.toString() });
    });

    const closeButton = getByRole('button', { name: /close/i });

    await user.click(closeButton);

    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        pathname: '/',
        query: { page: '1' },
      });

      expect(mockRouter.query).toEqual({ page: '1' });
    });
  });
});

import { expect, describe, it } from 'vitest';
import { renderWithRouter, renderWithRoutes } from '@tests/utils';
import { routes } from '@routes/router';
import { PATH } from '@constants';
import { MainPage } from './index';

describe('MainPage Component', () => {
  it('should render heading and navigation links with correct hrefs', () => {
    const { getByRole } = renderWithRouter(<MainPage />);

    const heading = getByRole('heading', { name: /main page/i });
    expect(heading).toBeInTheDocument();

    const uncontrolledFormLink = getByRole('link', { name: /go to uncontrolled form/i });
    const hookFormLink = getByRole('link', { name: /go to hook form/i });
    expect(uncontrolledFormLink).toBeInTheDocument();
    expect(hookFormLink).toBeInTheDocument();

    expect(uncontrolledFormLink).toHaveAttribute('href', PATH.UNCONTROLLED_FORM);
    expect(hookFormLink).toHaveAttribute('href', PATH.HOOK_FORM);
  });

  describe('MainPage Navigation', () => {
    const navigateAndCheckHeading = async (linkText: string, expectedHeadingText: string) => {
      const { user, getByRole } = renderWithRoutes(routes, {
        routerConfig: { initialEntries: [PATH.MAIN] },
      });

      const link = getByRole('link', { name: new RegExp(linkText, 'i') });
      expect(link).toBeInTheDocument();

      await user.click(link);

      const heading = getByRole('heading', { name: new RegExp(expectedHeadingText, 'i') });
      expect(heading).toBeInTheDocument();
    };

    it('should navigate to Uncontrolled Form page', async () => {
      await navigateAndCheckHeading('Go to Uncontrolled Form', 'Uncontrolled Form');
    });

    it('should navigate to Hook Form page', async () => {
      await navigateAndCheckHeading('Go to Hook Form', 'Hook Form');
    });
  });
});

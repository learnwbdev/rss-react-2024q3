import { render } from '@tests/utils';
import { describe, it, expect, vi } from 'vitest';
import { Layout } from './layout';

vi.mock('@widgets', () => ({
  ThemeToggleBtn: () => <button>Toggle Theme</button>,
}));

describe('Layout', () => {
  it('should render children correctly', () => {
    const { getByText } = render(
      <Layout>
        <div>Child Content</div>
      </Layout>
    );

    expect(getByText('Child Content')).toBeInTheDocument();
  });

  it('should render ThemeToggleBtn', () => {
    const { getByText } = render(
      <Layout>
        <div>Child Content</div>
      </Layout>
    );

    expect(getByText('Toggle Theme')).toBeInTheDocument();
  });
});

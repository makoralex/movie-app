import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProfilePage from '../pages/ProfilePage';

vi.mock('../hooks/useAuth', () => ({
  default: () => ({ user: null, loading: false }),
}));

describe('ProfilePage', () => {
  it('should render', () => {
    const { container } = render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>,
    );
    expect(container).toBeDefined();
  });
});

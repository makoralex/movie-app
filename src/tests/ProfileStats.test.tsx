import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ProfileStats from '../components/ProfileStats/ProfileStats';
import type { UserData } from '../types/user';

const mockUserData: UserData = {
  uid: '123',
  email: 'test@test.com',
  username: 'test',
  avatar: '',
  likes: [1, 2, 3],
  ratings: { '1': 5, '2': 8 },
  watchLater: [1, 2, 3, 4],
};

describe('ProfileStats', () => {
  it('should render', () => {
    const { container } = render(<ProfileStats userData={mockUserData} />);
    expect(container).toBeDefined();
  });
});

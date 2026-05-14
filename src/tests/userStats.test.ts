import { describe, it, expect } from 'vitest';
import { getUserStats } from '../utils/userStats';
import type { UserData } from '../types/user';

describe('getUserStats', () => {
  it('should return 0 for empty user data', () => {
    const userData = {
      uid: '123',
      email: 'test@test.com',
      username: 'test',
      avatar: '',
      likes: [],
      ratings: {},
      watchLater: [],
    } as UserData;

    const stats = getUserStats(userData);

    expect(stats.likesCount).toBe(0);
    expect(stats.ratingsCount).toBe(0);
    expect(stats.watchLaterCount).toBe(0);
  });

  it('should count likes correctly', () => {
    const userData = {
      uid: '123',
      email: 'test@test.com',
      username: 'test',
      avatar: '',
      likes: [1, 2, 3],
      ratings: {},
      watchLater: [],
    } as UserData;

    const stats = getUserStats(userData);

    expect(stats.likesCount).toBe(3);
  });

  it('should count ratings correctly', () => {
    const userData = {
      uid: '123',
      email: 'test@test.com',
      username: 'test',
      avatar: '',
      likes: [],
      ratings: { '1': 5, '2': 8, '3': 10 },
      watchLater: [],
    } as UserData;

    const stats = getUserStats(userData);

    expect(stats.ratingsCount).toBe(3);
  });

  it('should count watch later correctly', () => {
    const userData = {
      uid: '123',
      email: 'test@test.com',
      username: 'test',
      avatar: '',
      likes: [],
      ratings: {},
      watchLater: [1, 2, 3, 4],
    } as UserData;

    const stats = getUserStats(userData);

    expect(stats.watchLaterCount).toBe(4);
  });
});

import type { UserData } from '../types/user';

export interface UserStats {
  likesCount: number;
  watchLaterCount: number;
  ratingsCount: number;
}

export const getUserStats = (userData: UserData): UserStats => {
  return {
    likesCount: userData.likes?.length || 0,
    watchLaterCount: userData.watchLater?.length || 0,
    ratingsCount: Object.keys(userData.ratings || {}).length,
  };
};

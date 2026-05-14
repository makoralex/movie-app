import type { UserData } from '../../types/user';
import { getUserStats } from '../../utils/userStats';

interface Props {
  userData: UserData;
}

const ProfileStats = ({ userData }: Props) => {
  const { likesCount, watchLaterCount, ratingsCount } = getUserStats(userData);

  return (
    <div className="profile-stats">
      <div className="stats-card">
        <span>{likesCount}</span>
        <p>liked</p>
      </div>

      <div className="stats-card">
        <span>{ratingsCount}</span>
        <p>rated</p>
      </div>

      <div className="stats-card">
        <span>{watchLaterCount}</span>
        <p>watch later</p>
      </div>
    </div>
  );
};

export default ProfileStats;

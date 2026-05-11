import type { UserData } from '../../types/user';

interface Props {
  userData: UserData;
}

const ProfileStats = ({ userData }: Props) => {
  const likesCount = userData.likes?.length || 0;
  const watchLaterCount = userData.watchLater?.length || 0;
  const ratingsCount = Object.keys(userData.ratings || {}).length;

  return (
    <div className="profile-stats">
      <div className="stats-card">
        <span>{likesCount}</span>
        <p>Liked</p>
      </div>

      <div className="stats-card">
        <span>{ratingsCount}</span>
        <p>Rated</p>
      </div>

      <div className="stats-card">
        <span>{watchLaterCount}</span>
        <p>Watch later</p>
      </div>
    </div>
  );
};

export default ProfileStats;

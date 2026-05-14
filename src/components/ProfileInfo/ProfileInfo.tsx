import authService from '../../services/AuthService';
import type { UserData } from '../../types/user';
import { useNavigate } from 'react-router-dom';
import ProfileStats from '../ProfileStats/ProfileStats';
import './ProfileInfo.css';

interface Props {
  userData: UserData;
}

const ProfileInfo = ({ userData }: Props) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logout();
    navigate('/');
  };

  const username = userData.username ?? userData.email?.split('@')[0] ?? 'user';

  return (
    <div className="profile-info">
      <div className="profile-top">
        <div className="profile-avatar">
          {userData.avatar ? (
            <img src={userData.avatar} alt={username} />
          ) : (
            <div className="default-avatar">{username[0].toUpperCase()}</div>
          )}
        </div>

        <div className="profile-user">
          <h1>{username}</h1>
          <p>{userData.email}</p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          logout
        </button>
      </div>

      <ProfileStats userData={userData} />
    </div>
  );
};

export default ProfileInfo;

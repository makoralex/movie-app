import ProfileInfo from '../components/ProfileInfo/ProfileInfo';
import MovieRow from '../components/MovieRow/MovieRow';
import Loader from '../components/Loader/Loader';
import { useProfile } from '../hooks/useProfile';

const ProfilePage = () => {
  const { userData, likedMovies, watchLaterMovies, ratedMovies, loading } =
    useProfile();

  if (loading) {
    return (
      <section className="profile-page">
        <Loader />
      </section>
    );
  }

  if (!userData) {
    return <section className="profile-page">profile not found</section>;
  }

  return (
    <section className="profile-page">
      <div className="profile-page-container">
        <ProfileInfo userData={userData} />
        <MovieRow title="liked movies" movies={likedMovies} />
        <MovieRow title="rated movies" movies={ratedMovies} />
        <MovieRow title="watchlist" movies={watchLaterMovies} />
      </div>
    </section>
  );
};

export default ProfilePage;

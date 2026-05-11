import { useEffect, useState, useCallback } from 'react';
import { auth } from '../firebase/auth';
import UserMovieService from '../services/UserMovieService';
import MoviesService from '../services/MoviesService';
import type { UserData } from '../types/user';
import type { Movie } from '../types/movie';
import ProfileInfo from '../components/ProfileInfo/ProfileInfo';
import MovieRow from '../components/MovieRow/MovieRow';
import Loader from '../components/Loader/Loader';

const moviesService = new MoviesService();

const ProfilePage = () => {
  const user = auth.currentUser;

  const [userData, setUserData] = useState<UserData | null>(null);
  const [likedMovies, setLikedMovies] = useState<Movie[]>([]);
  const [watchLaterMovies, setWatchLaterMovies] = useState<Movie[]>([]);
  const [ratedMovies, setRatedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);

      const data = await UserMovieService.getUser(user.uid);

      if (!data) return;

      setUserData(data);

      const liked = await moviesService.getMoviesByIds(data.likes || []);
      const watchLater = await moviesService.getMoviesByIds(
        data.watchLater || [],
      );

      const ratedIds = Object.keys(data.ratings || {}).map(Number);
      const rated = await moviesService.getMoviesByIds(ratedIds);

      setLikedMovies(liked);
      setWatchLaterMovies(watchLater);
      setRatedMovies(rated);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

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

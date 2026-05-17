import { useEffect, useState } from 'react';
import { auth } from '../firebase/auth';
import UserMovieService from '../services/UserMovieService';
import MoviesService from '../services/MoviesService';
import type { UserData } from '../types/user';
import type { Movie } from '../types/movie';
import logger from '../services/logger';

const moviesService = new MoviesService();

interface UseProfileReturn {
  userData: UserData | null;
  likedMovies: Movie[];
  watchLaterMovies: Movie[];
  ratedMovies: Movie[];
  loading: boolean;
}

export const useProfile = (): UseProfileReturn => {
  const user = auth.currentUser;
  const [userData, setUserData] = useState<UserData | null>(null);
  const [likedMovies, setLikedMovies] = useState<Movie[]>([]);
  const [watchLaterMovies, setWatchLaterMovies] = useState<Movie[]>([]);
  const [ratedMovies, setRatedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await UserMovieService.getUser(user.uid);

        if (!data) {
          setLoading(false);
          return;
        }

        setUserData(data);

        const [liked, watchLater, rated] = await Promise.all([
          moviesService.getMoviesByIds(data.likes || []),
          moviesService.getMoviesByIds(data.watchLater || []),
          moviesService.getMoviesByIds(
            Object.keys(data.ratings || {}).map(Number),
          ),
        ]);

        setLikedMovies(liked);
        setWatchLaterMovies(watchLater);
        setRatedMovies(rated);
      } catch (error) {
        logger.error('failed to load profile', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  return {
    userData,
    likedMovies,
    watchLaterMovies,
    ratedMovies,
    loading,
  };
};

import { useEffect, useState, useCallback } from 'react';
import { auth } from '../../firebase/auth';
import UserMovieService from '../../services/UserMovieService';
import type { UserData } from '../../types/user';
import './MovieActions.css';

interface Props {
  movieId: number;
}

const MovieActions = ({ movieId }: Props) => {
  const user = auth.currentUser;
  const [userData, setUserData] = useState<UserData | null>(null);

  const loadUserData = useCallback(async () => {
    if (!user) return;

    const data = await UserMovieService.getUser(user.uid);
    setUserData(data);
  }, [user]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const isLiked = userData?.likes?.includes(movieId) ?? false;
  const isWatchLater = userData?.watchLater?.includes(movieId) ?? false;
  const userRating = userData?.ratings?.[movieId.toString()] ?? 0;

  const toggleLike = async () => {
    if (!user) return;

    if (isLiked) {
      await UserMovieService.unlikeMovie(user.uid, movieId);
    } else {
      await UserMovieService.likeMovie(user.uid, movieId);
    }

    await loadUserData();
  };

  const setRating = async (rating: number) => {
    if (!user) return;

    await UserMovieService.rateMovie(user.uid, movieId, rating);
    await loadUserData();
  };

  const toggleWatchLater = async () => {
    if (!user) return;

    if (isWatchLater) {
      await UserMovieService.removeFromWatchLater(user.uid, movieId);
    } else {
      await UserMovieService.addToWatchLater(user.uid, movieId);
    }

    await loadUserData();
  };

  if (!user) return null;

  return (
    <div className="movie-actions">
      <button
        className={`like-btn ${isLiked ? 'liked' : ''}`}
        onClick={toggleLike}
      >
        {isLiked ? '♥' : '♡'}
      </button>

      <div className="rating-mini">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <span
            key={n}
            className={`rating-star ${n <= userRating ? 'active' : ''}`}
            onClick={() => setRating(n)}
          >
            ★
          </span>
        ))}
      </div>

      <button
        className={`watch-btn ${isWatchLater ? 'active' : ''}`}
        onClick={toggleWatchLater}
      >
        watch later
      </button>
    </div>
  );
};

export default MovieActions;

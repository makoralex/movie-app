import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;
      const data = await UserMovieService.getUser(user.uid);
      setUserData(data);
    };

    loadUserData();
  }, [user, movieId]);

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

    const data = await UserMovieService.getUser(user.uid);
    setUserData(data);
  };

  const setRating = async (rating: number) => {
    if (!user) return;

    await UserMovieService.rateMovie(user.uid, movieId, rating);
    const data = await UserMovieService.getUser(user.uid);
    setUserData(data);
  };

  const handleRemoveRating = async () => {
    if (!user) return;

    setUserData((prev) => {
      if (!prev) return prev;
      const newRatings = { ...prev.ratings };
      const key = movieId.toString();
      delete newRatings[key];
      return { ...prev, ratings: newRatings };
    });

    await UserMovieService.removeRating(user.uid, movieId);
  };

  const toggleWatchLater = async () => {
    if (!user) return;

    if (isWatchLater) {
      await UserMovieService.removeFromWatchLater(user.uid, movieId);
    } else {
      await UserMovieService.addToWatchLater(user.uid, movieId);
    }

    const data = await UserMovieService.getUser(user.uid);
    setUserData(data);
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

        {userRating > 0 && (
          <button
            className="rating-remove"
            onClick={handleRemoveRating}
            title="Remove rating"
          >
            ✕
          </button>
        )}
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

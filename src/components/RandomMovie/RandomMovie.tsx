import { useEffect, useState, useCallback, useRef } from 'react';
import MoviesService from '../../services/MoviesService';
import type { Movie } from '../../types/movie';
import Loader from '../Loader/Loader';
import './RandomMovie.css';

const moviesService = new MoviesService();

const RandomMovie = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestId = useRef(0);

  const fetchRandomMovie = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const id = ++requestId.current;

      const res = await moviesService.getTopRatedMovies();

      if (id !== requestId.current) return;

      const randomIndex = Math.floor(Math.random() * res.results.length);
      const randomMovie = res.results[randomIndex];
      const fullMovie = await moviesService.getMovie(randomMovie.id);

      if (id !== requestId.current) return;

      setMovie(fullMovie);
    } catch {
      setError('Failed to load movie');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRandomMovie();
  }, [fetchRandomMovie]);

  if (loading && !movie) {
    return (
      <div className="random-movie">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="random-movie error">{error}</div>;
  }

  if (!movie) {
    return <div className="random-movie loading">no movie found</div>;
  }

  const rating = Number(movie.vote_average.toFixed(1));
  const ratingClass =
    rating < 5 ? 'rating-low' : rating < 7 ? 'rating-medium' : 'rating-high';

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : '—';

  return (
    <section className="random-movie">
      <div className="random-movie-img">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />

        {loading && <div className="poster-overlay" />}
      </div>

      <div className="random-movie-info">
        <h2>{movie.title}</h2>

        {movie.tagline && (
          <p className="random-movie-tagline">{movie.tagline}</p>
        )}

        <p>{year}</p>
        <p>{movie.runtime ? `${movie.runtime} min` : '—'}</p>

        <p className="random-movie-overview">{movie.overview}</p>

        <div className="random-movie-bottom">
          <p className={`random-movie-rating ${ratingClass}`}>⭐ {rating}</p>

          <div className="random-movie-btn">
            {movie.homepage && (
              <a href={movie.homepage} target="_blank" rel="noreferrer">
                homepage
              </a>
            )}

            <button onClick={fetchRandomMovie}>another movie</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RandomMovie;

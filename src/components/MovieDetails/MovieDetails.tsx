import type { Movie } from '../../types/movie';
import MovieActions from '../MovieActions/MovieActions';
import './MovieDetails.css';

interface Props {
  movie: Movie;
}

const MovieDetails = ({ movie }: Props) => {
  const rating = Number(movie.vote_average.toFixed(1));

  const ratingClass =
    rating < 5 ? 'rating-low' : rating < 7 ? 'rating-medium' : 'rating-high';

  return (
    <div className="movie-details">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>

      <div className="movie-info">
        <h1>{movie.title}</h1>
        {movie.tagline && <p className="tagline">{movie.tagline}</p>}

        <p>
          {movie.release_date
            ? new Date(movie.release_date).getFullYear()
            : '—'}
        </p>

        <p>{movie.runtime} min</p>
        <p className="overview">{movie.overview}</p>

        {movie.genres && (
          <div className="genres">
            {movie.genres.map((g) => (
              <span key={g.id}>{g.name}</span>
            ))}
          </div>
        )}

        <div className={`tmdb-rating ${ratingClass}`}>⭐ {rating}</div>
        <div className="movie-actions-slot">
          <MovieActions movieId={movie.id} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

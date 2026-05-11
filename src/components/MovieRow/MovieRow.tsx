import { Link } from 'react-router-dom';
import type { Movie } from '../../types/movie';
import './MovieRow.css';

interface Props {
  title: string;
  movies: Movie[];
}

const MovieRow = ({ title, movies }: Props) => {
  if (!movies.length) return null;

  return (
    <div className="movie-row">
      <h2>{title}</h2>

      <div className="movie-row-content">
        <div className="movie-row-list">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movies/${movie.id}`}
              className="movie-row-card"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />

              <div className="movie-row-overlay">
                <span>{movie.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;

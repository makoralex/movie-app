import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Movie } from '../../types/movie';
import './MovieCard.css';

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link to={`/movies/${movie.id}`} className="movie-card">
      <div className="movie-poster-wrapper">
        {!imageLoaded && <div className="poster-skeleton" />}

        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          onLoad={() => setImageLoaded(true)}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
      </div>

      <div className="movie-title">{movie.title}</div>
    </Link>
  );
};

export default MovieCard;

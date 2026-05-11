import MovieCard from '../MovieCard/MovieCard';
import type { Movie } from '../../types/movie';
import './MoviesList.css';

interface Props {
  movies: Movie[];
}

const MoviesList = ({ movies }: Props) => {
  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesList;

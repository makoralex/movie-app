import MoviesList from './MoviesList/MoviesList';
import Loader from './Loader/Loader';
import type { Movie } from '../types/movie';

interface Props {
  movies: Movie[];
  loading: boolean;
}

const MoviesContent = ({ movies, loading }: Props) => {
  if (loading && movies.length === 0) {
    return <Loader />;
  }

  return (
    <div style={{ minHeight: '300px' }}>
      <MoviesList movies={movies} />
      <div style={{ minHeight: '60px' }}>
        {loading && movies.length > 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <div className="loader" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviesContent;

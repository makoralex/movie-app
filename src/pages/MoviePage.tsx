import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MoviesService from '../services/MoviesService';
import type { Movie } from '../types/movie';
import MovieDetails from '../components/MovieDetails/MovieDetails';
import Loader from '../components/Loader/Loader';

const moviesService = new MoviesService();

const MoviePage = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!id) return;

        const data = await moviesService.getMovie(Number(id));
        setMovie(data);
      } catch {
        setError('failed to load movie');
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  if (loading) {
    return (
      <section className="movie-page">
        <Loader />
      </section>
    );
  }

  if (error) {
    return <section className="movie-page">{error}</section>;
  }

  if (!movie) {
    return <section className="movie-page">movie not found :c</section>;
  }

  return (
    <section className="movie-page">
      <div className="movie-page-container">
        <MovieDetails movie={movie} />
      </div>
    </section>
  );
};

export default MoviePage;

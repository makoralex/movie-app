import { useMovies } from '../hooks/useMovies';
import MoviesToolbar from '../components/MoviesToolBar';
import MoviesContent from '../components/MoviesContent';

const MoviesPage = () => {
  const {
    movies,
    loading,
    filter,
    genre,
    decade,
    rating,
    search,
    handleFilterChange,
    setGenre,
    setDecade,
    setRating,
    setSearch,
  } = useMovies();

  return (
    <section className="movies-page">
      <h1>movies</h1>

      <MoviesToolbar
        filter={filter}
        onFilterChange={handleFilterChange}
        search={search}
        onSearchChange={setSearch}
        genre={genre}
        onGenreChange={setGenre}
        decade={decade}
        onDecadeChange={setDecade}
        rating={rating}
        onRatingChange={setRating}
      />

      <MoviesContent movies={movies} loading={loading} />
    </section>
  );
};

export default MoviesPage;

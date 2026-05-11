import MoviesFilterBar from './MoviesFilterBar/MoviesFilterBar';
import MovieSearch from './MovieSearch/MovieSearch';
import MovieAdvancedFilters from './MovieAdvancedFilters/MovieAdvancedFilters';
import type { MoviesFilter } from '../types/movies';

interface Props {
  filter: MoviesFilter;
  onFilterChange: (filter: MoviesFilter) => void;
  search: string;
  onSearchChange: (value: string) => void;
  genre: string;
  onGenreChange: (value: string) => void;
  decade: string;
  onDecadeChange: (value: string) => void;
  rating: number;
  onRatingChange: (value: number) => void;
}

const MoviesToolbar = ({
  filter,
  onFilterChange,
  search,
  onSearchChange,
  genre,
  onGenreChange,
  decade,
  onDecadeChange,
  rating,
  onRatingChange,
}: Props) => {
  return (
    <div className="movies-toolbar">
      <MoviesFilterBar value={filter} onChange={onFilterChange} />
      <MovieSearch value={search} onChange={onSearchChange} />
      <MovieAdvancedFilters
        genre={genre}
        setGenre={onGenreChange}
        decade={decade}
        setDecade={onDecadeChange}
        rating={rating}
        setRating={onRatingChange}
      />
    </div>
  );
};

export default MoviesToolbar;

import './MovieAdvancedFilters.css';

interface Props {
  genre: string;
  setGenre: (value: string) => void;
  decade: string;
  setDecade: (value: string) => void;
  rating: number;
  setRating: (value: number) => void;
}

const MovieAdvancedFilters = ({
  genre,
  setGenre,
  decade,
  setDecade,
  rating,
  setRating,
}: Props) => {
  return (
    <div className="movies-advanced-filters">
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="">all genres</option>
        <option value="28">action</option>
        <option value="35">comedy</option>
        <option value="18">drama</option>
        <option value="27">horror</option>
        <option value="10749">romance</option>
        <option value="878">sci-Fi</option>
      </select>

      <select value={decade} onChange={(e) => setDecade(e.target.value)}>
        <option value="">all decades</option>
        <option value="2020">2020s</option>
        <option value="2010">2010s</option>
        <option value="2000">2000s</option>
        <option value="1990">1990s</option>
        <option value="1980">1980s</option>
      </select>

      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        <option value="0">any rating</option>
        <option value="5">5+</option>
        <option value="6">6+</option>
        <option value="7">7+</option>
        <option value="8">8+</option>
      </select>
    </div>
  );
};

export default MovieAdvancedFilters;

import './MoviesFilterBar.css';
type MoviesFilter = 'popular' | 'top_rated' | 'upcoming';

interface Props {
  value: MoviesFilter;
  onChange: (value: MoviesFilter) => void;
}

const MoviesFilterBar = ({ value, onChange }: Props) => {
  return (
    <div className="movies-filter">
      <button
        className={value === 'popular' ? 'active' : ''}
        onClick={() => {
          if (value !== 'popular') {
            onChange('popular');
          }
        }}
      >
        popular
      </button>

      <button
        className={value === 'top_rated' ? 'active' : ''}
        onClick={() => {
          if (value !== 'top_rated') {
            onChange('top_rated');
          }
        }}
      >
        top rated
      </button>

      <button
        className={value === 'upcoming' ? 'active' : ''}
        onClick={() => {
          if (value !== 'upcoming') {
            onChange('upcoming');
          }
        }}
      >
        upcoming
      </button>
    </div>
  );
};

export default MoviesFilterBar;

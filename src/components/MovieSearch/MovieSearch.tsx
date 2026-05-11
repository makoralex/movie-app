import './MovieSearch.css';
interface Props {
  value: string;
  onChange: (value: string) => void;
}

const MovieSearch = ({ value, onChange }: Props) => {
  return (
    <div className="movie-search">
      <input
        type="text"
        value={value}
        placeholder="search movies..."
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default MovieSearch;

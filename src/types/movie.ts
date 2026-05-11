export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  release_date: string;
  vote_average: number;
  runtime?: number | null;
  tagline?: string | null;
  homepage?: string | null;
  genres?: Genre[];
  genre_ids?: number[];
  adult: boolean;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}

import type { Movie, MoviesResponse } from '../types/movie';

class MoviesService {
  _apiBase = 'https://api.themoviedb.org/3/';
  _apiKey = 'api_key=af0e04640bfd153286b33b3d36248125';

  getResource = async <T>(url: string): Promise<T> => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getPopularMovies = (page = 1): Promise<MoviesResponse> => {
    return this.getResource<MoviesResponse>(
      `${this._apiBase}movie/popular?${this._apiKey}&page=${page}`,
    );
  };

  getTopRatedMovies = (page = 1) => {
    return this.getResource<MoviesResponse>(
      `${this._apiBase}movie/top_rated?${this._apiKey}&page=${page}`,
    );
  };

  getUpcomingMovies = (page = 1): Promise<MoviesResponse> => {
    return this.getResource(
      `${this._apiBase}movie/upcoming?${this._apiKey}&page=${page}`,
    );
  };

  getMovie = (id: number): Promise<Movie> => {
    return this.getResource<Movie>(
      `${this._apiBase}movie/${id}?${this._apiKey}`,
    );
  };

  getDiscoverMovies = (
    page: number,
    params: {
      sort_by?: string;
      genre?: string;
      yearFrom?: number;
      yearTo?: number;
      ratingGte?: number;
    },
  ): Promise<MoviesResponse> => {
    const {
      sort_by = 'popularity.desc',
      genre,
      yearFrom,
      yearTo,
      ratingGte,
    } = params;

    let url = `${this._apiBase}discover/movie?${this._apiKey}&page=${page}&sort_by=${sort_by}&include_adult=false`;

    if (genre) {
      url += `&with_genres=${genre}`;
    }

    if (yearFrom) {
      url += `&primary_release_date.gte=${yearFrom}-01-01`;
    }

    if (yearTo) {
      url += `&primary_release_date.lte=${yearTo}-12-31`;
    }

    if (ratingGte) {
      url += `&vote_average.gte=${ratingGte}`;
    }

    return this.getResource<MoviesResponse>(url);
  };

  getSearchMovies = (query: string, page = 1) => {
    return this.getResource<MoviesResponse>(
      `${this._apiBase}search/movie?${this._apiKey}&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`,
    );
  };

  async getMoviesByIds(ids: number[]) {
    return Promise.all(ids.map((id) => this.getMovie(id)));
  }
}

export default MoviesService;

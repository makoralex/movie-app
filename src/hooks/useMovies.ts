import { useEffect, useRef, useState } from 'react';
import MoviesService from '../services/MoviesService';
import type { Movie } from '../types/movie';
import logger from '../services/logger';

const moviesService = new MoviesService();
type MoviesFilter = 'popular' | 'top_rated' | 'upcoming';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filter, setFilter] = useState<MoviesFilter>('popular');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [genre, setGenre] = useState('');
  const [decade, setDecade] = useState('');
  const [rating, setRating] = useState(0);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const requestId = useRef(0);
  const prevFilters = useRef('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const isSearchMode = debouncedSearch.length > 0;
  const isDiscoverMode = Boolean(genre || decade || rating);

  const handleFilterChange = (newFilter: MoviesFilter) => {
    if (newFilter === filter) return;
    setFilter(newFilter);
    setGenre('');
    setDecade('');
    setRating(0);
    setSearch('');
    setDebouncedSearch('');
  };

  const currentFilters = `${filter}-${genre}-${decade}-${rating}-${debouncedSearch}`;

  useEffect(() => {
    if (prevFilters.current && prevFilters.current !== currentFilters) {
      setMovies([]);
      setPage(1);
      setHasMore(true);
      requestId.current++;
    }
    prevFilters.current = currentFilters;
  }, [currentFilters]);

  useEffect(() => {
    const load = async () => {
      if (loading || !hasMore) return;
      setLoading(true);
      const id = ++requestId.current;

      try {
        const yearFrom = decade ? Number(decade) : undefined;
        const yearTo = decade ? Number(decade) + 9 : undefined;
        let res;

        if (isSearchMode) {
          res = await moviesService.getSearchMovies(debouncedSearch, page);
        } else if (isDiscoverMode) {
          res = await moviesService.getDiscoverMovies(page, {
            sort_by:
              filter === 'top_rated'
                ? 'vote_average.desc'
                : filter === 'upcoming'
                  ? 'release_date.desc'
                  : 'popularity.desc',
            genre: genre || undefined,
            yearFrom,
            yearTo,
            ratingGte: rating > 0 ? rating : undefined,
          });
        } else {
          if (filter === 'popular')
            res = await moviesService.getPopularMovies(page);
          else if (filter === 'top_rated')
            res = await moviesService.getTopRatedMovies(page);
          else res = await moviesService.getUpcomingMovies(page);
        }

        if (!res) return;
        if (id !== requestId.current) return;

        const clean = res.results.filter((m) => !m.adult);
        setMovies((prev) => {
          if (page === 1) return clean;
          const ids = new Set(prev.map((m) => m.id));
          return [...prev, ...clean.filter((m) => !ids.has(m.id))];
        });
        setHasMore(page < res.total_pages);
      } catch (e) {
        logger.error('movies load error:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [
    page,
    filter,
    genre,
    decade,
    rating,
    debouncedSearch,
    loading,
    hasMore,
    isSearchMode,
    isDiscoverMode,
  ]);

  useEffect(() => {
    const onScroll = () => {
      if (loading || !hasMore) return;
      const nearBottom =
        window.scrollY + window.innerHeight >= document.body.offsetHeight - 50;
      if (nearBottom) setPage((p) => p + 1);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [loading, hasMore]);

  return {
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
  };
};

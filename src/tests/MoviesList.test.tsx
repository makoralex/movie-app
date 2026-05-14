import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MoviesList from '../components/MoviesList/MoviesList';
import type { Movie } from '../types/movie';

const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'movie 1',
    overview: '',
    poster_path: null,
    release_date: '2022-02-02',
    vote_average: 7,
    adult: false,
  },
  {
    id: 2,
    title: 'movie 2',
    overview: '',
    poster_path: null,
    release_date: '2026-04-24',
    vote_average: 8,
    adult: false,
  },
];

describe('MoviesList', () => {
  it('should render all movies', () => {
    render(
      <BrowserRouter>
        <MoviesList movies={mockMovies} />
      </BrowserRouter>,
    );

    expect(screen.getByText('movie 1')).toBeDefined();
    expect(screen.getByText('movie 2')).toBeDefined();
  });
});

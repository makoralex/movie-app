import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MovieDetails from '../components/MovieDetails/MovieDetails';
import type { Movie } from '../types/movie';

const mockMovie: Movie = {
  id: 1,
  title: 'test Movie',
  overview: 'test overview',
  poster_path: '/test.jpg',
  backdrop_path: '/backdrop.jpg',
  release_date: '2026-05-14',
  vote_average: 7.5,
  runtime: 120,
  tagline: 'test tagline',
  homepage: 'https://example.com',
  genres: [{ id: 1, name: 'action' }],
  adult: false,
};

describe('MovieDetails', () => {
  it('should render movie title', () => {
    render(
      <BrowserRouter>
        <MovieDetails movie={mockMovie} />
      </BrowserRouter>,
    );

    expect(screen.getByText('test Movie')).toBeDefined();
  });

  it('should render overview', () => {
    render(
      <BrowserRouter>
        <MovieDetails movie={mockMovie} />
      </BrowserRouter>,
    );

    expect(screen.getByText('test overview')).toBeDefined();
  });

  it('should render rating', () => {
    render(
      <BrowserRouter>
        <MovieDetails movie={mockMovie} />
      </BrowserRouter>,
    );

    expect(screen.getByText(/7.5/)).toBeDefined();
  });
});

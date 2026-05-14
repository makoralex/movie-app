import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MovieCard from '../components/MovieCard/MovieCard';
import type { Movie } from '../types/movie';

const mockMovie: Movie = {
  id: 1,
  title: 'test movie',
  overview: 'test overview',
  poster_path: '/test.jpg',
  release_date: '2026-05-14',
  vote_average: 7.5,
  adult: false,
};

describe('MovieCard', () => {
  it('should render movie title', () => {
    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>,
    );

    expect(screen.getByText('test movie')).toBeDefined();
  });

  it('should have correct link to movie page', () => {
    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>,
    );

    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('/movies/1');
  });
});

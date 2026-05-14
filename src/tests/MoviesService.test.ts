import { describe, it, expect } from 'vitest';
import MoviesService from '../services/MoviesService';

const service = new MoviesService();

describe('MoviesService', () => {
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have getPopularMovies method', () => {
    expect(typeof service.getPopularMovies).toBe('function');
  });

  it('should have getTopRatedMovies method', () => {
    expect(typeof service.getTopRatedMovies).toBe('function');
  });

  it('should have getUpcomingMovies method', () => {
    expect(typeof service.getUpcomingMovies).toBe('function');
  });

  it('should have getMovie method', () => {
    expect(typeof service.getMovie).toBe('function');
  });

  it('should have getDiscoverMovies method', () => {
    expect(typeof service.getDiscoverMovies).toBe('function');
  });

  it('should have getSearchMovies method', () => {
    expect(typeof service.getSearchMovies).toBe('function');
  });
});

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import MoviesToolbar from '../components/MoviesToolBar';

describe('MoviesToolbar', () => {
  it('should render', () => {
    const { container } = render(
      <MoviesToolbar
        filter="popular"
        onFilterChange={() => {}}
        search=""
        onSearchChange={() => {}}
        genre=""
        onGenreChange={() => {}}
        decade=""
        onDecadeChange={() => {}}
        rating={0}
        onRatingChange={() => {}}
      />,
    );
    expect(container).toBeDefined();
  });
});

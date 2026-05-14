import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MoviesFilterBar from '../components/MoviesFilterBar/MoviesFilterBar';

describe('MoviesFilterBar', () => {
  it('should render all filter buttons', () => {
    const onChange = vi.fn();
    render(<MoviesFilterBar value="popular" onChange={onChange} />);

    expect(screen.getByText('popular')).toBeDefined();
    expect(screen.getByText('top rated')).toBeDefined();
    expect(screen.getByText('upcoming')).toBeDefined();
  });

  it('should call onChange when clicking different filter', () => {
    const onChange = vi.fn();
    render(<MoviesFilterBar value="popular" onChange={onChange} />);

    fireEvent.click(screen.getByText('top rated'));
    expect(onChange).toHaveBeenCalledWith('top_rated');
  });
});

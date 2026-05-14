import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieSearch from '../components/MovieSearch/MovieSearch';

describe('MovieSearch', () => {
  it('should render input', () => {
    const onChange = vi.fn();
    render(<MovieSearch value="" onChange={onChange} />);

    const input = screen.getByPlaceholderText('search movies...');
    expect(input).toBeDefined();
  });

  it('should call onChange when typing', () => {
    const onChange = vi.fn();
    render(<MovieSearch value="" onChange={onChange} />);

    const input = screen.getByPlaceholderText('search movies...');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(onChange).toHaveBeenCalledWith('test');
  });
});

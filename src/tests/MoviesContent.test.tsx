import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import MoviesContent from '../components/MoviesContent';

describe('MoviesContent', () => {
  it('should render', () => {
    const { container } = render(<MoviesContent movies={[]} loading={false} />);
    expect(container).toBeDefined();
  });
});

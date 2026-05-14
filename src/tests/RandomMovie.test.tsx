import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import RandomMovie from '../components/RandomMovie/RandomMovie';

describe('RandomMovie', () => {
  it('should render without crashing', () => {
    const { container } = render(<RandomMovie />);
    expect(container).toBeDefined();
  });
});

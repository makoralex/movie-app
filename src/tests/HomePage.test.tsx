import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import HomePage from '../pages/HomePage';

describe('HomePage', () => {
  it('should render', () => {
    const { container } = render(<HomePage />);
    expect(container).toBeDefined();
  });
});

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Loader from '../components/Loader/Loader';

describe('Loader', () => {
  it('should render loader component', () => {
    render(<Loader />);

    const loader = document.querySelector('.loader');
    expect(loader).toBeDefined();
  });

  it('should have correct class names', () => {
    render(<Loader />);

    const overlay = document.querySelector('.loader-overlay');
    const loader = document.querySelector('.loader');

    expect(overlay).toBeDefined();
    expect(loader).toBeDefined();
  });
});

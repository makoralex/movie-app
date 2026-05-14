import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

describe('ProtectedRoute', () => {
  it('should render', () => {
    const { container } = render(
      <BrowserRouter>
        <ProtectedRoute>
          <div>test</div>
        </ProtectedRoute>
      </BrowserRouter>,
    );
    expect(container).toBeDefined();
  });
});

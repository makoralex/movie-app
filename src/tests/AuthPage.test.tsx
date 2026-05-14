import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';

describe('AuthPage', () => {
  it('should render', () => {
    const { container } = render(
      <BrowserRouter>
        <AuthPage />
      </BrowserRouter>,
    );
    expect(container).toBeDefined();
  });
});

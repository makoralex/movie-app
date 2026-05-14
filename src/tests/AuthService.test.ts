import { describe, it, expect } from 'vitest';
import AuthService from '../services/AuthService';

describe('AuthService', () => {
  it('should be defined', () => {
    expect(AuthService).toBeDefined();
  });

  it('should have login method', () => {
    expect(typeof AuthService.login).toBe('function');
  });

  it('should have register method', () => {
    expect(typeof AuthService.register).toBe('function');
  });

  it('should have logout method', () => {
    expect(typeof AuthService.logout).toBe('function');
  });
});

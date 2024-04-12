import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserLoginForm from '../components/Authentication/UserLoginForm'; 

beforeAll(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

// Mocking window.location.href for redirection test
delete window.location;
window.location = { href: jest.fn() };

describe('UserLoginForm', () => {
  beforeEach(() => {
    fetch.mockClear();
    window.location.href.mockClear();
  });

  test('renders email and password fields and login button', () => {
    render(<UserLoginForm />);

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('shows error for invalid email format', () => {
    render(<UserLoginForm />);

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'invalidemail' } });
    fireEvent.blur(screen.getByLabelText(/email address/i));

    expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
  });

  test('login button is disabled when email or password is invalid', () => {
    render(<UserLoginForm />);

    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@test.com' } });
    expect(loginButton).toBeDisabled(); // Still disabled because the password is missing

    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    expect(loginButton).not.toBeDisabled(); 
  });

  test('displays fail message on failed login', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Login failed' }),
    });

    render(<UserLoginForm />);

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/login failed/i)).toBeInTheDocument();
    });
  });

  test('redirects to dashboard-user on successful login', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'fake_token' }),
    });

    render(<UserLoginForm />);

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(window.location.href).toBe('/UserLanding');

    });
  });
});

import React from 'react';
import { render, screen, fireEvent, waitFor  } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../components/Navbar';
import 'jest-fetch-mock/setupJest';

// Mock useNavigate
const mockedNavigate = jest.fn();

beforeEach(() => {
  fetch.resetMocks();
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useNavigate: () => mockedNavigate,
}));

// Mock localStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key) {
      delete store[key];
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Navbar Component', () => {
  beforeEach(() => {
    localStorage.clear();
    mockedNavigate.mockClear();
  });

  test('renders Navbar component with login button when not logged in', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    // Assert that the login button is rendered
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Welcome,')).not.toBeInTheDocument(); // Not logged in, so this should not be present
  });

  test('renders Navbar component with welcome message and logout option when logged in', () => {
    localStorage.setItem('token', 'some-token');

    render(
      <Router>
        <Navbar />
      </Router>
    );

    // Assert that the welcome message is rendered
    expect(screen.getByText('Welcome,')).toBeInTheDocument();

    // Simulate menu click
    const accountButton = screen.getByRole('button', { name: /account of current user/i });
    fireEvent.click(accountButton);

    // Assert that the logout option is present
    expect(screen.getByText('Logout')).toBeInTheDocument();

    // Click on Logout
    fireEvent.click(screen.getByText('Logout'));

    // Assert navigate was called with '/'
    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });

  test('navigates to login page on login button click', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);

    expect(mockedNavigate).toHaveBeenCalledWith('/Login');
  });
});

test('renders Navbar links', () => {
  render(
    <Router>
      <Navbar />
    </Router>
  );

  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Features')).toBeInTheDocument();
  expect(screen.getByText('Why EstateFlow')).toBeInTheDocument();
  expect(screen.getByText('Pricing')).toBeInTheDocument();
  expect(screen.getByText('Contact')).toBeInTheDocument();
});

import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter as Router } from 'react-router-dom';
import UserLanding from '../pages/UserLanding';

describe('UserLanding Component', () => {
  test('renders the landing page with navigation and section boxes', () => {
    render(
      <Router>
        <UserLanding />
      </Router>
    );
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });
});

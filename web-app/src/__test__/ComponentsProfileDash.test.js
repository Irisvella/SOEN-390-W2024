import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileDash from '../components/ProfileDash';

describe('ProfileDash Component', () => {
  test('renders the dashboard and checks for user greeting', () => {
    render(<ProfileDash />);

    expect(screen.getByText('EstateFlow')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();

    expect(screen.getByText('Welcome, User')).toBeInTheDocument();
    expect(screen.getByText('This is your dashboard')).toBeInTheDocument();
  });
});

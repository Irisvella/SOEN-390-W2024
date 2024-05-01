import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../pages/Home';
import { MemoryRouter as Router } from 'react-router-dom';

describe('Home Component', () => {
  test('renders without crashing', () => {
    render(
    <Router>
        <Home />
    </Router>
    );
    expect(screen.getByText('Welcome to EstateFlow')).toBeInTheDocument();
  });

  test('displays key marketing phrases', () => {
    render(
        <Router>
        <Home />
    </Router>
    );
    expect(screen.getByTestId('home_content')).toBeInTheDocument();
  });


  test('contains call-to-action messages', () => {
    render(
        <Router>
        <Home />
    </Router>
    );
    expect(screen.getByText('Ready to Begin?')).toBeInTheDocument();
    expect(screen.getByText('Explore our listings, learn more about our services, and connect with our advisors. Your new beginning starts here, at EstateFlow.')).toBeInTheDocument();
  });

});

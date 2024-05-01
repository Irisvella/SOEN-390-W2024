import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Data from '../components/EditProfile/src/components/Sidebar/Data';

describe('Data Component', () => {
  test('renders list items with correct data', () => {
    render(<Data />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3); 
    expect(screen.getByText('Condo Number')).toBeInTheDocument();
    expect(screen.getByText('3207')).toHaveStyle('color: brand.yellow');
    expect(screen.getByText('Requests in progress')).toBeInTheDocument();
    expect(screen.getByText('3')).toHaveStyle('color: brand.green');
    expect(screen.getByText('Next Rent Due')).toBeInTheDocument();
  });

  test('renders dynamic value correctly', () => {
  });
});

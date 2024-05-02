import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UnitsCards from '../components/UnitsCards';
import { MemoryRouter as Router } from 'react-router-dom';

describe('UnitsCards Component', () => {
  const units = [
    { id: '1', property_id: '101', unit_number: 10, square_feet: 500 },
    { id: '2', property_id: '102', unit_number: 20, square_feet: 600 }
  ];

  beforeEach(() => {
    localStorage.setItem('token', 'fake_token');
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ data: { registrationKey: 'ABC123' } }),
    }));
  });

  test('renders unit cards correctly', () => {
    render(
        <Router>
        <UnitsCards units={units} />
        </Router>);
    
    units.forEach(unit => {
      expect(screen.getByText(`Unit ${unit.unit_number}`)).toBeInTheDocument();
      expect(screen.getByText(`Square Feet: ${unit.square_feet}`)).toBeInTheDocument();
    });
  });

/*
  test('generates key and displays dialog on button click', async () => {
    render(
        <Router>
        <UnitsCards units={units} />
        </Router>);
    
    const generateKeyButtons = screen.getAllByText('Generate Key');
    fireEvent.click(generateKeyButtons[0]); // Click on the first button

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:3000/registration', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer fake_token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'renter', condoId: units[0].id }),
      });
    });

    expect(screen.getByText('Generated Key')).toBeInTheDocument();
    expect(screen.getByText('ABC123')).toBeInTheDocument();
  });

  test('closes dialog on close button click', async () => {
    render(
    <Router>
    <UnitsCards units={units} />
    </Router>);

    const generateKeyButtons = screen.getAllByText('Generate Key');
    fireEvent.click(generateKeyButtons[0]); // Trigger the dialog

    await waitFor(() => {
      screen.getByText('Generated Key'); // Ensure dialog is open
    });

    fireEvent.click(screen.getByText('Close')); // Click the close button
    expect(screen.queryByText('Generated Key')).not.toBeInTheDocument();
  });
 */ 

});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddEmployee from '../pages/addemployee';
import { MemoryRouter as Router } from 'react-router-dom';


const mockLocalStorage = (token) => {
  Storage.prototype.getItem = jest.fn(() => token);
};

global.fetch = jest.fn();

describe('AddEmployee Component', () => {
  beforeEach(() => {
    mockLocalStorage('fake_token');
    jest.clearAllMocks();
  });

  test('renders form elements correctly', () => {
    render(
    <Router>
    <AddEmployee />
    </Router>
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Role')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('submits employee data correctly', async () => {
    fetch.mockResolvedValueOnce({ ok: true });
    render(
        <Router>
        <AddEmployee />
        </Router>
        );
        const submitButton = screen.getByText('Submit');
    
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:3000/add-employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer fake_token',
        },
        body: JSON.stringify({ email: '', role: '' }),
      });
    });
  });

  test('handles submission errors correctly', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    render(
        <Router>
        <AddEmployee />
        </Router>
        );
        const submitButton = screen.getByText('Submit');
    
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
  });
});

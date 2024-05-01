import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddOperationalCost from '../pages/AddOperationalCost';
import { MemoryRouter as Router } from 'react-router-dom';


// Mocking fetch and localStorage
global.fetch = jest.fn();
Storage.prototype.getItem = jest.fn(() => 'fake_token');

describe('AddOperationalCost Component', () => {
  beforeEach(() => {
    fetch.mockClear();
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: "success" }),
    });
    render(
    <Router>
    <AddOperationalCost />
    </Router>
    );
  });

  test('renders all form fields and a submit button', () => {
    expect(screen.getByLabelText('Property Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Amount')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Due Date')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  test('allows form fields to be updated and validates inputs', () => {
    const addressInput = screen.getByLabelText('Property Address');
    const amountInput = screen.getByLabelText('Amount');
    const descriptionInput = screen.getByLabelText('Description');
    const dateInput = screen.getByLabelText('Due Date');

    fireEvent.change(addressInput, { target: { value: '123 Main St' } });
    fireEvent.change(amountInput, { target: { value: '500' } });
    fireEvent.change(descriptionInput, { target: { value: 'Utility bills' } });
    fireEvent.change(dateInput, { target: { value: '2021-05-20' } });

    expect(addressInput.value).toBe('123 Main St');
    expect(amountInput.value).toBe('500');
    expect(descriptionInput.value).toBe('Utility bills');
    expect(dateInput.value).toBe('2021-05-20');
  });

  test('displays error message if fields are empty on submission', async () => {
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Please fill in all fields.')).toBeInTheDocument();
    });
  });

  test('handles fetch errors', async () => {
    fetch.mockResolvedValueOnce({ ok: false, json: () => Promise.resolve({ message: "Failed to add operational cost" }) });
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
  });
});

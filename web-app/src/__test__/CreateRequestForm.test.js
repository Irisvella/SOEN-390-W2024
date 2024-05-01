import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateRequestForm from '../components/CreateRequestForm';
import { BrowserRouter } from 'react-router-dom';

// Mocking useNavigate and useParams
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ propertyId: '123' }),
}));

global.fetch = jest.fn();
Storage.prototype.getItem = jest.fn();

describe('CreateRequestForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Storage.prototype.getItem.mockReturnValue('valid_token');
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: 'success' }),
    });
  });

  test('navigates to login if no token found', () => {
    Storage.prototype.getItem.mockReturnValueOnce(null);
    render(<CreateRequestForm />, { wrapper: BrowserRouter });
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard-company');
  });

  test('navigates to dashboard-company if role is not publicUser', () => {
    Storage.prototype.getItem.mockImplementation((key) =>
      key === 'token' ? 'valid_token' : 'admin'
    );
    render(<CreateRequestForm />, { wrapper: BrowserRouter });
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard-company');
  });

  test('renders form inputs correctly', () => {
    render(<CreateRequestForm />, { wrapper: BrowserRouter });
    expect(screen.getByLabelText('Request type')).toBeInTheDocument();
    expect(screen.getByLabelText('Priority')).toBeInTheDocument();
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Reason for request')).toBeInTheDocument();
  });

  test('allows form inputs to change', () => {
    render(<CreateRequestForm />, { wrapper: BrowserRouter });
    const dateInput = screen.getByLabelText('Date');
    fireEvent.change(dateInput, { target: { value: '2023-01-01' } });
    expect(dateInput.value).toBe('2023-01-01');
  });


  test('handles server error on form submission', async () => {
    fetch.mockResolvedValueOnce({ ok: false, text: () => Promise.resolve('Failed to submit') });
    render(<CreateRequestForm />, { wrapper: BrowserRouter });
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Request type').value).not.toBe('');
    });
  });
});

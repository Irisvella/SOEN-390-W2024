import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompanySignupForm from '../components/Authentication/CompanySignupForm'; // Adjust the import path as needed
import { BrowserRouter } from 'react-router-dom';

global.fetch = jest.fn();

beforeEach(() => {
  global.fetch.mockClear();
});

const renderCompanySignupForm = () => render(
  <BrowserRouter>
    <CompanySignupForm />
  </BrowserRouter>
);

describe('CompanySignupForm', () => {
  test('input fields are rendered', () => {
    renderCompanySignupForm();
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByTestId('CompanyAddress')).toBeInTheDocument();
    expect(screen.getByTestId('passwordInput')).toBeInTheDocument();
    expect(screen.getByTestId('ConfirmPasswordInput')).toBeInTheDocument();
  });

  test('displays error for invalid email format', async () => {
    renderCompanySignupForm();
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'invalidemail' } });
    fireEvent.blur(screen.getByLabelText(/email address/i));
    expect(await screen.findByText(/invalid email format/i)).toBeInTheDocument();
  });

  test('submit button is disabled when form is incomplete or invalid', () => {
    renderCompanySignupForm();
    expect(screen.getByRole('button', { name: /register/i })).toBeDisabled();
  });

  test('submit button is enabled when form inputs are valid', async () => {
    renderCompanySignupForm();
    fireEvent.change(screen.getByLabelText(/company name/i), { target: { value: 'Test Company' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByTestId('CompanyAddress'), { target: { value: '123 Test St.' } });
    fireEvent.change(screen.getByTestId('passwordInput'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('ConfirmPasswordInput'), { target: { value: 'password123' } });
    expect(screen.getByRole('button', { name: /register/i })).not.toBeDisabled();
  });

  test('shows success message on successful registration', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Signup successful! You can now login." }),
    });

    renderCompanySignupForm();
    fireEvent.change(screen.getByLabelText(/company name/i), { target: { value: 'Test Company' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByTestId('CompanyAddress'), { target: { value: '123 Test St.' } });
    fireEvent.change(screen.getByTestId('passwordInput'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('ConfirmPasswordInput'), { target: { value: 'password123' } });

    const signupForm = screen.getByTestId('company-signup-form');
  
    fireEvent.submit(signupForm);

    await waitFor(() => {
      expect(screen.getByText(/signup successful!/i)).toBeInTheDocument();
    });
  });

  test('shows failure message on failed registration', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "An error occurred. Please try again." }),
    });

    renderCompanySignupForm();
    fireEvent.change(screen.getByLabelText(/company name/i), { target: { value: 'Test Company' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByTestId('CompanyAddress'), { target: { value: '123 Test St.' } });
    fireEvent.change(screen.getByTestId('passwordInput'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('ConfirmPasswordInput'), { target: { value: 'password123' } });

    const signupForm = screen.getByTestId('company-signup-form');
  
    fireEvent.submit(signupForm);

    await waitFor(() => {
      expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
    });
  });
});

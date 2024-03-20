import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserSignupForm from '../components/Authentication/UserSignupForm'; 
import { BrowserRouter } from 'react-router-dom';

global.fetch = jest.fn();

beforeEach(() => {
  global.fetch.mockClear();
});

const renderUserSignupForm = () => render(
  <BrowserRouter>
    <UserSignupForm />
  </BrowserRouter>
);

describe('UserSignupForm', () => {
  test('input fields are rendered', () => {
    renderUserSignupForm();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByTestId('passwordInput')).toBeInTheDocument();
    expect(screen.getByTestId('confirmPasswordInput')).toBeInTheDocument();  });

  test('displays error for invalid email format', async () => {
    renderUserSignupForm();
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'invalidemail' } });
    fireEvent.blur(screen.getByLabelText(/email address/i));
    expect(await screen.findByText(/invalid email format/i)).toBeInTheDocument();
  });

  test('submit button is disabled when form is incomplete or invalid', () => {
    renderUserSignupForm();
    expect(screen.getByRole('button', { name: /register/i })).toBeDisabled();
  });

  test('submit button is enabled when form inputs are valid', async () => {
    renderUserSignupForm();
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByTestId('passwordInput'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('confirmPasswordInput'), { target: { value: 'password123' } });
    expect(screen.getByRole('button', { name: /register/i })).not.toBeDisabled();
  });

  test('shows success message on successful registration', async () => {

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ String: "Signup successful! You can now login." }),
    });

    renderUserSignupForm();
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByTestId('passwordInput'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('confirmPasswordInput'), { target: { value: 'password123' } });

    const signupForm = screen.getByTestId('user-signup-form');
  
    fireEvent.submit(signupForm);
    //fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(screen.getByText(/signup successful!/i)).toBeInTheDocument();
    });
  });

  test('shows failure message on failed registration', async () => {
    global.fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ String: "An error occurred. Please try again." }),
      });
  
      renderUserSignupForm();
      fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
      fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '1234567890' } });
      fireEvent.change(screen.getByTestId('passwordInput'), { target: { value: 'password123' } });
      fireEvent.change(screen.getByTestId('confirmPasswordInput'), { target: { value: '123' } });
  
      const signupForm = screen.getByTestId('user-signup-form');
    
      fireEvent.submit(signupForm);
  
    await waitFor(() => {
      expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
    });
  });


});

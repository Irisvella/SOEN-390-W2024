import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from '../components/Authentication/Login'; 
import CompanyLoginForm from '../components/Authentication/CompanyLoginForm'; 
import UserLoginForm from '../components/Authentication/UserLoginForm'; 

import { BrowserRouter } from 'react-router-dom';

const renderLoginPage = () => render(
  <BrowserRouter>
    <LoginPage />
  </BrowserRouter>
);

describe('LoginPage', () => {
  test('renders correctly with initial UI elements', () => {
    renderLoginPage();
    expect(screen.getByText("Don't have an account? Register")).toBeInTheDocument();
    expect(screen.getByLabelText(/I am a:/i)).toBeInTheDocument();
  });

  test('switches to CompanyLoginForm when company role is selected', () => {
    renderLoginPage();
    const roleSelector = screen.getByLabelText(/I am a:/i);
    fireEvent.change(roleSelector, { target: { value: 'company' } });
    expect(screen.getByTestId('companyEmail')).toBeInTheDocument();
    expect(screen.queryByText('UserLoginForm')).not.toBeInTheDocument();
  });

  test('maintains UserLoginForm when public user role is re-selected', () => {
    renderLoginPage();
    fireEvent.change(screen.getByLabelText(/I am a:/i), { target: { value: 'company' } });
    fireEvent.change(screen.getByLabelText(/I am a:/i), { target: { value: 'user' } });
    expect(screen.getByTestId('userEmail')).toBeInTheDocument();
    expect(screen.queryByText('CompanyLoginForm')).not.toBeInTheDocument();
  });

  test('navigates to signup page when register link is clicked', () => {
    renderLoginPage();
    const registerLink = screen.getByText("Don't have an account? Register");
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/Signup');
  });
});

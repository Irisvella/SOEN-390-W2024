import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUp from '../components/Authentication/SignUp'; 
import UserSignupForm from '../components/Authentication/UserSignupForm'; 
import CompanySignupForm from '../components/Authentication/CompanySignupForm'; 
import { BrowserRouter } from 'react-router-dom';

const renderSignUpPage = () => render(
  <BrowserRouter>
    <SignUp />
  </BrowserRouter>
);

describe('SignUpPage', () => {
  test('renders correctly with initial UI elements', () => {
    renderSignUpPage();
    expect(screen.getByLabelText(/I am a:/i)).toBeInTheDocument();
  });

  test('switches to CompanySignupForm when company role is selected', () => {
    renderSignUpPage();
    const roleSelector = screen.getByLabelText(/I am a:/i);
    fireEvent.change(roleSelector, { target: { value: 'company' } });
    expect(screen.getByTestId('companyName')).toBeInTheDocument();
    expect(screen.queryByText('UserLoginForm')).not.toBeInTheDocument();
  });

  test('maintains UserSignupForm when public user role is re-selected', () => {
    renderSignUpPage();
    fireEvent.change(screen.getByLabelText(/I am a:/i), { target: { value: 'company' } });
    fireEvent.change(screen.getByLabelText(/I am a:/i), { target: { value: 'user' } });
    expect(screen.getByTestId('firstName')).toBeInTheDocument();
    expect(screen.queryByText('CompanyLoginForm')).not.toBeInTheDocument();
  });
});

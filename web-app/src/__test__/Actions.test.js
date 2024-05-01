import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Actions from '../components/EditProfile/src/components/Content/Actions';
import updateProfile from '../components/EditProfile/src/components/Content/AccountSettings';

jest.mock('../components/EditProfile/src/components/Content/AccountSettings', () => jest.fn());

describe('Actions Component', () => {
  test('renders update button correctly', () => {
    render(<Actions />);
    const updateButton = screen.getByTestId('update');
    expect(updateButton).toBeInTheDocument();
    expect(updateButton).toHaveTextContent('Update');
  });
});

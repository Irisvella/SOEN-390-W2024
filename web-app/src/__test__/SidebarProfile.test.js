import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from '../components/EditProfile/src/components/Sidebar/Profile';

// Mocking fetch, localStorage, and FileReader
global.fetch = jest.fn();
Storage.prototype.getItem = jest.fn();
global.FileReader = jest.fn(() => ({
  readAsDataURL: jest.fn(),
  onloadend: jest.fn()
}));

const setupMocks = (fetchResponse, fetchOk = true) => {
  fetch.mockResolvedValueOnce({
    ok: fetchOk,
    json: () => Promise.resolve(fetchResponse),
  });
  Storage.prototype.getItem.mockReturnValue('mocked_token');
};

describe('Profile Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches user profile data on component mount', async () => {
    setupMocks({
      role: 'company',
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe',
      avatar: 'path/to/avatar',
      companyName: 'ExampleCorp',
      phoneNumber: '1234567890'
    });

    render(<Profile />);
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByText('ExampleCorp')).toBeInTheDocument();
      expect(screen.getByText('user@example.com')).toBeInTheDocument();
      expect(screen.getByText('1234567890')).toBeInTheDocument();
    });
  });

  test('displays correct content based on user role', async () => {
    setupMocks({
      role: 'publicUser',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      avatar: 'path/to/avatar'
    });

    render(<Profile />);
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('ExampleCorp')).not.toBeInTheDocument();
    });
  });

  test('handles errors during fetch operation', async () => {
    setupMocks(null, false);
    render(<Profile />);
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/profile',
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Authorization': `Bearer mocked_token`,
            'Content-Type': 'application/json',
          },
        })
      );
    });
  });
});

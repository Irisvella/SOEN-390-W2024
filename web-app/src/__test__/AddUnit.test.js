import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddUnit from '../components/EditProfile/src/components/Content/AddUnit';

global.fetch = jest.fn();
Storage.prototype.getItem = jest.fn();

const setupMocks = (fetchResponse, ok = true) => {
  fetch.mockResolvedValueOnce({
    ok: ok,
    json: () => Promise.resolve(fetchResponse),
  });
  Storage.prototype.getItem.mockReturnValue('mocked_token');
};

describe('AddUnit Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupMocks({ message: 'Unit registered successfully' });
  });

  test('renders without crashing', () => {
    render(<AddUnit />);
    expect(screen.getByLabelText('Registration Code')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });

  test('allows user to enter a registration code', () => {
    render(<AddUnit />);
    const input = screen.getByLabelText('Registration Code');
    fireEvent.change(input, { target: { value: '123456' } });
    expect(input.value).toBe('123456');
  });

  test('calls registerUnit with the correct payload when the register button is clicked', async () => {
    render(<AddUnit />);
    const input = screen.getByLabelText('Registration Code');
    fireEvent.change(input, { target: { value: '123456' } });
    const button = screen.getByRole('button', { name: 'Register' });
    fireEvent.click(button);

    await waitFor(() => expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3000/registration',
      expect.objectContaining({
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer mocked_token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ registrationKey: '123456' })
      })
    ));
  });

  test('handles server errors gracefully', async () => {
    setupMocks({ message: 'Failed to register unit' }, false); // Simulate an API failure
    render(<AddUnit />);
    const button = screen.getByRole('button', { name: 'Register' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
  });
});

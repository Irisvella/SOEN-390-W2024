import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Actions from '../components/EditProfile/src/components/Sidebar/Actions';
import { BrowserRouter } from 'react-router-dom';

// Mocking fetch, localStorage, and useNavigate
global.fetch = jest.fn();
Storage.prototype.removeItem = jest.fn();
Storage.prototype.getItem = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn().mockImplementation(() => (path) => {}),
}));

const setupMocks = (fetchResponse, fetchOk = true) => {
  fetch.mockResolvedValueOnce({
    ok: fetchOk,
    json: () => Promise.resolve(fetchResponse),
  });
  Storage.prototype.getItem.mockReturnValue('mocked_token');
};

describe('Actions Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupMocks({ email: 'user@example.com' });
  });

  test('fetches user email on component mount and displays it', async () => {
    render(
      <BrowserRouter>
        <Actions />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByDisplayValue('user@example.com')).toBeInTheDocument();
    });
  });

});

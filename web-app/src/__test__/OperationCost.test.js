import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import OperationalCostsTable from '../components/financialsystem/OperationalCostsTable';
import { MemoryRouter as Router } from 'react-router-dom';

global.fetch = jest.fn();

describe('OperationalCostsTable Component', () => {
    beforeEach(() => {
        localStorage.setItem('token', 'fake_token');
        global.fetch = jest.fn(() => Promise.resolve({
          ok: true,
          json: () => Promise.resolve([
            { id: '1', propertyAddress: '1234 Main St', amount: '1000', description: 'Water Bill', paidOn: '2021-04-01' }
          ])
        }));
      });
    
      afterEach(() => {
        jest.clearAllMocks();
      });


  test('handles errors during data fetch', async () => {
    fetch.mockRejectedValue(new Error('Failed to fetch operational costs'));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
    <Router>
    <OperationalCostsTable />
    </Router>);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch operational costs:', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });
});

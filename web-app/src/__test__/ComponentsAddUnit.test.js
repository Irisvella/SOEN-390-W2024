import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddUnit from '../components/AddUnit';
import { MemoryRouter as Router } from 'react-router-dom';



describe('AddUnit Component', () => {
  const setup = () => {
    const utils = render(
    <Router>
    <AddUnit />
    </Router>
    );
    const unitNumberInput = screen.getByLabelText('Unit Number');
    const squareUnitsInput = screen.getByLabelText('Number of Square Units');
    const parkingSpotsInput = screen.getByLabelText('Number of Parking Spots');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    return {
      unitNumberInput,
      squareUnitsInput,
      parkingSpotsInput,
      submitButton,
      ...utils,
    };
  };

  test('inputs should initially be empty', () => {
    const { unitNumberInput, squareUnitsInput, parkingSpotsInput } = setup();
    expect(unitNumberInput.value).toBe('');
    expect(squareUnitsInput.value).toBe('');
    expect(parkingSpotsInput.value).toBe('');
  });

  test('allows text input and validates input as numbers', () => {
    const { unitNumberInput, squareUnitsInput, parkingSpotsInput } = setup();
    
    fireEvent.change(unitNumberInput, { target: { value: '101' } });
    fireEvent.change(squareUnitsInput, { target: { value: '300' } });
    fireEvent.change(parkingSpotsInput, { target: { value: '2' } });
    
    expect(unitNumberInput.value).toBe('101');
    expect(squareUnitsInput.value).toBe('300');
    expect(parkingSpotsInput.value).toBe('2');
    expect(screen.queryByText('Please enter a valid number')).not.toBeInTheDocument();
  });

  test('displays error message when input is invalid', () => {
    const { squareUnitsInput } = setup();
    fireEvent.change(squareUnitsInput, { target: { value: 'abc' } }); 
    fireEvent.blur(squareUnitsInput); 
    expect(screen.getByText('Please enter a valid number')).toBeInTheDocument();
  });

  test('submits form with correct data', () => {
    const { unitNumberInput, squareUnitsInput, parkingSpotsInput, submitButton } = setup();
    
    fireEvent.change(unitNumberInput, { target: { value: '101' } });
    fireEvent.change(squareUnitsInput, { target: { value: '300' } });
    fireEvent.change(parkingSpotsInput, { target: { value: '2' } });
    fireEvent.click(submitButton);

    const consoleSpy = jest.spyOn(console, 'log');
    fireEvent.submit(submitButton);

    expect(consoleSpy).toHaveBeenCalledWith('Unit data submitted:', {
      UnitNumber: '',
      squareUnits: '',
      parkingSpots: '',
    });
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Needed for <Link> components
import Navbar from '../components/Navbar';


const NavbarWithRouter = () => (
  <Router>
    <Navbar />
  </Router>
);



describe('Navbar Component', () => {
  test('renders Navbar component', () => {
    render(<NavbarWithRouter />);
    expect(screen.getByText('EstateFlow')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Why EstateFlow')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    //expect(screen.getByRole('button', { name: /login/ })).toBeInTheDocument();
  });
/*
  test('toggles mobile menu on icon click', () => {
    render(<NavbarWithRouter />);
    const menuIcon = screen.getByRole('button', { name: /menu/ });
    fireEvent.click(menuIcon); // Open mobile menu
    expect(screen.getByText('Home').closest('ul')).toHaveClass('nav-links-mobile');
    fireEvent.click(menuIcon); // Close mobile menu
    expect(screen.getByText('Home').closest('ul')).not.toHaveClass('nav-links-mobile');
  });
*/
});

describe('Navbar', () => {
    it('applies the correct class based on Mobile state', () => {
      // Render with Mobile state true
      const { rerender, getByRole } = render( <Router><Navbar Mobile={true} /> </Router>);
      let navElement = getByRole('navigation');
      expect(navElement).toHaveClass('navbar');
  
      // Rerender with Mobile state false
      rerender( <Router><Navbar Mobile={false} /></Router>);
      navElement = getByRole('navigation');
      expect(navElement).toHaveClass('navbar');
    });
  /*
    it('calls setMobile with false when clicked', () => {
      const mockSetMobile = jest.fn();
      const { container } = render(      
      <Router>
        <Navbar Mobile={true} setMobile={mockSetMobile} />
      </Router>);
       const ulElement = container.querySelector('navbar'); // .nav-links-mobile
        
    });
    */
  });
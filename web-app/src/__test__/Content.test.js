import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Content from '../components/EditProfile/src/components/Content/Content';
import AccountSettings from '../components/EditProfile/src/components/Content/AccountSettings';
import Actions from '../components/EditProfile/src/components/Content/Actions';

const renderContent = () => render(
  <MemoryRouter initialEntries={['/initial']}>
    <Routes>
      <Route path="/initial" element={<Content />} />
      <Route path="/dashboard-user" element={<div>Dashboard User Page</div>} />
    </Routes>
  </MemoryRouter>
);

describe('Content Component', () => {
  test('renders with tabs and their labels', () => {
    renderContent();
    expect(screen.getByText('Account Settings')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Link Condo')).toBeInTheDocument();
  });

  test('renders AccountSettings component when Account Settings tab is clicked', () => {
    renderContent();
    fireEvent.click(screen.getByText('Account Settings'));
    expect(screen.getByText(/account settings/i)).toBeInTheDocument();
  });

  test('shows the dashboard button in the Dashboard tab', () => {
    renderContent();
    fireEvent.click(screen.getByText('Dashboard'));
    expect(screen.getByText('To dashboard')).toBeInTheDocument();
  });

  test('navigates to dashboard user page when dashboard button is clicked', () => {
    renderContent();
    fireEvent.click(screen.getByText('Dashboard'));
    fireEvent.click(screen.getByText('To dashboard'));
    expect(screen.getByText('Dashboard User Page')).toBeInTheDocument();
  });

  test('renders Actions component', () => {
    renderContent();
    expect(screen.getByTestId("update")).toBeInTheDocument();
  });
});

import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem } from '@mui/material';

const columns = [
  { field: 'propertyAddress', headerName: 'Property Address', width: 300 },
  { field: 'unitNumber', headerName: 'Unit', width: 90 },
  { field: 'amount', headerName: 'Amount', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'dueDate', headerName: 'Due Date', width: 150 },
];

const ManagementSentBills = () => {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedStatus, setEditedStatus] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/billing/all-bills', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      setRows(data.map(bill => ({
        id: bill.id,
        propertyAddress: bill.propertyAddress,
        unitNumber: bill.unitNumber,
        amount: bill.amount,
        status: bill.status,
        dueDate: bill.payBefore.split('T')[0], // Assuming payBefore is ISO string
      })));
    })
    .catch(error => console.error('Failed to fetch billing data:', error));
  }, []);

  const handleCellClick = (params) => {
    if (params.field === 'status') {
      setSelectedRow(params.row);
      setEditedStatus(params.row.status);
      setOpenEditDialog(true);
    }
  };

  const handleStatusChange = (event) => {
    setEditedStatus(event.target.value);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
  };

  const handleEditDialogSave = () => {
    // Ensure the endpoint and the data structure are correct
    fetch(`http://localhost:3000/billing`, {  // Use the correct endpoint as your backend listens to this URL for PATCH
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        billingId: selectedRow.id, // Make sure to send billingId as expected by the backend
        status: editedStatus,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.message === "success") {
        // Update the rows to reflect the change
        setRows(rows.map(row => 
          row.id === selectedRow.id ? { ...row, status: editedStatus } : row
        ));
        setOpenEditDialog(false);
      }
    })
    .catch(error => {
      console.error('Failed to update status:', error);
      alert('Failed to update billing status. Please try again.');
    });
  };


  return (
    <div>
      <Navbar />
      <Box mt={10} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">
          Outgoing Invoices
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          onCellClick={handleCellClick}
        />
        <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
          <DialogTitle>Edit Status</DialogTitle>
          <DialogContent>
            <Select
              fullWidth
              value={editedStatus}
              onChange={handleStatusChange}
            >
              <MenuItem value="paid">paid</MenuItem>
              <MenuItem value="unpaid">unpaid</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditDialogClose}>Cancel</Button>
            <Button onClick={handleEditDialogSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default ManagementSentBills;

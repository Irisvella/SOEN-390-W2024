import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem } from '@mui/material';

const columns = [
  { field: 'propertyAddress', headerName: 'Property Address', width: 300 }, // Adjusted width for Property Address column
  { field: 'unit', headerName: 'Unit', width: 90 },
  { field: 'amount', headerName: 'Amount', width: 150, editable: true },
  { field: 'status', headerName: 'Status', width: 150, editable: false },
];

const initialRows = [
  { id: 1, propertyAddress: '123 Main St', unit: 'A101', amount: 100, status: 'Unpaid' },
  { id: 2, propertyAddress: '456 Elm St', unit: 'B202', amount: 150, status: 'Paid' },
  { id: 3, propertyAddress: '789 Oak St', unit: 'C303', amount: 120, status: 'Unpaid' },
];

const ManagementSentBills = () => {
  const [rows, setRows] = useState(initialRows);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedStatus, setEditedStatus] = useState('');

  const handleCellClick = (params) => {
    if (params.field === 'status') {
      setSelectedRow(params.row);
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
    const updatedRows = rows.map(row =>
      row.id === selectedRow.id ? { ...row, status: editedStatus } : row
    );
    setRows(updatedRows);
    setOpenEditDialog(false);
  };

  return (
    <div>
      <Navbar />
      <Box mt={10} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">
          Outgoing Invoices
        </Typography>
        <Box mt={2} width="80%">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            onCellClick={handleCellClick}
            onSelectionModelChange={(newSelection) => setSelectedRow(rows.find(row => row.id === newSelection.selectionModel[0]))}
          />
          <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
            <DialogTitle>Edit Status</DialogTitle>
            <DialogContent>
              <Select
                fullWidth
                value={editedStatus}
                onChange={handleStatusChange}
              >
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Unpaid">Unpaid</MenuItem>
              </Select>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditDialogClose}>Cancel</Button>
              <Button onClick={handleEditDialogSave}>Save</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </div>
  );
};

export default ManagementSentBills;

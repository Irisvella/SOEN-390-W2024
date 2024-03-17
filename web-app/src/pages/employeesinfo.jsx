import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import sampleAddressImage from '../assets/images/sampleproperty.png';
import { Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import AddEmployee from '../../src/pages/addemployee';
import { Pages } from '@mui/icons-material';
import { Link } from 'react-router-dom';

/* Sample data columns for the DataGrid */
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150, editable: true },
  { field: 'lastName', headerName: 'Last name', width: 150, editable: true },
  { field: 'role', headerName: 'Role', width: 150, editable: true },
];

/* Initial data for the DataGrid rows */
const initialRows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', role: 'Finance' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', role: 'Management' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', role: 'Events' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', role: 'Finance' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', role: 'Events' },
  { id: 6, lastName: 'Melisandre', firstName: 'Sarah', role: 'Events' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', role: 'Management' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', role: 'Finance' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', role: 'Events' },
];

const Employeesinfo = () => {
    const [editMode, setEditMode] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [rows, setRows] = useState(initialRows);
  

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSaveChanges = () => {
    // Backend developer: Implement logic to save changes to the backend
    console.log('Changes saved!');
    // After saving, disable edit mode
    setEditMode(false);
  };

  const handleEditCellChange = (params) => {
    // Backend developer: Handle changes made during inline editing
    console.log(`Edit row with ID ${params.id}, field ${params.field}, value ${params.props.value}`);
  };

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    // Backend developer: Implement logic to delete selected rows in the backend (using PostgreSQL)
    // Filter out the selected rows from the current state
    const updatedRows = rows.filter((row) => !selectedRows.includes(row.id));

    // Update the state with the remaining rows
    setRows(updatedRows);

    // Close the delete confirmation dialog
    setOpenDeleteDialog(false);

    // Clear the selected rows after deletion
    setSelectedRows([]);
  };

  const handleDeleteCancel = () => {
    // Close the delete confirmation dialog without deleting
    setOpenDeleteDialog(false);
  };

  const handleSelectionModelChange = (newSelection) => {
    setSelectedRows(newSelection.selectionModel);
  };

  return (
    <div>
      <Navbar />
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} textAlign="center">
          {/* Wrapper Box for layout control */}
          <Box mt={10} display="flex" flexDirection="column" alignItems="center">
            <img src={sampleAddressImage} alt="Sample Address" style={{ width: '40%', height: 'auto', margin: 'auto' }} />
            <Typography variant="h6" mt={2}>
              22 forest hill drive
            </Typography>
            <Box mt={2} width="80%">
              {/* Adjusted width */}
              <Button variant="outlined" color="primary" onClick={handleToggleEditMode}>
                {editMode ? 'Cancel Editing' : 'Edit Table'}
              </Button>
              {!editMode && (
                // Render "Add Employee" button only when not in edit mode
                <Link to="/Addemployee" style={{ textDecoration: 'none' }}>
                <Button variant="outlined" color="primary" style={{ marginLeft: '8px' }} onClick={() => console.log('Add Employee clicked')}>
                  Add Employee
                </Button>
                </Link>
              )}
              {editMode && (
                <>
                  <Button variant="outlined" color="primary" onClick={handleSaveChanges}>
                    Save Changes
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={handleDelete}>
                    Delete Selected Rows
                  </Button>
                </>
              )}
              <DataGrid
                rows={rows}
                columns={columns.map((col) => ({
                  ...col,
                  editable: editMode && col.field !== 'role', // Allow editing except for 'role'
                }))}
                pageSize={5}
                checkboxSelection
                onEditCellChange={handleEditCellChange}
                editMode={editMode ? 'row' : undefined}
                selectionModel={selectedRows}
                onSelectionModelChange={handleSelectionModelChange}
              />
            </Box>
            {/* Delete Confirmation Dialog */}
            <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete the selected rows?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDeleteCancel} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleDeleteConfirm} color="secondary">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};
export default Employeesinfo;

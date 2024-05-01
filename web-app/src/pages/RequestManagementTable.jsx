import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, TextField } from '@mui/material';
import Navbar from '../components/Navbar';

const RequestManagementTable = () => {
  const [requests, setRequests] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [editedStatus, setEditedStatus] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  useEffect(() => {
    fetch('https://estate-api-production.up.railway.app/CreateRequest/viewRequests', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      setRequests(data.map(request => ({
        ...request,
        id: request.id,
        issuedAt: new Date(request.issued_at).toLocaleDateString(),
        dateNeeded: request.date_needed ? new Date(request.date_needed).toLocaleDateString() : "N/A"
      })));
    })
    .catch(error => console.error('Failed to fetch requests:', error));
  }, []);

  const handleCellClick = (params) => {
    if (params.field === 'status') {
      setSelectedRequest(params.row);
      setEditedStatus(params.row.status);
      setEmployeeId(''); // Reset employee ID field
      setOpenEditDialog(true);
    }
  };

  const handleStatusChange = (event) => {
    setEditedStatus(event.target.value);
  };

  const handleEmployeeIdChange = (event) => {
    setEmployeeId(event.target.value);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
  };

  const handleEditDialogSave = () => {
    console.log("Save changes for request:", selectedRequest, editedStatus, employeeId);
    setOpenEditDialog(false);  // Close the dialog to prevent multiple submissions
  
    const url = 'https://estate-api-production.up.railway.app/CreateRequest/update-request';  // Adjust the URL as necessary
    const token = localStorage.getItem('token');  // Assuming token is stored in localStorage

    // Check the status and adjust accordingly
    let body = { requestId: selectedRequest.id };
    if (selectedRequest.status === 'unassigned' && employeeId) {
        body.employeeId = parseInt(employeeId);
        body.newStatus = 'in_progress';  // Ensure this matches backend expectation
    } else if (selectedRequest.status === 'in_progress') {
        body.newStatus = 'completed';
    }

    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    };
  
    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.message === "Request updated successfully") {
                alert('Request updated successfully');
                fetchRequests();  // Refresh the data to show updates
            } 
        })
        .catch(error => {
            console.error('Failed to send update request:', error);
        });
};

const fetchRequests = () => {
  fetch('https://estate-api-production.up.railway.app/CreateRequest/viewRequests', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => {
    setRequests(data.map(request => ({
      ...request,
      id: request.id,
      issuedAt: new Date(request.issued_at).toLocaleDateString(),
      dateNeeded: request.date_needed ? new Date(request.date_needed).toLocaleDateString() : "N/A"
    })));
  })
  .catch(error => console.error('Failed to fetch requests:', error));
};

  const columns = [
    { field: 'title', headerName: 'Request Title', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'request_priority', headerName: 'Priority', width: 130 },
    { field: 'issued_at', headerName: 'Issued On', width: 130 },
    { field: 'date_needed', headerName: 'Date Needed', width: 130 },
    { field: 'address', headerName: 'Property Address', width: 200 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Button onClick={() => handleCellClick(params)} style={{ width: '100%' } } disabled={params.value === 'completed'} >
          {params.value}
          
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Navbar />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 12, mb: 10 }}>
        <Typography variant="h4" gutterBottom>
          All Requests
        </Typography>
        <DataGrid
          rows={requests}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
        <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
          <DialogTitle>Edit Request Status</DialogTitle>
          <DialogContent>
            {selectedRequest && selectedRequest.status === 'unassigned' ? (
              <>
                <TextField
                  fullWidth
                  label="Employee ID"
                  type="number"
                  value={employeeId}
                  onChange={handleEmployeeIdChange}
                  margin="normal"
                />
                <Select
                  fullWidth
                  value={editedStatus}
                  onChange={handleStatusChange}
                  margin="normal"
                >
                  <MenuItem value="in_progress">Assign to Employee</MenuItem>
                </Select>
              </>
            ) : (
              <Select
                fullWidth
                value={editedStatus}
                onChange={handleStatusChange}
                margin="normal"
              >
                <MenuItem value="completed">Mark as Completed</MenuItem>
              </Select>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditDialogClose}>Cancel</Button>
            <Button onClick={handleEditDialogSave} color="primary">Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default RequestManagementTable;

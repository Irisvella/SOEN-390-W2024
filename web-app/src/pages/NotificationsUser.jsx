// Filename: NotificationsUser.jsx
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Chip, Snackbar, Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Navbar from '../components/Navbar';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NotificationsUser = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/notifications', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorMsg = `HTTP error! status: ${response.status}`;
      console.error("Failed to fetch notifications:", errorMsg);
      setAlertMessage("Failed to fetch notifications: " + errorMsg);
      setOpenSnackbar(true);
      return;
    }

    const data = await response.json();
    setNotifications(data.data.notifications.map(notif => ({
      ...notif,
      id: notif.id,
      inserted_at: new Date(notif.inserted_at).toLocaleString()
    })));
  };

  const handleRowClick = (params) => {
    setSelectedNotification(params.row);
    setOpenDialog(true);
  };

  const handleCloseDialog = async () => {
    if (selectedNotification && !selectedNotification.seen) {
      await markNotificationAsSeen(selectedNotification.id);
    }
    setOpenDialog(false);
  };

  const markNotificationAsSeen = async (notificationId) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:3000/notifications/${notificationId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  };

  const columns = [
    { field: 'title', headerName: 'Request Title', width: 200 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'inserted_at', headerName: 'Date', width: 180 },
    {
      field: 'seen',
      headerName: 'Seen',
      width: 100,
      renderCell: (params) => (
        <Chip label={params.value ? 'Seen' : 'Unseen'} color={params.value ? 'success' : 'error'} variant="outlined" />
      )
    }
  ];

  return (
    <div>
      <Navbar />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8, mb: 6 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>Notifications</Typography>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={notifications}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            onRowClick={handleRowClick}
          />
        </Box>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Notification Details</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Title: {selectedNotification?.title}</Typography>
          <Typography variant="body1">Status: {selectedNotification?.status}</Typography>
          <Typography variant="body1">Date: {selectedNotification?.inserted_at}</Typography>
          <Typography variant="body1">Seen: {selectedNotification?.seen ? 'Yes' : 'No'}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NotificationsUser;

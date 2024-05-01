import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Chip, Snackbar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Navbar from '../components/Navbar';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NotificationsUser = () => {
    const [notifications, setNotifications] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);

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
        try {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setNotifications(data.data.notifications.map(notif => ({
                ...notif,
                id: notif.id,
                inserted_at: new Date(notif.inserted_at).toLocaleString()
            })));
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
            setAlertMessage("Failed to fetch notifications: " + error.message);
            setOpenAlert(true);
        }
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    const handleOpenDialog = (notification) => {
        setSelectedNotification(notification);
        setOpenDialog(true);
    };

    const handleCloseDialog = async () => {
        if (selectedNotification && !selectedNotification.seen) {
            await markNotificationAsSeen(selectedNotification.id);
        }
        fetchNotifications();
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
        {
            field: 'message',
            headerName: 'Message',
            width: 310,
            renderCell: (params) => {
                let message = '';
                switch (params.row.status) {
                    case 'unassigned':
                        message = 'Your request has been submitted.';
                        break;
                    case 'completed':
                        message = 'Your request has been marked as completed.';
                        break;
                    case 'in_progress':
                        message = 'Your request has been seen and is in progress.';
                        break;
                    default:
                        message = 'Status not recognized.';
                }
                return <span>{message}</span>;
            }
        },
        { field: 'title', headerName: 'Request Title', width: 200 },
        { field: 'inserted_at', headerName: 'Date', width: 180 },
        {
            field: 'seen',
            headerName: 'Seen',
            width: 100,
            renderCell: (params) => (
                <Chip label={params.value ? 'Seen' : 'Unseen'} color={params.value ? 'success' : 'error'} variant="outlined" />
            )
        },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            renderCell: (params) => (
                <Button onClick={() => handleOpenDialog(params.row)}>View Details</Button>
            ),
            width: 150
        }

    ];
    
    

    return (
        <div>
            <Navbar />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8, mb: 6 }}>
                <Typography variant="h4" sx={{ mb: 4 }}>
                    Notifications
                </Typography>
                <Box sx={{ height: '60%', width: 'flex' }}>
                    <DataGrid
                        rows={notifications}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </Box>
            </Box>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Notification Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {selectedNotification ? `Request: ${selectedNotification.title}` : ''}
                    </DialogContentText>
                    <DialogContentText>
                        {selectedNotification ? `Status: ${selectedNotification.status}` : ''}
                    </DialogContentText>
                    <DialogContentText>
                        {selectedNotification ? `Date: ${selectedNotification.inserted_at}` : ''}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default NotificationsUser;

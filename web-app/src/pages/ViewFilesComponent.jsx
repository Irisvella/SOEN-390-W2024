import React, { useState, useEffect } from 'react';
import { Box, Typography, MenuItem, Select, FormControl, InputLabel, List, ListItem, ListItemText, Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Navbar from '../components/Navbar';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ViewFilesComponent = () => {
    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState('');
    const [files, setFiles] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const BucketUrl = 'https://wvoqgfpyksgruootcynr.supabase.co/storage/v1/object/public/property-files/'

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        const response = await fetch('http://localhost:3000/dashboard', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await response.json();
        setProperties(data);
    };

    const handlePropertyChange = async (event) => {
        setSelectedProperty(event.target.value);
        const response = await fetch(`http://localhost:3000/files/list-files?property_id=${event.target.value}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (!response.ok) {
            const errorMsg = await response.text(); 
            setAlertMessage('Failed to fetch files: ' + errorMsg);
            setOpenAlert(true);
            setFiles([]);
        } else {
            const result = await response.json();
            if (result.files.length === 0) {
                setAlertMessage('No files found for the selected property.');
                setOpenAlert(true);
            }
            setFiles(result.files);
        }
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    return (
        <div>
            <Navbar />
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6">View Files for Property</Typography>
                <FormControl sx={{ mt: 2, mb: 2, width: '30%' }}>
                    <InputLabel id="property-select-label">Select Property</InputLabel>
                    <Select
                        labelId="property-select-label"
                        id="property-select"
                        value={selectedProperty}
                        onChange={handlePropertyChange}
                    >
                        {properties.map((property) => (
                            <MenuItem key={property.id} value={property.id}>
                                {property.address}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {files.length > 0 && (
                    <List dense={true} sx={{ width: '100%' }}>
                        {files.map((file, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={file.description || file.file_type}
                                    secondary={`File Type: ${file.file_type}`}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component="a"
                                    target="_blank"
                                    href={BucketUrl + file.file_key}
                                >
                                    View
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                )}
                <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="info" sx={{ width: '100%' }}>
                        {alertMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </div>
    );
};

export default ViewFilesComponent;

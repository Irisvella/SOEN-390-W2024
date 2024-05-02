// Filename: ViewFilesComponent.jsx
// Author: Sarah Abellard
// Description: frontend form to view files for user
// Dependencies: React, MUI
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Navbar from '../components/Navbar';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FilesUser = () => {
  const { propertyId } = useParams();  // Get property ID from URL
  const [files, setFiles] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const BucketUrl = 'https://wvoqgfpyksgruootcynr.supabase.co/storage/v1/object/public/property-files/'

  useEffect(() => {
    fetchFiles(propertyId);  // Fetch files when component mounts and when propertyId changes
  }, [propertyId]);

  const fetchFiles = async (propertyId) => {
    const response = await fetch(`https://estate-api-production.up.railway.appfiles/list-files?property_id=${propertyId}`, {
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
      } else {
        setFiles(result.files);
      }
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
        <Typography variant="h6">All Files for Selected Property</Typography>
        {files.length > 0 && (
          <List dense={true} sx={{ width: '100%' }}>
            {files.map((file, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={file.description || file.file_type}
                  secondary={`File Type: ${file.file_type}`}
                />
                <ListItemText
                    primary={`${file.description}`}
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

export default FilesUser;

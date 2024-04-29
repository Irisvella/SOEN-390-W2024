// Filename: FileUploadComponent.jsx
// Author: Sarah Abellard
// Description: frontend form to upload files for condo management companies
// Dependencies: React, MUI
import React, { useState, useEffect } from 'react';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Box, Typography, CircularProgress } from '@mui/material';
import Navbar from '../components/Navbar';

const FileUploadComponent = () => {
    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState('');
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState('');
    const [fileDescription, setFileDescription] = useState('');
    const [uploading, setUploading] = useState(false); // State to manage loading indicator

    useEffect(() => {
        const fetchProperties = async () => {
            const response = await fetch('http://localhost:3000/dashboard', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            setProperties(data);
        };

        fetchProperties();
    }, []);

    const handlePropertyChange = (event) => {
        setSelectedProperty(event.target.value);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileTypeChange = (event) => {
        setFileType(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setFileDescription(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file || !selectedProperty) {
            alert('Please select a property and a file.');
            return;
        }

        setUploading(true); // Start loading
        const formData = new FormData();
        formData.append('file', file);
        formData.append('property_id', selectedProperty);
        formData.append('file_type', fileType);
        formData.append('description', fileDescription);

        const response = await fetch('http://localhost:3000/files/upload-file', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        });

        
        if (response.ok) {
            setUploading(false); // Stop loading
            const result = await response.json();
            alert('File uploaded successfully: ' + result.data.file_key);
        } else {
            const errorMsg = await response.text(); // Assuming the error message is plain text
            alert('Failed to upload file: ' + errorMsg);
        }
    };

    return (
        <div>
            <Navbar />
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6">Upload File to Property</Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="property-label">Property</InputLabel>
                        <Select
                            labelId="property-label"
                            id="property-select"
                            value={selectedProperty}
                            label="Property"
                            onChange={handlePropertyChange}
                        >
                            {properties.map((property) => (
                                <MenuItem key={property.id} value={property.id}>
                                    {property.address}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="file"
                        id="file"
                        name="file"
                        onChange={handleFileChange}
                    />
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="file-type-label">File Type</InputLabel>
                        <Select
                            labelId="file-type-label"
                            id="file-type-select"
                            value={fileType}
                            label="File Type"
                            onChange={handleFileTypeChange}
                        >
                            <MenuItem value="declarations">Declarations</MenuItem>
                            <MenuItem value="annual_budgets">Annual budgets</MenuItem>
                            <MenuItem value="board_meeting_minutes">Board meeting minutes</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={fileDescription}
                        onChange={handleDescriptionChange}
                        inputProps={{ maxLength: 100 }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={uploading}  // Disable the button when uploading
                    >
                        {uploading ? <CircularProgress size={24} /> : "Upload File"}
                    </Button>
                </Box>
            </Box>
        </div>
    );
};

export default FileUploadComponent;

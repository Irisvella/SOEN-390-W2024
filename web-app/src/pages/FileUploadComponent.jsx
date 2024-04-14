import React, { useState, useEffect } from 'react';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Box, Typography } from '@mui/material';
import Navbar from '../components/Navbar'; // Adjust path as needed

const FileUploadComponent = () => {
    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState('');
    const [file, setFile] = useState(null);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file || !selectedProperty) {
            alert('Please select a property and a file.');
            return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
        formData.append('property_id', selectedProperty);
    
        const response = await fetch('http://localhost:3000/files/upload-file', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
                // 'Content-Type': 'application/json' // Remove this line
            },
            body: formData
        });
    
        if (response.ok) {
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Upload File
                    </Button>
                </Box>
            </Box>
        </div>
    );
};

export default FileUploadComponent;

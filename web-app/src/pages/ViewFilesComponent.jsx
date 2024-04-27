import React, { useState, useEffect } from 'react';
import { Box, Typography, MenuItem, Select, FormControl, InputLabel, List, ListItem, ListItemText, Button } from '@mui/material';
import Navbar from '../components/Navbar'; 

const ViewFilesComponent = () => {
    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState('');
    const [files, setFiles] = useState([]);

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
        const result = await response.json();
        setFiles(result.files);
    };

    return (
        <div>
            <Navbar />
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6">View Files for Property</Typography>
                <FormControl sx={{ mt: 2, mb: 2 }}>
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
                <List dense={true}>
                    {files.map((file, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={file.name}
                                secondary={`Uploaded on: ${new Date(file.created_at).toLocaleDateString()}`}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                component="a"
                                href={file.signedUrl}
                                download
                            >
                                Download
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </div>
    );
};

export default ViewFilesComponent;

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert, Container } from '@mui/material';
import Grid from '@mui/material/Grid';  // Import Grid from MUI for layout
import Navbar from '../components/Navbar';

const CreateBillRequest = () => {
    const [billingData, setBillingData] = useState({
        address: '',
        unitNumber: '',
        amount: '',
        payBefore: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBillingData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');
        const token = localStorage.getItem('token');

        // Convert amount to a float and payBefore to an ISO string
        const formattedData = {
            ...billingData,
            amount: parseFloat(billingData.amount),
            payBefore: new Date(billingData.payBefore).toISOString() // Convert to ISO string
        };

        fetch('http://localhost:3000/billing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, 
            },
            body: JSON.stringify(formattedData)
        })
        .then(response => {
            if (!response.ok) throw response;
            return response.json();
        })
        .then(data => {
            setSuccess('Billing information added successfully!');
        })
        .catch(async error => {
            const errMsg = await error.json();
            setError(errMsg.message || 'Failed to add billing.');
        });
    };

    return (
      <div>
      <Navbar />
        <Container maxWidth="sm" style={{marginTop: '100px'}}>  
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
                    Add Billing Information
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}
                <Grid container spacing={2} direction="column">  
                    <Grid item>
                        <TextField
                            required
                            fullWidth
                            id="address"
                            label="Property Address"
                            name="address"
                            value={billingData.address}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            fullWidth
                            id="unitNumber"
                            label="Unit Number"
                            name="unitNumber"
                            value={billingData.unitNumber}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            fullWidth
                            id="amount"
                            label="Amount"
                            name="amount"
                            type="number"
                            value={billingData.amount}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            fullWidth
                            id="payBefore"
                            label="Pay Before"
                            name="payBefore"
                            type="date"
                            value={billingData.payBefore}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add Billing
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
        </div>
        
    );
};

export default CreateBillRequest;


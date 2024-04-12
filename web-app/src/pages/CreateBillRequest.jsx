import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const CreateBillRequest = () => {
    const [billingData, setBillingData] = useState({
        address: '',
        unitNumber: '',
        amount: '',
        payBefore: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBillingData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        
        // Convert amount to a float and payBefore to an ISO string
        const formattedData = {
            ...billingData,
            amount: parseFloat(billingData.amount),
            payBefore: new Date(billingData.payBefore).toISOString() // Convert to ISO string
        };

        // Example API call using fetch
        fetch('http://localhost:3000/billing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Ensure proper authorization header
            },
            body: JSON.stringify(formattedData)
        })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Add Billing Information
            </Typography>
            <TextField
                required
                id="address"
                label="Property Address"
                name="address"
                value={billingData.address}
                onChange={handleChange}
                margin="normal"
            />
            <TextField
                required
                id="unitNumber"
                label="Unit Number"
                name="unitNumber"
                value={billingData.unitNumber}
                onChange={handleChange}
                margin="normal"
            />
            <TextField
                required
                id="amount"
                label="Amount"
                name="amount"
                type="number"
                value={billingData.amount}
                onChange={handleChange}
                margin="normal"
            />
            <TextField
                required
                id="payBefore"
                label="Pay Before"
                name="payBefore"
                type="date"
                value={billingData.payBefore}
                onChange={handleChange}
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
            />
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Add Billing
            </Button>
        </Box>
    );
};

export default CreateBillRequest;

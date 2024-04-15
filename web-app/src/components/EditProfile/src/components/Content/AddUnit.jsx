// Filename: addUnit.jsx
// Author: Andy Gao
// Description: Registering condo units to the user's account
// Dependencies: React, MUI (Material-UI)

import { FormControl, FormLabel, Grid, Input, Select, Button, useToast } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react';

function AddUnit() {

const [registrationCode, setRegistrationCode] = useState(''); // State to store registration code
const toast = useToast(); // Using Chakra UI's Toast for feedback


    const registerUnit = async () => {
        const token = localStorage.getItem('token');
        const payload = {
            registrationKey: registrationCode
        }
        console.log('Sending payload:', payload);
        try {
            const response = await fetch('https://estate-api-production.up.railway.app/registration', {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                console.log('Unit registered successfully');
            } else {
                console.error('Failed to register unit:', data.message);
            }
        } catch (error) {
            console.error('Error registering unit:', error);
        }
    }


return (
    <Grid>
        <FormControl>
            <FormLabel htmlFor="registration-code">Registration Code</FormLabel>
            <Input
                focusBorderColor="brand.blue"
                type="text"
                id="registration-code"
                value={registrationCode}
                onChange={(e) => setRegistrationCode(e.target.value)}
            />
        </FormControl>
        <Button 
        onClick={registerUnit}
        style={{ width: '150px', height: '40px', marginTop: '50px' }}>Register</Button>
    </Grid>
)
}
export default AddUnit
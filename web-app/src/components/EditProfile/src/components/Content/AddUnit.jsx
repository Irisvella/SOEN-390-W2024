import { FormControl, FormLabel, Grid, Input, Select, Button } from '@chakra-ui/react'
import { useEffect } from 'react'

function AddUnit() {

//const [registrationCode, setRegistrationCode] = useState(''); 

useEffect(() => {
    const registerUnit = async () => {
        const token = localStorage.getItem('token');
        const payload = {
            registrationCode
        }
        console.log('Sending payload:', payload);
        try {
            const response = await fetch('http://localhost:3000/profile', {
                method: 'POST',
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
})

return (
    <Grid>
        <FormControl>
            <FormLabel>Registration Code</FormLabel>
            <Input
                      focusBorderColor="brand.blue"
                      type="registrationCode"
                      //value={registrationCode}
                      //onChange={(e) => setRegistrationCode(e.target.value)}
            
            />
        </FormControl>
        <Button style={{ width: '150px', height: '40px', marginTop: '50px' }}>Register</Button>
    </Grid>
)
}
export default AddUnit
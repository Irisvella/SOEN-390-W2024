import { Box, Button } from '@chakra-ui/react'
import updateProfile from './AccountSettings'

function Actions() {
  
  return (
    <Box mt={5} py={5} px={8} borderTopWidth={1} borderColor="brand.light">
       <Button onClick={updateProfile} data-testid="update">Update</Button>
    </Box>
  )
}

export default Actions

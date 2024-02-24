import { useEffect, useRef, useState } from 'react'
import {
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  useClipboard,
  VStack,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

export default function Actions() {
  const [userEmail, setUserEmail] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserEmail = async () => {
      const token = localStorage.getItem('token'); 
      try {
        const response = await fetch('http://localhost:3000/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok) {
                    // need to adjusst/make sure user email is sent from the backened 

          setUserEmail(data.email); 
        } else {
          console.error('Failed to fetch email:', data.message);
        }
      } catch (error) {
        console.error('Error fetching email:', error);
      }
    };

    fetchUserEmail();
  }, []);

  const { hasCopied, onCopy } = useClipboard(userEmail)

  const profileUrl = useRef(null)

  useEffect(() => {
    if (hasCopied) {
      profileUrl.current.focus()
      profileUrl.current.select()
    }
  })

  const logout = () => {
    localStorage.removeItem('token'); 
    navigate('/login');
  };
  

  return (
    <VStack py={8} px={5} spacing={3}>
      <InputGroup>
        <Input
          ref={profileUrl}
          type="url"
          color="brand.blue"
          value={userEmail}
          userSelect="all"
          isReadOnly
          _focus={{ borderColor: 'brand.blue' }}
        />
        <InputRightAddon bg="transparent" px={0} overflow="hidden">
          <Button onClick={onCopy} variant="link">
          </Button>
        </InputRightAddon>
      </InputGroup>
      <Button colorScheme="red" onClick={logout}>Logout</Button>
    </VStack>
  )
}

import SimpleBar from 'simplebar-react'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../helpers'
import Cover from '../components/Cover'
import Main from '../components/Main'

export default function MinApp() {
  return (
    <ChakraProvider theme={theme}>
      <SimpleBar style={{ maxHeight: '100vh' }}>
        <Cover></Cover><Main></Main>
      </SimpleBar>
    </ChakraProvider>
  );
}

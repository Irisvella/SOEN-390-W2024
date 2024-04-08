import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

import AccountSettings from './AccountSettings'
import AddUnit from './AddUnit'
import Actions from './Actions'
import { Link } from 'react-router-dom'

const Content = () => {
  const tabs = ['Account Settings', 'Dashboard', "Link Condo"]

  return (
    <Box
      as="main"
      flex={3}
      d="flex"
      flexDir="column"
      justifyContent="space-between"
      pt={5}
      bg="white"
      rounded="md"
      borderWidth={1}
      borderColor="gray.200"
      style={{ transform: 'translateY(-100px)' }}
    >
      <Tabs>
        <TabList px={5}>
          {tabs.map(tab => (
            <Tab
              key={tab}
              mx={3}
              px={0}
              py={3}
              fontWeight="semibold"
              color="brand.cadet"
              borderBottomWidth={1}
              _active={{ bg: 'transparent' }}
              _selected={{ color: 'brand.dark', borderColor: 'brand.blue' }}
            >
              {tab}
            </Tab>
          ))}
        </TabList>

        <TabPanels px={3} mt={5}>
          <TabPanel>
            <AccountSettings />
          </TabPanel>
          <TabPanel>
            <buttton style={{ 
                textDecoration: 'none',
                backgroundColor: '#4164e3',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }} 
              className='to-dashboard'>
                  <Link style={{color: "white"}} to= "/dashboard-user" className='to-dashboard'> To dashboard </Link>
            </buttton>
          </TabPanel>
          <TabPanel>
            <AddUnit />
          </TabPanel> 
        </TabPanels>
      </Tabs>

      <Actions />
    </Box>
  )
}

export default Content

// OpenRequestManagementPage.tsx
import React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

import Sidebar from '../components/Sidebar';
import OpenRequestManagementForm from '../components/OpenRequestManagementForm';
import OrderList from '../components/OrderList';
import Header from '../components/Header';

// Add your property details here
const propertyDetails = {
  name: "36 Lee drive",
  address: "H8B 3M6"
};

export default function OpenRequestManagementPage() {
  // You can manage state or perform other logic here

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Header />
        <Sidebar />
        <Box
          component="main"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100vh',
            gap: 1,
          }}
        >
          <Breadcrumbs
            size
="sm"
aria-label="breadcrumbs"
separator={<ChevronRightRoundedIcon />}
>
<Link underline="none" color="neutral" href="#home" aria-label="Home">
<HomeRoundedIcon />
</Link>
<Link underline="hover" color="neutral" href="#dashboard" fontSize={12} fontWeight={500}>
Dashboard
</Link>
<Typography color="primary" fontWeight={500} fontSize={12}>
Open Requests
</Typography>
</Breadcrumbs>
<Box
sx={{
display: 'flex',
mb: 1,
gap: 1,
flexDirection: { xs: 'column', sm: 'row' },
alignItems: { xs: 'start', sm: 'center' },
flexWrap: 'wrap',
justifyContent: 'space-between',
}}
>
<Typography level="h2" component="h1">
Open Requests
</Typography>
<Button
color="primary"
startDecorator={<DownloadRoundedIcon />}
size="sm"
>
Download PDF
</Button>
</Box>
{/* Property Name and Address */}
<Box sx={{ my: 2 }}>
  <Typography level="h4" component="h2">{propertyDetails.name}</Typography>
  <Typography>{propertyDetails.address}</Typography>
</Box>
<OpenRequestManagementForm />
<OrderList />
</Box>
</Box>
</CssVarsProvider>
);
}

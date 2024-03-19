import React from 'react';
import Navbar from '../components/Navbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ManagementSentBills from '../components/financialsystem/ManagementSentBills';
import OperationalCostsTable from '../components/financialsystem/OperationalCostsTable';

const ManagementFinancialOverview = () => {
  return (
    <div>
      <Navbar />
      <Box mt={10} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">
          Management Financial Overview
        </Typography>
        
          <ManagementSentBills />
          <OperationalCostsTable />

      </Box>
    </div>
  );
};

export default ManagementFinancialOverview;

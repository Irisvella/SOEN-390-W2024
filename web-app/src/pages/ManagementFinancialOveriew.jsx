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
        <Box mt={4} width="80%">
          <Typography variant="h6" mb={2}>
            Outgoing Invoices
          </Typography>
          <ManagementSentBills />
          <Typography variant="h6" mt={4} mb={2}>
            Operational Costs
          </Typography>
          <OperationalCostsTable />
        </Box>
      </Box>
    </div>
  );
};

export default ManagementFinancialOverview;

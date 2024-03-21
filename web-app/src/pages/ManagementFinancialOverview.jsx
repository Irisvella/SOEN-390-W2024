import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ManagementSentBills from '../components/financialsystem/ManagementSentBills';
import OperationalCostsTable from '../components/financialsystem/OperationalCostsTable';
import Button from '@mui/material/Button'; 

const ManagementFinancialOverview = () => {
  return (
    <div>
      <Navbar />
      <Box mt={10} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">
          Management Financial Overview
        </Typography>

        <ManagementSentBills />

        {/* Button to navigate to CreateBillRequest page */}
        <Link to="/CreateBillRequest" style={{ textDecoration: 'none', paddingTop:'2%' }}> {/* Use "to" instead of "route" */}
          <Button variant="contained" color="primary" mt={2}>
            Add Bill
          </Button>
        </Link>

        <OperationalCostsTable />

        {/* Button to navigate to AddOperationalCost page */}
        <Link to="/AddOperationalCost" style={{ textDecoration: 'none', paddingTop:'2%' }}> {/* Use "to" instead of "route" */}
          <Button variant="contained" color="primary" mt={2}>
            Add Operational Cost
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default ManagementFinancialOverview;

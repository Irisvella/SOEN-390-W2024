import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import ManagementSentBills from '../components/financialsystem/ManagementSentBills';
import OperationalCostsTable from '../components/financialsystem/OperationalCostsTable';

const ManagementFinancialOverview = () => {
  const [openReportDialog, setOpenReportDialog] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState({ sentBillsTotal: 0, operationalCostsTotal: 0, summaryTotal: 0 });

  const handleOpenReportDialog = () => setOpenReportDialog(true);
  const handleCloseReportDialog = () => setOpenReportDialog(false);

  const handleGenerateReport = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, please log in.');
      return;
    }
  
    fetch(`https://estate-api-production.up.railway.app/billing/financial-report?startDate=${startDate}&endDate=${endDate}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch data: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      setReportData({
        sentBillsTotal: data.sentBillsTotal,
        operationalCostsTotal: data.operationalCostsTotal,
        summaryTotal: data.sentBillsTotal - data.operationalCostsTotal
      });
      handleCloseReportDialog();
    })
    .catch(error => {
      console.error('Failed to fetch report data:', error);
    });
  };
  

  return (
    <div>
      <Navbar />
      <Box mt={10} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">
          Management Financial Overview
        </Typography>

        <ManagementSentBills />

        <Link to="/CreateBillRequest" style={{ textDecoration: 'none', marginTop: 16 }}>
          <Button variant="contained" color="primary">
            Add Bill
          </Button>
        </Link>

        <OperationalCostsTable />

        <Link to="/AddOperationalCost" style={{ textDecoration: 'none', marginTop: 16 }}>
          <Button variant="contained" color="primary">
            Add Operational Cost
          </Button>
        </Link>

        <Button variant="contained" color="primary" onClick={handleOpenReportDialog} sx={{ mt: 2 }}>
          Generate Report
        </Button>

        <Dialog open={openReportDialog} onClose={handleCloseReportDialog}>
          <DialogTitle>Generate Financial Report</DialogTitle>
          <DialogContent>
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ mt: 2 }}
            />
            <TextField
              label="End Date"
              type="date"
              fullWidth
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ mt: 2, mb: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseReportDialog}>Cancel</Button>
            <Button onClick={handleGenerateReport}>Submit</Button>
          </DialogActions>
        </Dialog>

        {reportData.sentBillsTotal > 0 && (
          <Box mt={2}>
            <Typography>
              Paid Sent Bills Total: ${reportData.sentBillsTotal.toFixed(2)}
            </Typography>
            <Typography>
              Operational Costs Total: ${reportData.operationalCostsTotal.toFixed(2)}
            </Typography>
            <Typography>
              Summary Total: ${reportData.summaryTotal.toFixed(2)}
            </Typography>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default ManagementFinancialOverview;

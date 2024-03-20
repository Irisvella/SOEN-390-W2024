// OpenRequestManagementForm.tsx
import * as React from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";

// Sample rows for demonstration
const rows = [
  {
    id: 1,
    requestType: "Moving Out (Elevator Request)",
    date: "18/03/2024",
    time: "12pm - 3pm",
    status: "Awaiting Response"
  },
  {
    id: 2,
    requestType: "Deficiency in common areas",
    details: "No more snacks in the common area, we...",
    status: "Task assigned"
  },
  {
    id: 3,
    requestType: "Reporting a violation",
    details: "Unit 4 has been practicing tap dancing during...",
    status: "Resolved"
  },
];

// The following functions can be adjusted as necessary for sorting
// ...

export default function OpenRequestManagementForm() {
  // State and other logic can be added here

  // The renderFilters function would need to be updated to filter open requests
  const renderFilters = () => (
    <Box sx={{
      display: { xs: "none", sm: "flex" },
      gap: 1.5,
      mb: 2,
    }}>
      <FormControl size="sm">
        <FormLabel htmlFor="status-filter">Status</FormLabel>
        <Select
          id="status-filter"
          size="sm"
          placeholder="Filter by status"
          slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
        >
          <Option value="Awaiting Response">Awaiting Response</Option>
          <Option value="Task Assigned">Task Assigned</Option>
          <Option value="Resolved">Resolved</Option>
        </Select>
      </FormControl>
    </Box>
  );

  return (
    <React.Fragment>
      {renderFilters()}
      <Sheet
        variant="outlined"
        sx={{
          borderRadius: "sm",
          overflow: "auto",
        }}
      >
        <Table aria-label="Open Requests Table" stickyHeader>
          <thead>
            <tr>
              <th>
                <Link
                  component="button"
                  color="primary"
                  endDecorator={<ArrowDropDownIcon />}
                >
                  Request Type
                </Link>
              </th>
              <th>Date & Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.requestType}</td>
                <td>{row.date} {row.time}</td>
                <td>
                <Chip  variant="soft"
        size="sm"
        color={
        row.status === "Awaiting Response" ? "warning" :
        row.status === "Task Assigned" ? "primary" : // Changed 'info' to 'primary'
        "success" // You may need to adjust this if 'success' is not a valid color either
   }
>
  {row.status}
</Chip>

 
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </React.Fragment>
  );
}

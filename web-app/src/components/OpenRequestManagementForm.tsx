/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
import Avatar from "@mui/joy/Avatar";
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
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";

const rows = [
  {
    id: "INV-1234",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: {
      initial: "O",
      name: "Olivia Ryhe",
      email: "olivia@email.com",
    },
  },
  {
    id: "INV-1233",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: {
      initial: "S",
      name: "Steve Hampton",
      email: "steve.hamp@email.com",
    },
  },
  {
    id: "INV-1232",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: {
      initial: "C",
      name: "Ciaran Murray",
      email: "ciaran.murray@email.com",
    },
  },
  {
    id: "INV-1231",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: {
      initial: "M",
      name: "Maria Macdonald",
      email: "maria.mc@email.com",
    },
  },
  {
    id: "INV-1230",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: {
      initial: "C",
      name: "Charles Fulton",
      email: "fulton@email.com",
    },
  },
  {
    id: "INV-1229",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: {
      initial: "J",
      name: "Jay Hooper",
      email: "hooper@email.com",
    },
  },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function OrderTable() {
  const [order, setOrder] = React.useState<Order>("desc");
  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by status"
          slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
        >
          <Option value="paid">Paid</Option>
          <Option value="pending">Pending</Option>
          <Option value="refunded">Refunded</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      </FormControl>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        
        {renderFilters()}
      </Box>





      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 340, padding: "12px 6px" }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                  fontWeight="lg"
                  endDecorator={<ArrowDropDownIcon />}
                  sx={{
                    "& svg": {
                      transition: "0.2s",
                      transform:
                        order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                    },
                  }}
                >
                  Invoice
                </Link>
              </th>
              <th style={{ width: 140, padding: "12px 6px" }}>Date</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Status</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Customer</th>
              <th style={{ width: 140, padding: "12px 6px" }}> </th>
            </tr>
          </thead>

          <tbody>
            {stableSort(rows, getComparator(order, "id")).map((row) => (
              <tr key={row.id}>
                <td>
                  <Typography level="body-xs">{row.id}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{row.date}</Typography>
                </td>
                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      {
                        Paid: <CheckRoundedIcon />,
                        Refunded: <AutorenewRoundedIcon />,
                        Cancelled: <BlockIcon />,
                      }[row.status]
                    }
                    color={
                      {
                        Paid: "success",
                        Refunded: "neutral",
                        Cancelled: "danger",
                      }[row.status] as ColorPaletteProp
                    }
                  >
                    {row.status}
                  </Chip>
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Avatar size="sm">{row.customer.initial}</Avatar>
                    <div>
                      <Typography level="body-xs">
                        {row.customer.name}
                      </Typography>
                      <Typography level="body-xs">
                        {row.customer.email}
                      </Typography>
                    </div>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </React.Fragment>
  );
}
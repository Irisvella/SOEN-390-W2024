import React from 'react';
import Navbar from '../components/Navbar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
 
  ThemeProvider,
  CssBaseline,
  Box,
  Container,
  Grid,
 
  Divider,

} from '@mui/material';
import FitbitIcon from "@mui/icons-material/Fitbit";
import { Link } from 'react-router-dom'; // Import Link for navigation
import "../App.css";
import { GlobalStyles, IconButton, List, ListItem } from '@mui/joy';
import  ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Typography from "@mui/joy/Typography";
import ListItemContent from "@mui/joy/ListItemContent";
import Sheet from "@mui/joy/Sheet";
import { closeSidebar } from '../utilis.ts';
//This is related to css
function Toggler({
    defaultExpanded = false,
    renderToggle,
    children,
  }: {
    defaultExpanded?: boolean;
    children: React.ReactNode;
    renderToggle: (params: {
      open: boolean;
      setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }) => React.ReactNode;
  }) {
    const [open, setOpen] = React.useState(defaultExpanded);
    return (
      <React.Fragment>
        {renderToggle({ open, setOpen })}
        <Box
          sx={{
            display: "grid",
            gridTemplateRows: open ? "1fr" : "0fr",
            transition: "0.2s ease",
            "& > *": {
              overflow: "hidden",
            },
          }}
        >
          {children}
        </Box>
      </React.Fragment>
    );
  }



const ManagementLanding = () => {
 

  return (
    <>
 
      
      
        <Navbar />
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
         
          paddingTop: '50px',
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}>
            {/* Navigation Menu */}
            <Box sx={{
              width: 250,
              height: 'fit-content',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              padding: 2,
              alignSelf: 'start',
            }}>
                

                <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "absolute", md: "absolute" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
        paddingTop:"50px",
        marginTop:"50px;"
      }}
    >

                <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
    
  
      <Box
        sx={{
          minHeight: 0,
         
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton
              selected
              component="a" // This tells the component to act as an anchor tag
              href="/" // The URL to navigate to when this button is clicked
            >
              <HomeRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Home</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              component={Link} // Use the Link component from React Router
              to="/dashboard-company" // Use the 'to' prop to specify the destination
            >
              <DashboardRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Property Dashboard</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              component={Link} // Use the Link component from React Router
              to="/CreateListingPage" // Use the 'to' prop to specify the destination
            >
              <DashboardRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Manage Condo Listing</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component="a" href="/reservation-system">
              <ShoppingCartRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Reservation System</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component="a" href="/requests-management">
              <QuestionAnswerRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Requests</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <GroupRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Employee</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? "rotate(180deg)" : "none" }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton
                    role="menuitem"
                    component="a"
                    href="/Employeesinfo"
                  >
                    Employees info
                  </ListItemButton>
                </ListItem>
                
              </List>
            </Toggler>
          </ListItem>

          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton
                  onClick={() => setOpen(!open)}
                  component="a"
                  href="/financial-system"
                >
                  <AssignmentRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Financial System</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? "rotate(180deg)" : "none" }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton>All tasks</ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
        </List>

        <List
          size="sm"
          sx={{
            mt: "auto",
            flexGrow: 0,
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
            "--List-gap": "8px",
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemButton>
              <SettingsRoundedIcon />
              Settings
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
             
      </Sheet>

          {/* Main Content */}
            </Box>
            
            <Typography  sx={{ mb: 4 }}>
                  Welcome, Condo Management User!
            </Typography>
          </Box>
        </Box>
        </>
  
  );
};

export default ManagementLanding;
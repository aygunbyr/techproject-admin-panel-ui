"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EventIcon from "@mui/icons-material/Event";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import MenuListItem from "./MenuListItem";

const drawerWidth = 240;

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Hospital Booking
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <MenuListItem label="Dashboard" Icon={DashboardIcon} href="/" />
            <Divider />
            <MenuListItem
              label="Doctors"
              Icon={LocalHospitalIcon}
              href="/doctors"
            />
            <MenuListItem
              label="Add Doctor"
              Icon={LocalHospitalIcon}
              href="/doctors/create"
            />
            <Divider />
            <MenuListItem label="Patients" Icon={PersonIcon} href="/patients" />
            <MenuListItem
              label="Add Patient"
              Icon={PersonAddIcon}
              href="/patients/create"
            />
            <Divider />
            <MenuListItem
              label="Appointment"
              Icon={EventIcon}
              href="/appointments"
            />
            <MenuListItem
              label="Add Appointment"
              Icon={EditCalendarIcon}
              href="/appointments/create"
            />
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

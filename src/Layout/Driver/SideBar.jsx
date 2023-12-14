import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { MdDashboard } from "react-icons/md";
import { RiDashboard2Fill } from "react-icons/ri";
import { FaAddressCard } from "react-icons/fa";
import { GiTwirlCenter } from "react-icons/gi";
import { BsFillChatTextFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

const drawerWidth = 240;

const navItem = [
  {
    title: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    title: "Riders",
    icon: <RiDashboard2Fill />,
  },
  {
    title: "Payment Details",
    icon: <FaAddressCard />,
  },
  {
    title: "Learning Center",
    icon: <GiTwirlCenter />,
  },
  {
    title: "FAQs",
    icon: <BsFillChatTextFill />,
  },
  {
    title: "Settings",
    icon: <IoSettings />,
  },
  {
    title: "Logout",
    icon: <FiLogOut />,
  },
];


function SideBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ backgroundColor: "secondary.main", color: "white"}}>
      <Toolbar>
        <IconButton edge="start" aria-label="logo">
          <img
            style={{ width: "2.25rem", height: "2.25rem" }}
            src="/logo/auto-rickshaw.svg"
            alt="Logo"
          />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          color="primary.main"
          sx={{
            ml: 2,
            flexGrow: 1,
            fontFamily: "Permanent Marker,cursive",
            fontWeight: "900",
            fontSize: "1.75rem",
            letterSpacing: "0.1px",
          }}
        >
          AEYAUTO
        </Typography>
      </Toolbar>
      <Divider sx={{ backgroundColor: "primary.main" }} />
      <List sx={{ color: "white" }}>
        {navItem.map((item, index) => (
          <ListItem key={index} disablePadding sx={{mb: index === navItem.length - 2 ? 6 : 0,'&:hover': {
            backgroundColor: index === navItem.length - 1 ? "darkred": 'primary.main',
          },}
          }>
            <ListItemButton>
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", backgroundColor:"black"}}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ display: { xs: "block", sm: "none" } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
  
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "secondary.main",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "secondary.main",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}

SideBar.propTypes = {
  window: PropTypes.func,
};


export default SideBar;

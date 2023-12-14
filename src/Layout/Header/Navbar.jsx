import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Stack,
  Menu,
  MenuItem,
  ToggleButton,
  Box,
  Collapse,
  Grow,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import ElectricRickshawIcon from "@mui/icons-material/ElectricRickshaw";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import  { useDispatch, useSelector } from 'react-redux'

function Navbar({ value }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [toggleOpen, setToggleOpen] = useState(false);

  const token = useSelector((state)=>state.user.token)
  console.log(token);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery((theme) =>
    theme.breakpoints.between("sm", "md")
  );
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const openToggle = () => {
    setToggleOpen(!toggleOpen);
  };
  const Logout = ()=>{
    useDispatch(userLogout())
    navigate("/")
  }
  return (
    <AppBar position="static" color="secondary">
      <Toolbar sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton edge="start" aria-label="logo" >
          <img style={{ width: '2.25rem', height: '2.25rem' }} src="/logo/auto-rickshaw.svg" alt="Logo" />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          color="primary"
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

        <Stack direction="row" spacing={2}>
          <Button color="inherit">Features</Button>
          <Button color="inherit">Pricing</Button>
          <Button color="inherit">About</Button>
          <Button
            color="inherit"
            id="resources-button"
            aria-controls={open ? "resources-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            endIcon={<KeyboardArrowDownIcon />}
            onClick={handleClick}
          >
            Resources
          </Button>
          <Button color="inherit" onClick={() => navigate("/role")}>Login</Button>
          {token ? (
            <Button
            onClick={Logout}
            variant="contained"
            sx={{ borderRadius: "50px" }}
          >
            Logout
          </Button>
          ): ( 
          <Button
          onClick={() => navigate("/role")}
          variant="contained"
          sx={{ borderRadius: "50px" }}
        >
          Sign up
        </Button>)}
        </Stack>
        <Menu
          id="resources-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          MenuListProps={{
            "aria-labelledby": "resources-button",
          }}
        >
          <MenuItem onClick={handleClose}>Blog</MenuItem>
          <MenuItem onClick={handleClose}>Podcast</MenuItem>
        </Menu>
      </Toolbar>

      <Toolbar
        sx={{ display: { xs: "inline-flex", md: "none", height: "50px" } }}
      >
        <IconButton edge="start" aria-label="logo" >
          <img style={{ width: '2.25rem', height: '2.25rem' }} src="/logo/auto-rickshaw.svg" alt="Logo" />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          color="primary"
          sx={{
            // ml: 2,
            flexGrow: 1,
            fontFamily: "Permanent Marker,cursive",
            fontWeight: "700",
            fontSize: "1.5rem",
          }}
        >
          AEYAUTO
        </Typography>

        <Stack sx={{ paddingTop: "14rem" }}>
          <ToggleButton
            value="right"
            aria-label="right aligned"
            sx={{
              color: "white",
              backgroundColor: "black",
              "&:hover, &:focus": {
                backgroundColor: "black",
              },
              width: "50px",
              height: "40px",
              position: "absolute",
              ml: "auto",
              top: 0,
              right: 0,
              mr: "0.5rem",
              mt: "0.5rem",
            }}
          >
            <FormatAlignRightIcon onClick={openToggle} />
          </ToggleButton>
          <Grow
            in={toggleOpen}
            style={{ transformOrigin: "0 0 0" }}
            {...(toggleOpen ? { timeout: 1000 } : {})}
          >
            <Stack
              direction="column"
              sx={{ alignItems: "flex-start", backgroundColor: "black", mt: 6 }}
            >
              <Button color="inherit">Features</Button>
              <Button color="inherit">Pricing</Button>
              <Button color="inherit">About</Button>
              <Button
                color="inherit"
                id="resources-button"
                aria-controls={open ? "resources-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                endIcon={<KeyboardArrowDownIcon />}
                onClick={handleClick}
              >
                Resources
              </Button>
              <Button color="inherit" onClick={() => navigate("/role")}>
                Login
              </Button>
              <Button
                onClick={() => navigate("/role")}
                variant="contained"
                sx={{ borderRadius: "50px" }}
              >
                Sign up
              </Button>
            </Stack>
          </Grow>
        </Stack>
        <Menu
          id="resources-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          MenuListProps={{
            "aria-labelledby": "resources-button",
          }}
        >
          <MenuItem onClick={handleClose}>Blog</MenuItem>
          <MenuItem onClick={handleClose}>Podcast</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

import React, { useState } from "react";
import {
  CssBaseline,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import "app/GlobalCssSlider.scss";
import style from "./style.module.scss";
import Logo from "../Logo";
import Navigation from "../Navigation";
import Authentication from "./Authentication";
import Theme from "./Theme";

const pages = ["Lịch chiếu", "Cụm rạp", "Tin tức", "Ứng dụng"];
const accountSettings = [
  { title: "Sign In", path: "/signIn" },
  { title: "Sign Up", path: "/signUp" },
];

const Header = () => {
  // Use State
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [activeNav, setActiveNav] = useState(0);

  // Handle Event
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar id={style.header} position="fixed">
      <CssBaseline />
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Logo responsive xl */}
          <Logo
            responsive={{
              logo: { display: { xs: "none", md: "flex" } },
              logoText: { display: { xs: "none", md: "flex" } },
            }}
          />

          {/* Navigation Menu Responsive */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                color: "var(--font-color)",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
              PaperProps={{
                style: {
                  minWidth: 160,
                },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  selected={index === activeNav}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo responsive < md */}
          <Logo
            responsive={{
              logo: { display: { xs: "flex", md: "none" } },
              logoText: { display: { xs: "flex", md: "none" } },
            }}
            logoStyle={{
              width: 20,
              height: 20,
            }}
            logoTextStyle={{ fontSize: 12, mr: 0 }}
          />

          {/* Navigation lg responsive */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              width: { md: 500, lg: 600 },
            }}
          >
            <Navigation
              activeNav={activeNav}
              setActiveNav={setActiveNav}
              pages={pages}
            />
          </Box>

          {/* Theme & authentication */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Theme />
            <Authentication
              handleOpenUserMenu={handleOpenUserMenu}
              handleCloseUserMenu={handleCloseUserMenu}
              accountSettings={accountSettings}
              anchorElUser={anchorElUser}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;

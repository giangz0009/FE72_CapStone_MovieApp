import React, { useState } from "react";
import {
  CssBaseline,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { Link } from "react-scroll";

import "app/GlobalCssSlider.scss";

import style from "./style.module.scss";

import Logo from "../Logo";
import Navigation from "../Navigation";
import Authentication from "./Authentication";
import Theme from "./Theme";

const accountSettings = [
  { title: "Sign In", path: "/signIn" },
  { title: "Sign Up", path: "/signUp" },
];

const Header = () => {
  const pages = [
    { label: "Lịch chiếu", idHomeSection: "moviesListTabBar" },
    { label: "Cụm rạp", idHomeSection: "cinemasTab" },
    { label: "Tin tức", idHomeSection: "newsList" },
  ];

  // Use State
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

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
              className="App-navigation"
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
                <li key={index} className={style.navLinkItem}>
                  <Link
                    activeClass={style.navLinkActive}
                    className={style.navLink}
                    to={page.idHomeSection}
                    spy={true}
                    smooth={true}
                    offset={-30}
                    duration={500}
                    onClick={handleCloseNavMenu}
                  >
                    {page.label}
                  </Link>
                </li>
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
            <Navigation pages={pages} />
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

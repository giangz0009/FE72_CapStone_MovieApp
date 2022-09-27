import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import style from "./style.module.scss";

function Authentication({
  sx,
  handleOpenUserMenu,
  handleCloseUserMenu,
  accountSettings,
  anchorElUser,
}) {
  const navigate = useNavigate();

  const handleOnClickMenuItem = (setting) => {
    if ("path" in setting) navigate(setting.path);
    else setting.onClick();
    handleCloseUserMenu();
  };

  return (
    <Box sx={{ ...sx }} className={style.authentication}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 1, pr: 0 }}>
          <PersonIcon className={style.authenticationIcon} />
        </IconButton>
      </Tooltip>
      <Menu
        className={style.authenticationSettingList}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        PaperProps={{
          style: {
            minWidth: 140,
          },
        }}
      >
        {accountSettings.map((setting, index) => (
          <MenuItem
            key={index}
            onClick={() => handleOnClickMenuItem(setting)}
            sx={{ justifyContent: "center" }}
          >
            <Typography>{setting.title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default Authentication;

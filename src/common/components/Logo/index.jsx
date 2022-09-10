import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import logo from "assets/images/favicon.ico";
import style from "./style.module.scss";

function Logo({ responsive, logoText = "CB Movie", logoStyle, logoTextStyle }) {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <Box
      display="flex"
      alignItems="flex-end"
      sx={{
        cursor: "pointer",
        ...responsive.logo,
      }}
      onClick={goToHome}
    >
      <img
        src={logo}
        alt="Logo"
        style={{
          width: 40,
          height: 40,
          objectFit: "cover",
          objectPosition: "center",
          ...logoStyle,
        }}
      />
      <Typography
        className={style.logoText}
        variant="h6"
        noWrap
        component="span"
        sx={{
          fontFamily: "monospace",
          fontWeight: 700,
          fontSize: 20,
          marginLeft: 1,
          letterSpacing: ".3rem",
          textDecoration: "none",
          ...logoTextStyle,
          ...responsive.logoText,
        }}
      >
        {logoText}
      </Typography>
    </Box>
  );
}

export default Logo;

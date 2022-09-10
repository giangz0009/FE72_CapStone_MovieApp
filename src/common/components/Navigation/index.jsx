import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";

import "app/GlobalCssSlider.scss";

function Navigation({ activeNav, setActiveNav, pages }) {
  // useState

  return (
    <BottomNavigation
      showLabels
      value={activeNav}
      onChange={(event, newValue) => setActiveNav(newValue)}
      sx={{ width: "100%" }}
    >
      {pages.map((page) => (
        <BottomNavigationAction label={page} key={page} />
      ))}
    </BottomNavigation>
  );
}

export default Navigation;

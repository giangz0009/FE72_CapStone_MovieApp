import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import style from "./style.module.scss";
import "./globalStyle.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { bookingActionsType } from "features/booking/action";
import { useLocation, useNavigate } from "react-router-dom";

function MoviesListTabBar() {
  // useDispatch
  const dispatch = useDispatch();
  // useSelector
  const value = useSelector((state) => state.booking.isMovieActive) ? 1 : 0;
  // useLocation
  const location = useLocation();
  const state = location.state || {};
  // UseNavigate
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    dispatch(bookingActionsType.setIsMovieActive(!!newValue));
    dispatch(bookingActionsType.setCurrentPage(1));
    navigate("/", { state: { ...state, isActive: !!newValue } });
  };

  return (
    <Box sx={{ width: "100%", mt: 5 }}>
      <Tabs
        className={style.tab}
        value={value}
        onChange={handleChange}
        centered
      >
        <Tab label="Đang chiếu" value={1} />
        <Tab label="Sắp chiếu" value={0} />
      </Tabs>
    </Box>
  );
}

export default MoviesListTabBar;

import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import style from "./style.module.scss";
import "./globalStyle.scss";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { bookingActionsType } from "features/booking/action";

function MoviesListTabBar() {
  // useDispatch
  const dispatch = useDispatch();
  // useState
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(bookingActionsType.setIsMovieActive(!!value));
  }, [value]);

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

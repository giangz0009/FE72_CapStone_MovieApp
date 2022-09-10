import React, { useEffect } from "react";
import { Container, CssBaseline } from "@mui/material";

import Carousel from "common/components/Carousel";
import SearchSelect from "features/booking/common/components/SearchSelect";
import { fetchSetMoviesListAction } from "features/booking/action";
import { useDispatch } from "react-redux";

function Home() {
  // useDispatch
  const dispatch = useDispatch();
  // useEffect
  useEffect(() => {
    dispatch(fetchSetMoviesListAction);
  }, [dispatch]);
  return (
    <div>
      <CssBaseline />
      <div style={{ position: "relative" }}>
        <Carousel />
        <SearchSelect />
      </div>
      <Container maxWidth="lg"></Container>
    </div>
  );
}

export default Home;

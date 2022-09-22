import React, { useEffect } from "react";
import { Container, CssBaseline, Box } from "@mui/material";

import Carousel from "common/components/Carousel";
import SearchSelect from "features/booking/common/components/SearchSelect";
import {
  fetchSetCinemasBrandListAction,
  fetchSetMoviesListAction,
  fetchSetMoviesListBannerAction,
} from "features/booking/action";
import { useDispatch, useSelector } from "react-redux";
import MoviesListTabBar from "features/booking/common/components/MoviesListTabBar";
import MoviesList from "features/booking/common/components/MoviesList";
import CinemasTab from "features/booking/common/components/CinemasTab";
import NewsList from "features/booking/common/components/NewsList";

function Home() {
  // useDispatch
  const dispatch = useDispatch();
  // useSelector
  const cinemasBrandData = useSelector(
    (state) => state.booking.cinemasBrandList
  );
  // useEffect
  useEffect(() => {
    dispatch(fetchSetMoviesListBannerAction);
    dispatch(fetchSetMoviesListAction);
    dispatch(fetchSetCinemasBrandListAction);
  }, []);
  return (
    <div>
      <CssBaseline />
      <div style={{ position: "relative", marginTop: 64 }}>
        <Carousel />
        <SearchSelect />
      </div>
      <Container maxWidth="lg">
        <Box id="moviesListTabBar" sx={{ pb: 5, pt: 3 }}>
          <MoviesListTabBar />
          <MoviesList style={{ paddingBlock: 3 }} />
        </Box>
        <CinemasTab cinemasBrandData={cinemasBrandData} />
        <NewsList />
      </Container>
    </div>
  );
}

export default Home;

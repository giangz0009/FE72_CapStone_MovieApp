import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import MovieItem from "../MovieItem";
import PagePagination from "../Pagination";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import lodashIsEmpty from "lodash.isempty";

import Loading from "common/components/Loading";
import { useLocation, useNavigate } from "react-router-dom";

export default function MoviesList({ style }) {
  // useNavigate
  const navigate = useNavigate();
  // Location
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const locationPage = +(query.get("page") || "1");
  // useSelector
  const moviesList = useSelector((state) => state.booking.moviesList);
  const isActiveType = useSelector((state) => state.booking.isMovieActive);

  //   useState
  const [moviesShow, setMoviesShow] = useState([]);
  // useState
  const [pagination, setPagination] = useState({
    currentPage: locationPage,
    pageSize: 8,
    totalPages: 10,
  });

  // useEffect

  useEffect(() => {
    navigate("/", { replace: true });

    const res = updateMoviesList();
    const { movieFilterByType, movieShowForPage } = res;

    setTotalPages(movieFilterByType?.length);

    setMoviesShow(movieShowForPage);
  }, [isActiveType, moviesList]);

  useEffect(() => {
    setPagination((prevState) => ({ ...prevState, currentPage: locationPage }));
  }, [locationPage]);

  useEffect(() => {
    const res = updateMoviesList();
    const { movieShowForPage } = res;

    setMoviesShow(movieShowForPage);
  }, [pagination]);

  //   Functions;

  const renderMoviesShow = () => {
    if (lodashIsEmpty(moviesShow)) return <Loading />;

    return moviesShow.map((movie) => (
      <Grid xs={6} sm={4} md={3} key={movie.maPhim}>
        <MovieItem movie={movie} />
      </Grid>
    ));
  };

  const updateMoviesList = () => {
    const movieFilterByType = moviesList?.filter(
      (movie) => movie.dangChieu === isActiveType
    );

    const movieSortByTrending = movieFilterByType?.sort((a, b) => {
      const res = a.hot;
      if (res) return -1;
      return 1;
    });

    const movieShowForPage = movieSortByTrending?.slice(
      (pagination.currentPage - 1) * pagination.pageSize,
      pagination.pageSize * pagination.currentPage
    );

    return {
      movieFilterByType,
      movieSortByTrending,
      movieShowForPage,
    };
  };

  const setTotalPages = (moviesListLength) => {
    if (!moviesListLength) return;
    const totalPages = Math.ceil(moviesListLength / pagination.pageSize);

    setPagination((prevState) => ({ ...prevState, totalPages: totalPages }));
  };

  return (
    <Box sx={{ flexGrow: 1, ...style }}>
      <Grid container spacing={2}>
        {renderMoviesShow()}
        <Grid xs={12}>
          <PagePagination pagination={pagination} />
        </Grid>
      </Grid>
    </Box>
  );
}

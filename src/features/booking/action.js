import { createAction } from "@reduxjs/toolkit";
import { movieId } from "app/constants";
import instance from "app/instance";

const bookingActionsType = {
  setBanners: createAction("Booking/SET_BANNERS"),
  setMoviesList: createAction("Booking/SET_MOVIES_LIST"),
  setSelectedMovie: createAction("Booking/SET_SELECTED_MOVIE"),
  setIsMovieActive: createAction("Booking/SET_IS_MOVIE_ACTIVE"),
  setCinemasBrandList: createAction("Booking/SET_CINEMAS_BRAND_LIST"),
};

const fetchSetSelectedMovieAction = (movieId) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyPhim/LayThongTinPhim",
        method: "GET",
        params: {
          MaPhim: movieId,
        },
      });

      dispatch(bookingActionsType.setSelectedMovie(res.data.content));
    } catch (error) {
      console.log(error);
    }
  };
};

const fetchSetMoviesListAction = async (dispatch) => {
  try {
    const res = await instance.request({
      url: "/api/QuanLyPhim/LayDanhSachPhim",
      method: "GET",
      params: {
        maNhom: movieId,
      },
    });
    dispatch(bookingActionsType.setMoviesList(res.data.content));
  } catch (error) {
    throw new Error(error);
  }
};

const fetchSetCinemasBrandListAction = async (dispatch) => {
  try {
    const res = await instance.request({
      url: "/api/QuanLyRap/LayThongTinHeThongRap",
      method: "GET",
    });

    dispatch(bookingActionsType.setCinemasBrandList(res.data.content));
  } catch (error) {
    throw new Error(error);
  }
};

export {
  bookingActionsType,
  fetchSetSelectedMovieAction,
  fetchSetMoviesListAction,
  fetchSetCinemasBrandListAction,
};

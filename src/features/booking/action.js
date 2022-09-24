import { createAction } from "@reduxjs/toolkit";
import { movieId } from "app/constants";
import instance from "app/instance";

const bookingActionsType = {
  setBanners: createAction("Booking/SET_BANNERS"),
  setMoviesList: createAction("Booking/SET_MOVIES_LIST"),
  setSelectedMovie: createAction("Booking/SET_SELECTED_MOVIE"),
  setMovieSchedule: createAction("Booking/SET_MOVIE_SCHEDULE"),
  setIsMovieActive: createAction("Booking/SET_IS_MOVIE_ACTIVE"),
  setCinemasBrandList: createAction("Booking/SET_CINEMAS_BRAND_LIST"),
  setCurrentPage: createAction("Booking/SET_CURRENT_PAGE"),
  setTicketsList: createAction("Booking/SET_TICKET"),
  setSelectedSeats: createAction("Booking/SET_SELECTED_SEATS"),
  setPaymentType: createAction("Booking/SET_PAYMENT_TYPE"),
};

const fetchSetTicketsList = (movieScheduleId) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyDatVe/LayDanhSachPhongVe",
        method: "Get",
        params: {
          maLichChieu: movieScheduleId,
        },
      });

      const seatsRange = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
      const seatsList = [...res.data.content.danhSachGhe];

      const numberSeatsInPerRange = seatsList.length / seatsRange.length;

      const remapSeatsList = seatsList.map((seat, index) => {
        const seatRangePos = Math.floor(index / numberSeatsInPerRange);

        return {
          ...seat,
          label:
            seatsRange[seatRangePos] +
            String(index + 1 - numberSeatsInPerRange * seatRangePos).padStart(
              2,
              "0"
            ),
        };
      });

      dispatch(
        bookingActionsType.setTicketsList({
          ...res.data.content,
          danhSachGhe: remapSeatsList,
        })
      );
    } catch (error) {
      throw new Error(error);
    }
  };
};

const fetchSetMovieScheduleAction = (movieId) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyRap/LayThongTinLichChieuPhim",
        method: "GET",
        params: {
          MaPhim: movieId,
        },
      });

      dispatch(bookingActionsType.setMovieSchedule(res.data.content));
    } catch (error) {
      console.log(error);
    }
  };
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

const fetchSetMoviesListBannerAction = async (dispatch) => {
  try {
    const res = await instance.request({
      url: "/api/QuanLyPhim/LayDanhSachBanner",
      method: "GET",
    });
    dispatch(bookingActionsType.setBanners(res.data.content));
  } catch (error) {
    throw new Error(error);
  }
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
  fetchSetMovieScheduleAction,
  fetchSetSelectedMovieAction,
  fetchSetMoviesListBannerAction,
  fetchSetMoviesListAction,
  fetchSetCinemasBrandListAction,
  fetchSetTicketsList,
};

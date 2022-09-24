import { createReducer } from "@reduxjs/toolkit";

import { bookingActionsType } from "./action";

const initialState = {
  banners: null,
  moviesList: null,
  isMovieActive: true,
  moviesShowByActiveTypeList: null,
  movieSchedule: null,
  selectedMovie: null,
  cinemasBrandList: null,
  currentPage: 1,
  ticketsList: null,
  selectedSeats: [],
  paymentType: {},
};

const bookingReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(bookingActionsType.setPaymentType, (state, action) => {
      state.paymentType = action.payload;
    })
    .addCase(bookingActionsType.setSelectedSeats, (state, action) => {
      state.selectedSeats = action.payload;
    })
    .addCase(bookingActionsType.setTicketsList, (state, action) => {
      state.ticketsList = action.payload;
    })
    .addCase(bookingActionsType.setCurrentPage, (state, action) => {
      state.currentPage = action.payload;
    })
    .addCase(bookingActionsType.setMovieSchedule, (state, action) => {
      state.movieSchedule = action.payload;
    })
    .addCase(bookingActionsType.setCinemasBrandList, (state, action) => {
      state.cinemasBrandList = action.payload;
    })
    .addCase(bookingActionsType.setIsMovieActive, (state, action) => {
      state.isMovieActive = action.payload;
    })
    .addCase(bookingActionsType.setBanners, (state, action) => {
      state.banners = action.payload;
    })
    .addCase(bookingActionsType.setMoviesList, (state, action) => {
      state.moviesList = action.payload;
      // state.banners = action.payload.slice(0, 3);
    })
    .addCase(bookingActionsType.setSelectedMovie, (state, action) => {
      state.selectedMovie = action.payload;
    })
    .addDefaultCase((state, action) => {
      state.otherActions++;
    });
});

export default bookingReducer;

import { createReducer } from "@reduxjs/toolkit";

import { bookingActionsType } from "./action";

const initialState = {
  banners: null,
  moviesList: null,
  isMovieActive: true,
  moviesShowByActiveTypeList: null,
  selectedMovie: null,
  cinemasBrandList: null,
};

const bookingReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(bookingActionsType.setCinemasBrandList, (state, action) => {
      state.cinemasBrandList = action.payload;
    })
    .addCase(bookingActionsType.setIsMovieActive, (state, action) => {
      state.isMovieActive = action.payload;
    })
    .addCase(bookingActionsType.setMoviesList, (state, action) => {
      state.moviesList = action.payload;
      state.banners = action.payload.slice(0, 3);
    })
    .addCase(bookingActionsType.setSelectedMovie, (state, action) => {
      state.selectedMovie = action.payload;
    })
    .addDefaultCase((state, action) => {
      state.otherActions++;
    });
});

export default bookingReducer;

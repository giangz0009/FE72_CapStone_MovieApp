import { createReducer } from "@reduxjs/toolkit";

import { bookingActionsType } from "./action";

const initialState = {
  banners: null,
  moviesList: null,
  selectedMovie: null,
};

const bookingReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(bookingActionsType.setMoviesList, (state, action) => {
      state.moviesList = action.payload;
      state.banners = action.payload.slice(0, 3);
    })
    .addCase(bookingActionsType.setSelectedMovie, (state, action) => {
      state.selectedMovie = action.payload;
    })
    // .addCase(bookingActionsType.setBanners, (state, action) => {
    //   state.banners = action.payload;
    // })
    .addDefaultCase((state, action) => {
      state.otherActions++;
    });
});

export default bookingReducer;

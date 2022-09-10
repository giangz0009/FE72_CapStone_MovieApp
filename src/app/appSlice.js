import { createReducer } from "@reduxjs/toolkit";

import { appActionTypes } from "./actions";

const initialState = {
  isDark: false,
  isLoading: null,
};

const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(appActionTypes.setIsDarkTheme, (state, action) => {
      state.isDark = action.payload;
    })
    .addCase(appActionTypes.setIsLoading, (state, action) => {
      state.isLoading = action.payload;
    })
    .addDefaultCase((state, action) => {
      state.otherActions++;
    });
});

export default appReducer;

import { createAction } from "@reduxjs/toolkit";

export const appActionTypes = {
  setIsDarkTheme: createAction("App/SET_IS_DARK_THEME"),
  setIsLoading: createAction("App/SET_IS_LOADING"),
};

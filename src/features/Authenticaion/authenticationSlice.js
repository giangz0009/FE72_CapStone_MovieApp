import { createReducer } from "@reduxjs/toolkit";
import { authActionType } from "./action";

const initialState = {
  profile: null,
};

const authenticationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(authActionType.setProfile, (state, action) => {
      state.profile = action.payload;
    })
    .addDefaultCase((state, action) => {
      state.otherActions++;
    });
});

export default authenticationReducer;

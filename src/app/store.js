import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "features/Authenticaion/authenticationSlice";
import bookingReducer from "features/booking/bookingSlice";
import appReducer from "./appSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
    booking: bookingReducer,
    authentication: authenticationReducer,
  },
});

export default store;

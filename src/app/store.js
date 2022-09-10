import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "features/booking/bookingSlice";
import appReducer from "./appSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
    booking: bookingReducer,
  },
});

export default store;

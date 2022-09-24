import Grid from "@mui/material/Unstable_Grid2";
import HorizonStepper from "common/components/HorizonStepper";
import { fetchSetTicketsList } from "features/booking/action";
import React, { useCallback, useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BookingSeatsPayment from "../BookingSeatsPayment";
import ChooseSeats from "../ChooseSeats";

import styles from "./styles.module.scss";

function BookingSeat() {
  //   useParams
  const params = useParams();
  const movieScheduleId = params.movieScheduleId;
  //   useDispatch
  const dispatch = useDispatch();
  //   useSelector
  const movieInfo = useSelector(
    (state) => state.booking.ticketsList?.thongTinPhim
  );
  const userProfile = useSelector((state) => state.authentication.profile);

  //   useEffect
  useEffect(() => {
    dispatch(fetchSetTicketsList(movieScheduleId));
  }, [dispatch, movieScheduleId]);

  // useRef
  const refHorizonStepper = useRef();
  // useCallback
  const cbHorizonStepperToLast = useCallback(
    () => refHorizonStepper.current.toLast(),
    []
  );

  // render functions
  const renderLargeDesktop = () => (
    <Grid container="xl">
      <Grid xs={9} display="flex" flexDirection="column" maxHeight="100vh">
        <HorizonStepper ref={refHorizonStepper} />
        <ChooseSeats />
      </Grid>
      <Grid xs={3}>
        <BookingSeatsPayment
          movieInfo={movieInfo}
          userProfile={userProfile}
          toLastStepper={cbHorizonStepperToLast}
        />
      </Grid>
    </Grid>
  );

  return (
    <div
      className={styles.ticketBooking}
      style={{ backgroundImage: `url(${movieInfo?.hinhAnh})` }}
    >
      {renderLargeDesktop()}
    </div>
  );
}

export default BookingSeat;

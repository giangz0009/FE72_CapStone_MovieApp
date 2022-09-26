import { Box, Button, MobileStepper, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import lodashIsEmpty from "lodash.isempty";

import React, { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import useWindowDimensions from "common/hooks/useWindowDimension";
import HorizonStepper from "common/components/HorizonStepper";
import {
  bookingActionsType,
  fetchSetTicketsList,
} from "features/booking/action";
import BookingSeatsPayment from "../BookingSeatsPayment";
import ChooseSeats from "../ChooseSeats";

import styles from "./styles.module.scss";
import "./globalStyles.scss";
import clsx from "clsx";
import { useRef } from "react";

function BookingSeat() {
  // useState
  const [activeStep, setActiveStep] = useState(0);
  // useWindowDimensions
  const { width } = useWindowDimensions();
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
  const selectedSeats = useSelector((state) => state.booking.selectedSeats);
  const paymentType = useSelector((state) => state.booking.paymentType);
  // useRef
  const refBookingSeatPayment = useRef();

  // Basic Variable

  const steps = ["CHỌN GHẾ", "THANH TOÁN", "KẾT QUẢ ĐẶT VÉ"];

  function Stepper(steps) {
    this.steps = steps;
    this.totalSteps = this.steps.length;
    this.currentStep = activeStep;
    this.next = () => {
      if (activeStep === this.totalSteps - 1) setActiveStep(0);
      else setActiveStep((preState) => preState + 1);
    };
    this.prev = () => {
      if (activeStep === 0) setActiveStep(this.totalSteps - 1);
      else setActiveStep((prevState) => prevState - 1);
    };
    this.toFirst = () => {
      setActiveStep(0);
    };
    this.toLast = () => {
      setActiveStep(this.totalSteps - 1);
    };
    this.getCurrentStepLabel = () =>
      `${this.currentStep + 1}. ${this.steps[this.currentStep]}`;
    this.isDisabledNextBtn = () => {
      if (this.currentStep === 0)
        return (
          this.currentStep === this.totalSteps - 1 ||
          lodashIsEmpty(selectedSeats)
        );

      if (this.currentStep === 1)
        return (
          this.currentStep === this.totalSteps - 1 || lodashIsEmpty(paymentType)
        );

      return false;
    };
  }

  const myStepper = new Stepper(steps);

  //   useEffect
  useEffect(() => {
    dispatch(bookingActionsType.setSelectedSeats([]));
    dispatch(bookingActionsType.setPaymentType({}));
    dispatch(fetchSetTicketsList(movieScheduleId));
  }, [dispatch, movieScheduleId]);

  // useCallback
  const cbStepperToLast = useCallback(() => myStepper.toLast(), []);
  const cbResetPayment = useCallback(() => {
    dispatch(bookingActionsType.setSelectedSeats([]));
    dispatch(bookingActionsType.setPaymentType({}));
  }, []);
  // useNavigate
  const navigate = useNavigate();

  // render functions
  const renderLargeDesktop = () => (
    <Grid container="xl">
      <Grid xs={9} display="flex" flexDirection="column" maxHeight="100vh">
        <HorizonStepper stepper={myStepper} />
        <ChooseSeats resetPayment={cbResetPayment} />
      </Grid>
      <Grid xs={3}>
        <BookingSeatsPayment
          movieInfo={movieInfo}
          userProfile={userProfile}
          toLastStepper={cbStepperToLast}
          resetPayment={cbResetPayment}
        />
      </Grid>
    </Grid>
  );

  const renderSmallDesktop = () => {
    const {
      totalSteps,
      currentStep,
      next,
      prev,
      getCurrentStepLabel,
      isDisabledNextBtn,
    } = myStepper;

    return (
      <Box className="bookingSeatsSmallDesktop">
        <Paper
          square
          elevation={0}
          className="bookingSeatsHeader"
          sx={{
            display: "flex",
            alignItems: "center",
            height: 50,
            pl: 2,
            bgcolor: "background.default",
          }}
        >
          <Box className="bookingSeatsHeaderWrap">
            <Button onClick={() => navigate("/")}>
              <CloseIcon />
            </Button>
            <h3>{getCurrentStepLabel()}</h3>
            <Button>
              <AccountCircleIcon onClick={() => navigate("/userInfo")} />
            </Button>
          </Box>
        </Paper>
        {/* chooseSeatMain */}
        {currentStep === 0 ? (
          <ChooseSeats resetPayment={cbResetPayment} />
        ) : (
          <BookingSeatsPayment
            movieInfo={movieInfo}
            userProfile={userProfile}
            toLastStepper={cbStepperToLast}
            resetPayment={cbResetPayment}
            ref={refBookingSeatPayment}
          />
        )}

        {currentStep <= 1 && (
          <MobileStepper
            className="bookingSeatAction"
            variant="text"
            steps={totalSteps}
            position="static"
            activeStep={currentStep}
            nextButton={
              <Button
                size="small"
                onClick={() => {
                  if (currentStep === 1)
                    refBookingSeatPayment.current.submitBooking();
                  next();
                }}
                disabled={isDisabledNextBtn()}
                className={clsx({ disabled: lodashIsEmpty(selectedSeats) })}
              >
                Tiếp tục
              </Button>
            }
            backButton={
              <Button size="small" onClick={prev} disabled={currentStep === 0}>
                Quay về
              </Button>
            }
          />
        )}
      </Box>
    );
  };

  return (
    <div
      className={styles.ticketBooking}
      style={{ backgroundImage: `url(${movieInfo?.hinhAnh})` }}
    >
      {width >= 900 ? renderLargeDesktop() : renderSmallDesktop()}
    </div>
  );
}

export default BookingSeat;

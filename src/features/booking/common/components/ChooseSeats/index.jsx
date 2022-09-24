import { Container } from "@mui/material";
import { Box } from "@mui/system";
import Loading from "common/components/Loading";
import dateTime from "common/utils/dateJs";
import React from "react";
import { memo } from "react";
import Countdown, { zeroPad } from "react-countdown";
import ChairIcon from "@mui/icons-material/Chair";
import LivingIcon from "@mui/icons-material/Living";

import "./globalStyles.scss";
import { useSelector } from "react-redux";
import ChooseSeatsMain from "./ChooseSeatsMain";

function ChooseSeats() {
  // useSelector
  const movieInfo = useSelector(
    (state) => state.booking.ticketsList?.thongTinPhim
  );
  const ticketsList = useSelector(
    (state) => state.booking.ticketsList?.danhSachGhe
  );

  // handle functions

  // render functions
  const renderChooseSeatsHeader = () => {
    if (!movieInfo) return <Loading />;

    const { tenCumRap, gioChieu, ngayChieu, tenRap } = movieInfo;
    const convertNgayChieuToDayOfWeek = dateTime(
      new Date(ngayChieu).toISOString()
    ).getDayOfWeek();
    const tenCumRapSplit = tenCumRap.split(" - ");

    return (
      <Box className="chooseSeatsHeader">
        <Box className="chooseSeatsHeaderMovieInfo">
          <p>
            {tenCumRapSplit[0]} <span>{` - ${tenCumRapSplit[1]}`}</span>
          </p>
          <p>
            {convertNgayChieuToDayOfWeek} - {gioChieu} - {tenRap}
          </p>
        </Box>
        <Box className="chooseSeatsHeaderCountDown">
          <p>Thời gian giữ ghế</p>
          <Countdown
            date={Date.now() + 60000 * 5}
            renderer={({ minutes, seconds }) => (
              <span>
                {zeroPad(minutes)}:{zeroPad(seconds)}
              </span>
            )}
          />
        </Box>
      </Box>
    );
  };
  const renderChooseSeatFooter = () => (
    <Box className="chooseSeatFooter">
      <Box className="chooseSeatFooterItem">
        <ChairIcon />
        <p>Ghế Thường</p>
      </Box>
      <Box className="chooseSeatFooterItem vip">
        <ChairIcon />
        <p>Ghế Vip</p>
      </Box>
      <Box className="chooseSeatFooterItem selected">
        <ChairIcon />
        <p>Ghế đang chọn</p>
      </Box>
      <Box className="chooseSeatFooterItem disable">
        <LivingIcon />
        <p>Ghế đã chọn</p>
      </Box>
    </Box>
  );

  return (
    <div className="chooseSeats">
      <Container maxWidth="md">
        {renderChooseSeatsHeader()}
        <ChooseSeatsMain ticketsList={ticketsList} />
        {renderChooseSeatFooter()}
      </Container>
    </div>
  );
}

export default memo(ChooseSeats);

import { Box } from "@mui/material";
import clsx from "clsx";
import Loading from "common/components/Loading";
import React, { memo, useRef } from "react";
import ChairIcon from "@mui/icons-material/Chair";
import LivingIcon from "@mui/icons-material/Living";
import { useDispatch, useSelector } from "react-redux";
import { bookingActionsType } from "features/booking/action";
import BasicConfirmModal from "common/hoc/BasicConfirmModal";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const confirmContent = {
  heading: (
    <>
      <NotificationsActiveIcon fontSize="large" sx={{ marginRight: 1 }} />
      Thông báo
    </>
  ),
  content: "Bạn không thể chọn quá 10 ghế!",
  cancelBtn: "OK",
};

function ChooseSeatsMain({ ticketsList }) {
  // useRef
  const refConfirmModal = useRef();
  // useDispatch
  const dispatch = useDispatch();
  // useSelector
  const selectedSeats = useSelector((state) => state.booking.selectedSeats);

  // handle functions
  const handleOnClickSeat = (ticket) => {
    const cloneSelectedSeats = [...selectedSeats];
    const posInSelectedSeats = cloneSelectedSeats.findIndex(
      (seat) => seat.label === ticket.label
    );

    const isInSelectedSeats = posInSelectedSeats >= 0;

    if (isInSelectedSeats) {
      cloneSelectedSeats.splice(posInSelectedSeats, 1);

      dispatch(bookingActionsType.setSelectedSeats([...cloneSelectedSeats]));
    } else {
      if (cloneSelectedSeats.length === 10) refConfirmModal.current.open();
      else
        dispatch(
          bookingActionsType.setSelectedSeats([...cloneSelectedSeats, ticket])
        );
    }
  };
  // render functions
  const renderSeatsTicketsList = () => {
    if (!ticketsList) return <Loading />;

    return ticketsList.map((ticket, index) => (
      <Box
        key={index}
        className={clsx("chooseSeatMainTicketItem", {
          disable: ticket.daDat,
          vip: ticket.loaiGhe === "Vip",
          selected: !!selectedSeats.find((seat) => seat.label === ticket.label),
        })}
      >
        {index % 16 === 0 && <p>{ticket.label.slice(0, 1)}</p>}
        {ticket.daDat ? (
          <LivingIcon />
        ) : (
          <ChairIcon onClick={() => handleOnClickSeat(ticket)} />
        )}
      </Box>
    ));
  };

  return (
    <Box className="chooseSeatsMain">
      <Box className="chooseSeatsMainWrap">
        <Box className="chooseSeatsMainScreen">
          <Box></Box>
          <span>Màn hình</span>
        </Box>
        <Box className="chooseSeatsMainTicketsList">
          {renderSeatsTicketsList()}
        </Box>
      </Box>
      <BasicConfirmModal
        confirmContent={confirmContent}
        ref={refConfirmModal}
        isHaveSubmitBtn={false}
      />
    </Box>
  );
}

export default memo(ChooseSeatsMain);

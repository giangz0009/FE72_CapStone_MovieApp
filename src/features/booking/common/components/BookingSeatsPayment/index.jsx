import { Box, Button } from "@mui/material";
import Loading from "common/components/Loading";
import dateTime from "common/utils/dateJs";
import React from "react";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import "./globalStyles.scss";
import imgZalo from "assets/images/logo-icon/zalopay_icon.png";
import imgVisa from "assets/images/Booking/visa.png";
import imgAtm from "assets/images/Booking/atm.png";
import imgPaygoo from "assets/images/Booking/cuahang.png";
import { memo } from "react";
import lodashIsEmpty from "lodash.isempty";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { bookingActionsType } from "features/booking/action";
import clsx from "clsx";
import { useEffect } from "react";
import instance from "app/instance";
import BasisModal from "hoc/BasisModal";
import BasicConfirmModal from "common/hoc/BasicConfirmModal";
import { useRef } from "react";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";

const paymentsList = [
  {
    id: "zaloPay",
    img: imgZalo,
    title: "Thanh toán qua ZaloPay",
    content: "ZaloPay",
  },
  {
    id: "visaPay",
    img: imgVisa,
    title: "Visa, Master, JCB",
    content: "Visa, Master, JCB",
  },
  {
    id: "atmPay",
    img: imgAtm,
    title: "Thẻ ATM nội địa",
    content: "ATM",
  },
  {
    id: "paygooPay",
    img: imgPaygoo,
    title: "Thanh toán tại cửa hàng tiện ích",
    content: "Cửa hàng tiện ích",
  },
];

const confirmContent = {
  heading: (
    <>
      <ErrorOutlineIcon /> Thông báo
    </>
  ),
  content: "Có lỗi xảy ra!",
  cancelBtn: "OK",
};

const BookingSeatsPayment = forwardRef(
  ({ movieInfo, userProfile, toLastStepper, resetPayment }, ref) => {
    // useDispatch
    const dispatch = useDispatch();
    // useSelector
    const selectedSeats = useSelector((state) => state.booking.selectedSeats);
    const paymentType = useSelector((state) => state.booking.paymentType);
    //   useMemo
    const totalPayment = useMemo(() => {
      const res = selectedSeats.reduce(
        (currVal, nextVal) => (currVal += nextVal.giaVe),
        0
      );

      return res;
    }, [selectedSeats]);

    //   useEffect
    useEffect(() => {
      if (lodashIsEmpty(selectedSeats))
        dispatch(bookingActionsType.setPaymentType({}));
    }, [selectedSeats]);

    //   useRef
    const refBasicConfirmModal = useRef();
    const refBasicModal = useRef();
    //   useNavigate
    const navigate = useNavigate();

    // useImperativeHandle
    useImperativeHandle(ref, () => ({
      submitBooking() {
        handleOnclickSubmit();
      },
    }));

    //   handle functions
    const handleOnclickSubmit = async () => {
      const data = {
        maLichChieu: movieInfo.maLichChieu,
        danhSachVe: selectedSeats.map((ticket) => ({
          maGhe: ticket.maGhe,
          giaVe: ticket.giaVe,
        })),
      };

      try {
        await instance.request({
          url: "/api/QuanLyDatVe/DatVe",
          method: "POST",
          data: data,
        });
        toLastStepper();
        refBasicModal.current.open();
      } catch (error) {
        refBasicConfirmModal.current.open();
      }
    };

    const handleOnclickContinuteBuy = () => {
      resetPayment();
      navigate(0);
    };
    const handleOnclickCombackHome = () => {
      resetPayment();
      navigate("/");
    };

    // render functions
    const renderMain = () => {
      if (!movieInfo || !userProfile) return <Loading />;

      const { tenPhim, tenCumRap, ngayChieu, gioChieu, tenRap } = movieInfo;
      const convertNgayChieuToDayOfWeek = dateTime(
        new Date(ngayChieu).toISOString()
      ).getDayOfWeek();

      const { email, soDT } = userProfile;

      const renderPaymentType = () => {
        return (
          <>
            {lodashIsEmpty(selectedSeats) ? (
              <p className="paymentWaring">
                *Vui lòng chọn ghế để hiển thị phương thức thanh toán
              </p>
            ) : (
              <Box className="paymentTypes">
                {paymentsList.map((payment) => (
                  <Box className="paymentType" key={payment.id}>
                    <input
                      type="radio"
                      name="paymentType"
                      id={payment.id}
                      onChange={() =>
                        dispatch(bookingActionsType.setPaymentType(payment))
                      }
                    />
                    <label htmlFor={payment.id}>
                      <img src={payment.img} alt="Payment Type" />
                      <span>{payment.title}</span>
                    </label>
                  </Box>
                ))}
              </Box>
            )}
          </>
        );
      };

      return (
        <>
          <Box className="bookingSeatsPaymentMovieInfo">
            <h3>{tenPhim}</h3>
            <p>{tenCumRap}</p>
            <p>
              {convertNgayChieuToDayOfWeek} {ngayChieu} - {gioChieu} - {tenRap}
            </p>
          </Box>
          <Box className="bookingSeatsPaymentSeatsList">
            <span>Ghế:</span>
            <span>{selectedSeats.map((seat) => seat.label).join(", ")}</span>
            <span>
              {totalPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              <span style={{ paddingLeft: 2 }}>đ</span>
            </span>
          </Box>
          <Box className="bookingSeatsFormGroup">
            <label htmlFor="email">E-Mail:</label>
            <input id="email" type="text" value={email} disabled />
          </Box>
          <Box className="bookingSeatsFormGroup">
            <label htmlFor="soDT">Phone:</label>
            <input id="soDT" type="text" value={soDT} disabled />
          </Box>
          <Box className="bookingSeatsFormGroup discount">
            <Box className="formGroup">
              <label htmlFor="discount">Mã giảm giá:</label>
              <input
                id="discount"
                type="text"
                value="Tạm thời không hỗ trợ..."
                disabled
              />
            </Box>
            <Button>Áp dụng</Button>
          </Box>
          <Box className="bookingSeatsPaymentType">
            <span>Hình thức thanh toán</span>
            {renderPaymentType()}
          </Box>
        </>
      );
    };
    const renderBasicModal = () => {
      if (!movieInfo || !userProfile) return <Loading />;

      const {
        hinhAnh,
        tenPhim,
        tenCumRap,
        diaChi,
        ngayChieu,
        gioChieu,
        tenRap,
      } = movieInfo;
      const tenCumRapSplit = tenCumRap.split(" - ");
      const { hoTen, email, soDT } = userProfile;

      return (
        <Container maxWidth="sm" className="basicModalPayment">
          <Box className="movieInfo">
            <img src={hinhAnh} alt="Movie" />
            <Box>
              <h3>{tenPhim}</h3>
              <h4>
                {tenCumRapSplit[0]}
                <span> - {tenCumRapSplit[1]}</span>
              </h4>
              <p>{diaChi}</p>
              <Box>
                <Box>
                  <span>Suất chiếu</span>
                  <span>
                    {gioChieu} {ngayChieu}
                  </span>
                </Box>
                <Box>
                  <span>Phòng</span>
                  <span>{tenRap}</span>
                </Box>
                <Box>
                  <span>Ghế</span>
                  <span>
                    {selectedSeats.map((seat) => seat.label).join(", ")}
                  </span>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="bookingInfo">
            <Box className="group">
              <h1>Thông tin đặt vé</h1>
            </Box>
            <Box className="group">
              <span>Họ và tên: </span>
              <span>{hoTen}</span>
            </Box>
            <Box className="group">
              <span>Điện thoại:</span>
              <span>{soDT}</span>
            </Box>
            <Box className="group">
              <span>Email</span>
              <span>{email}</span>
            </Box>
            <Box className="group">
              <span>Trạng thái:</span>
              <span>
                Đặt vé thành công qua <span>{paymentType.content}</span>
              </span>
            </Box>
            <Box className="group">
              <span>Tổng tiền:</span>
              <span>{totalPayment}</span>
            </Box>
          </Box>
          <p>Kiểm tra lại vé đã mua trong thông tin tài khoản của bạn !</p>
          <Box className="bookingActions">
            <Button onClick={handleOnclickContinuteBuy}>Tiếp tục mua vé</Button>
            <Button onClick={handleOnclickCombackHome}>
              Quay về trang chủ
            </Button>
          </Box>
        </Container>
      );
    };

    return (
      <Box className="bookingSeatsPayment">
        <Box className="bookingSeatsPaymentHeader">
          <Box className="bookingSeatsPaymentTitle">
            {totalPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
          </Box>
          {renderMain()}
        </Box>
        <Box className="bookingPaymentFooter">
          <p>
            <FmdBadIcon /> Vé đã mua không thể đổi hoặc hoàn tiền
            <br />
            Mã vé sẽ được gửi qua tin nhắn <span>ZMS</span>(tin nhắn Zalo) và{" "}
            <span>Email</span> đăng nhập.
          </p>
          <Button
            disabled={lodashIsEmpty(paymentType)}
            className={clsx({ active: !lodashIsEmpty(paymentType) })}
            onClick={handleOnclickSubmit}
          >
            Đặt vé
          </Button>
        </Box>
        <BasisModal
          isHasCloseBtn={false}
          handleOnClose={() => {}}
          ref={refBasicModal}
          className="basicModalPaymentWrap"
          isActiveOutClickEvent={false}
        >
          {renderBasicModal()}
        </BasisModal>
        <BasicConfirmModal
          confirmContent={confirmContent}
          isHaveSubmitBtn={false}
          ref={refBasicConfirmModal}
        />
      </Box>
    );
  }
);

export default memo(BookingSeatsPayment);

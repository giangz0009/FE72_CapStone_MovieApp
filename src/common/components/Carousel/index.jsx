import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import style from "./style.module.scss";
import "./globalStyle.scss";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import { fetchSetSelectedMovieAction } from "features/booking/action";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import BasicModal from "hoc/BasisModal";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Carousel() {
  // useRef
  const modalRef = useRef();
  // useDispatch
  const dispatch = useDispatch();
  // useNavigate
  const navigate = useNavigate();
  //useSelector
  const banners = useSelector((state) => state.booking.banners);
  const selectedMovie = useSelector((state) => state.booking.selectedMovie);
  // Handle Events
  const handleOpenModal = async (movieId) => {
    await dispatch(fetchSetSelectedMovieAction(movieId));
    modalRef.current.open();
  };

  if (!banners) return <Loading />;

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="carousel"
      >
        {banners.map((banner) => (
          <SwiperSlide
            key={banner.maPhim}
            style={{
              backgroundImage: `url('${banner.hinhAnh}')`,
            }}
          >
            <div className={style.wrapper}>
              <div
                className={style.shadowLayout}
                onClick={() => navigate(`/details/${banner.maPhim}`)}
              ></div>
              <Button
                className={style.playBtn}
                variant="outlined"
                startIcon={<PlayArrowIcon />}
                onClick={() => handleOpenModal(banner.maPhim)}
              >
                asd
              </Button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <BasicModal
        ref={modalRef}
        costumeStyle={{ width: "70vw", height: "70vh" }}
      >
        {selectedMovie?.trailer.startsWith("https://") ? (
          <iframe
            width="100%"
            height="100%"
            src={selectedMovie.trailer}
            title={selectedMovie.tenPhim}
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <Loading />
        )}
      </BasicModal>
    </>
  );
}

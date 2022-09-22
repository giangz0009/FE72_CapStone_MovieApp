import React, { useCallback, useRef } from "react";

import { Box, Container, Tab } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchSetMovieScheduleAction,
  fetchSetSelectedMovieAction,
} from "features/booking/action";
import Loading from "common/components/Loading";
import BasicRating from "common/components/BasisRating";
import BasicProgress from "common/components/BasicProgress";
import BasisModal from "hoc/BasisModal";

import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

import lodashIsEmpty from "lodash.isempty";

import styles from "./styles.module.scss";
import clsx from "clsx";
import { useState } from "react";
import CenteredTab from "common/components/CenteredTab";
import dateTime from "common/utils/dateJs";
import BasicVerticalTab from "features/booking/common/components/BasicVerticalTab";
import CinemasAccordion from "features/booking/common/components/CinemasAccordion";
import { Link } from "react-scroll";

function Details() {
  // useParams
  const hrefParams = useParams();
  // useDispatch
  const dispatch = useDispatch();
  // useSelector
  const selectedMovieInfo = useSelector((state) => state.booking.selectedMovie);
  const movieSchedule = useSelector((state) => state.booking.movieSchedule);
  // useRef
  const modalRef = useRef();
  // useState
  const [tabValue, setTabValue] = useState(0);
  const [cinemasBrandValue, setCinemasBrandValue] = useState(0);
  // useCallBack
  const cbHandleChangeTabsList = useCallback((e, newValue) => {
    handleChangeTabsList(e, newValue);
  }, []);
  const cBSetCinemasBrandValue = useCallback(
    (newValue) => setCinemasBrandValue(newValue),
    []
  );

  // Static Variable
  const movieId = hrefParams.movieId;
  const tabsList = ["Lịch chiếu", "Thông tin"];
  const tabPanelsList = [renderTabPanel1(), renderTabPanel2()];

  useEffect(() => {
    (async () => {
      await dispatch(fetchSetSelectedMovieAction(movieId));
      await dispatch(fetchSetMovieScheduleAction(movieId));
    })();
  }, [dispatch, movieId]);

  // Handle Event functions
  const handleOpenModal = () => {
    modalRef.current.open();
  };

  const handleChangeTabsList = (e, newValue) => {
    setTabValue(newValue);
  };

  // Render Functions

  const renderMovieInfoLgDesktop = () => {
    if (!selectedMovieInfo) return <Loading />;

    const { hinhAnh, tenPhim, danhGia, hot } = selectedMovieInfo;

    let { trailer } = selectedMovieInfo;

    trailer = trailer.replace(
      "https://www.youtube.com/watch?v=",
      "https://www.youtube.com/embed/"
    );

    return (
      <>
        <Box className={clsx(styles.movieInfoHeader, { [styles.hot]: hot })}>
          <Container maxWidth="md" className={styles.movieInfoHeaderWrap}>
            <Box>
              <Box className={styles.movieInfoHeaderMain}>
                <Box className={styles.movieInfoImage}>
                  <img src={hinhAnh} alt={tenPhim} />
                  <PlayCircleOutlineIcon onClick={handleOpenModal} />
                </Box>
                <Box className={styles.movieInfoHeaderTitle}>
                  <h3>{tenPhim}</h3>
                  <p>120 phút</p>
                  <Link
                    to="movieInfoFooter"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                    onClick={() => setTabValue(0)}
                  >
                    Mua vé
                  </Link>
                </Box>
              </Box>
              <Box className={styles.movieInfoHeaderRating}>
                <BasicProgress initialValue={danhGia >= 10 ? 10 : danhGia} />
                <BasicRating
                  initialRate={danhGia >= 10 ? 10 : danhGia}
                  style={{ marginTop: 16 }}
                />
              </Box>
            </Box>
          </Container>
          <Box
            className={styles.movieInfoHeaderLayer}
            sx={{ backgroundImage: `url(${hinhAnh})` }}
          ></Box>
        </Box>
        <BasisModal
          ref={modalRef}
          costumeStyle={{ width: "70vw", height: "70vh" }}
        >
          {trailer.startsWith("https://") ? (
            <iframe
              width="100%"
              height="100%"
              src={trailer}
              title={tenPhim}
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <Loading />
          )}
        </BasisModal>
      </>
    );
  };

  function renderTabPanel2() {
    if (!selectedMovieInfo) return <Loading />;

    const { ngayKhoiChieu, moTa } = selectedMovieInfo;
    const { director, actor, category, format, nation } = {
      director: "Adam Wingard",
      actor: "Kyle Chandler, Rebecca Hall, Eiza González, Millie Bobby Brown",
      category: "Hành động, giả tưởng, ly kỳ, thần thoại",
      format: "2D/Digital",
      nation: "Mỹ",
    };

    return (
      <Box
        className={styles.tabPanelMovieInfo}
        padding={5}
        sx={{
          border: "1px solid var(--border-color-light)",
          backgroundColor: "var(--bg-color)",
          borderRadius: 8,
          marginBlock: "4rem",
        }}
      >
        <Box>
          <Box>
            <p>Ngày công chiếu: </p>
            <p>{dateTime(ngayKhoiChieu).getDateMonth()}</p>
          </Box>
          <Box>
            <p>Đạo diễn: </p>
            <p>{director}</p>
          </Box>
          <Box>
            <p>Diễn viên: </p>
            <p>{actor}</p>
          </Box>
          <Box>
            <p>Thể loại: </p>
            <p>{category}</p>
          </Box>
          <Box>
            <p>Định dạng: </p>
            <p>{format}</p>
          </Box>
          <Box>
            <p>Quốc giá: </p>
            <p>{nation}</p>
          </Box>
        </Box>
        <Box>
          <p>Nội dung: </p>
          <p>{moTa}</p>
        </Box>
      </Box>
    );
  }

  function renderTabPanel1() {
    if (!movieSchedule) return <Loading />;

    const cinemasBrandData = [...movieSchedule.heThongRapChieu];

    if (lodashIsEmpty(cinemasBrandData))
      return (
        <Box
          sx={{ fontSize: 16, color: "var(--font-color)", height: 400 }}
          padding={5}
        >
          Phim tạm thời chưa có lịch chiếu, vui lòng chờ!
        </Box>
      );

    const renderCinemasBrandTab = () => {
      if (!cinemasBrandData) return <Loading />;
      return cinemasBrandData.map((cinemaBrand, index) => (
        <Tab
          className={clsx(styles.cinemasBrandTabItem, {
            [styles.cinemasBrandTabItemActive]: cinemasBrandValue === index,
          })}
          key={cinemaBrand.maHeThongRap}
          label={<img src={cinemaBrand.logo} alt={cinemaBrand.tenHeThongRap} />}
        />
      ));
    };

    return (
      <Box className={styles.cinemasTabContainer}>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            height: 400,
          }}
          className={styles.cinemasWrapTab + " cinemasWrapTab"}
        >
          {/* CinemasBrandList Tab */}
          <BasicVerticalTab
            value={cinemasBrandValue}
            setValue={cBSetCinemasBrandValue}
            className={styles.cinemasBrandTab}
          >
            {renderCinemasBrandTab()}
          </BasicVerticalTab>
          <CinemasAccordion
            cinemasData={cinemasBrandData[cinemasBrandValue].cumRapChieu}
            obShow="dates"
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box className={styles.movieInfo} marginBottom={5}>
      {renderMovieInfoLgDesktop()}

      <Box className={styles.movieInfoFooter} id="movieInfoFooter">
        <Container maxWidth="md">
          <CenteredTab
            tabsList={tabsList}
            tabPanelsList={tabPanelsList}
            value={tabValue}
            handleChangeValue={cbHandleChangeTabsList}
          />
        </Container>
      </Box>
    </Box>
  );
}

export default Details;

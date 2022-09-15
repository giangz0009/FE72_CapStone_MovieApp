import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BasicVerticalTab from "../BasicVerticalTab";
import Tab from "@mui/material/Tab";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";

import clsx from "clsx";
import lodashIsEmpty from "lodash.isempty";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

import styles from "./styles.module.scss";
import "./globalStyle.scss";

import { fetchSetCinemasBrandListAction } from "features/booking/action";
import Loading from "common/components/Loading";
import instance from "app/instance";
import { useCallback } from "react";
import { movieId } from "app/constants";
import dateTime from "common/utils/dateJs";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ px: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function CinemasTab() {
  // CinemasBrandTab
  const [cinemasBrandValue, setCinemasBrandValue] = useState(0);
  const cinemasBrandData = useSelector(
    (state) => state.booking.cinemasBrandList
  );
  //   CinemasTab
  const [cinemasValue, setCinemasValue] = useState(0);
  const [cinemasData, setCinemasData] = useState([]);
  // MovieSchedule
  const [movieScheduleData, setMovieScheduleData] = useState([]);

  //   useDispatch
  const dispatch = useDispatch();
  // useEffect
  // Dispatch cinemasBrandList
  useEffect(() => {
    dispatch(fetchSetCinemasBrandListAction);
  }, []);

  // handle onchange cinemasBrandValue & cinemasBrandData
  useEffect(() => {
    if (lodashIsEmpty(cinemasBrandData)) return;
    setCinemasValue(0);

    (async () => {
      const selectedCinemaBrand = cinemasBrandData[cinemasBrandValue];
      const selectedCinemaBrandId = selectedCinemaBrand.maHeThongRap;
      const res = await fetchCinemas(selectedCinemaBrandId);

      setCinemasData(res[0].lstCumRap);
    })();
  }, [cinemasBrandData, cinemasBrandValue]);

  // Handle onchange cinemasValue & cinemasData
  useEffect(() => {
    if (lodashIsEmpty(cinemasData)) return;

    const cloneCinemasData = [...cinemasData];
    const moviesListFilterByCinema = [
      ...cloneCinemasData[cinemasValue].danhSachPhim,
    ];

    const reMapMovieScheduleByDateTime = moviesListFilterByCinema.map(
      (movie) => {
        const cloneMovie = { ...movie };
        const datesList = cloneMovie.lstLichChieuTheoPhim.map((item) =>
          item.ngayChieuGioChieu.slice(0, 10)
        );

        const filterDatesList = Array.from(new Set([...datesList]));

        const lstScheduleByDate = filterDatesList.map((item) => {
          const filterByDate = cloneMovie.lstLichChieuTheoPhim.filter(
            (schedule) => schedule.ngayChieuGioChieu.match(item)
          );

          return {
            ngayChieu: item,
            lichChieu: [...filterByDate],
          };
        });

        delete cloneMovie.lstLichChieuTheoPhim;

        return {
          ...cloneMovie,
          lstLichChieuTheoNgay: { lst: lstScheduleByDate, selectedDate: 0 },
        };
      }
    );

    setMovieScheduleData(reMapMovieScheduleByDateTime);
  }, [cinemasValue, cinemasData]);

  // useCallback
  const cBSetCinemasBrandValue = useCallback(
    (newValue) => setCinemasBrandValue(newValue),
    []
  );
  const cBSetCinemasValue = useCallback(
    (newValue) => setCinemasValue(newValue),
    []
  );

  // Fetch functions
  const fetchCinemas = async (cinemaBrandId) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyRap/LayThongTinLichChieuHeThongRap",
        method: "GET",
        params: {
          maHeThongRap: cinemaBrandId,
          maNhom: movieId,
        },
      });

      return res.data.content;
    } catch (error) {
      throw new Error(error);
    }
  };

  // Render functions
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

  const renderCinemasTab = () => {
    const renderCinemaName = (cinemaName) => {
      const splitCinemaName = cinemaName.split(" -");

      return (
        <Box className={styles.cinemasItemName}>
          <h3>{splitCinemaName[0]}</h3>
          <span> - {splitCinemaName[1]}</span>
        </Box>
      );
    };

    if (!cinemasData) return <Loading />;

    return cinemasData.map((cinema, index) => (
      <Tab
        className={clsx(styles.cinemasTabItem, {
          [styles.cinemasTabItemActive]: cinemasValue === index,
        })}
        key={cinema.maCumRap}
        label={
          <Box className={styles.cinemasItemTabWrap}>
            <img src={cinema.hinhAnh} alt={cinema.tenCumRap} />
            <Box className={styles.cinemasItemInfo}>
              {renderCinemaName(cinema.tenCumRap)}
              <Typography className={styles.cinemasItemAddress}>
                {cinema.diaChi}
              </Typography>
            </Box>
          </Box>
        }
      />
    ));
  };

  // other functions

  const handleChangeSelectMovieScheduleDate = (event, index) => {
    setMovieScheduleData((preState) => {
      preState[index].lstLichChieuTheoNgay.selectedDate = event.target.value;

      return [...preState];
    });
  };

  const renderMovieSchedulesTab = () => {
    if (lodashIsEmpty(movieScheduleData)) return <Loading />;

    return movieScheduleData.map((movieSchedule, index) => {
      return (
        <TabPanel
          className={clsx(styles.movieScheduleItem, {
            [styles.movieScheduleItemHot]: movieSchedule.hot,
          })}
          value={index}
          index={index}
          key={index}
        >
          <Box className={styles.movieScheduleInfo}>
            <img src={movieSchedule.hinhAnh} alt={movieSchedule.tenPhim} />
            <Box>
              <h3>{movieSchedule.tenPhim}</h3>
              <span>120 phút</span>
            </Box>
          </Box>
          <Box className={styles.movieScheduleDate}>
            <FormControl fullWidth className="movieScheduleDateSelectForm">
              <Select
                id="movieScheduleSelect"
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                value={movieSchedule.lstLichChieuTheoNgay.selectedDate}
                onChange={(event) =>
                  handleChangeSelectMovieScheduleDate(event, index)
                }
              >
                {movieSchedule.lstLichChieuTheoNgay.lst.map((lst, index) => (
                  <MenuItem
                    className="movieScheduleDateMenuItem"
                    key={lst.ngayChieu}
                    value={index}
                  >
                    {dateTime(lst.ngayChieu).getDayOfWeek()} ,
                    {dateTime(lst.ngayChieu).getDateMonth()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box className={styles.movieScheduleShowTime}>
              {movieSchedule.lstLichChieuTheoNgay.lst[
                movieSchedule.lstLichChieuTheoNgay.selectedDate
              ].lichChieu.map((time) => (
                <Button
                  className={styles.movieScheduleShowTimeBtn}
                  key={time.maLichChieu}
                  variant="outlined"
                >
                  {dateTime(time.ngayChieuGioChieu).getDateTime()}
                  <span> ~ {dateTime(time.ngayChieuGioChieu).addHours(2)}</span>
                </Button>
              ))}
            </Box>
          </Box>
        </TabPanel>
      );
    });
  };

  return (
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
      {/* Cinemas Tab */}
      <BasicVerticalTab
        value={cinemasValue}
        setValue={cBSetCinemasValue}
        className={styles.cinemasTab}
      >
        {renderCinemasTab()}
      </BasicVerticalTab>
      {/* MovieSchedules Tab */}
      <Box className={styles.movieSchedules}>{renderMovieSchedulesTab()}</Box>
    </Box>
  );
}

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { memo } from "react";

import lodashIsEmpty from "lodash.isempty";

import styles from "./styles.module.scss";
import "./globalStyle.scss";
import { useState } from "react";
import Loading from "common/components/Loading";
import dateTime from "common/utils/dateJs";
import { useEffect } from "react";

function CinemasAccordion({ cinemasData = [] }) {
  const [expandedMovieSchedules, setExpandedMovieSchedules] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [movieScheduleData, setMovieScheduleData] = useState([]);
  const [movieCinemaValue, setMovieCinemaValue] = useState(0);

  useEffect(() => {
    if (lodashIsEmpty(cinemasData)) return;

    setMovieScheduleData([]);

    const movieSchedulesDateRemap = remapMovieScheduleDate(
      cinemasData,
      movieCinemaValue
    );

    setMovieScheduleData(movieSchedulesDateRemap);
  }, [movieCinemaValue, cinemasData]);

  const renderCinemasAccordion = () => {
    const renderCinemaName = (cinemaName) => {
      const splitCinemaName = cinemaName.split(" -");

      return (
        <Box className={styles.cinemasItemName}>
          <h3>{splitCinemaName[0]}</h3>
          <span> - {splitCinemaName[1]}</span>
        </Box>
      );
    };

    if (lodashIsEmpty(cinemasData)) return <Loading />;

    return cinemasData.map((cinema, index) => (
      <Accordion
        expanded={expanded === cinema.maCumRap}
        onChange={handleChange(cinema.maCumRap, index)}
        key={index}
        className={styles.cinemasItem + " cinemasItem"}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${index + 1}a-content`}
          id={`panel${index + 1}a-header`}
        >
          <Box className={styles.cinemasItemWrap}>
            <img src={cinema.hinhAnh} alt={cinema.tenCumRap} />
            <Box className={styles.cinemasItemInfo}>
              {renderCinemaName(cinema.tenCumRap)}
              <p>{cinema.diaChi}</p>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails className={styles.movieSchedules}>
          <Box className={styles.movieSchedulesWrap}>
            {lodashIsEmpty(movieScheduleData) ? (
              <Loading />
            ) : (
              renderMovieSchedules()
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
    ));
  };

  const renderMovieSchedules = () => {
    if (lodashIsEmpty(movieScheduleData)) return <Loading />;

    return movieScheduleData.map((movie, index) => (
      <Accordion
        key={index}
        className={styles.movieScheduleItem}
        expanded={expandedMovieSchedules === movie.maPhim}
        onChange={handleChangeExpendMovieSchedule(movie.maPhim, index)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${index + 1}a-content`}
          id={`panel${index + 1}a-header`}
        >
          <Box key={index} className={styles.movieScheduleItemWrap}>
            <img src={movie.hinhAnh} alt={movie.tenPhim} />
            <Box className={styles.movieScheduleInfo}>
              <h3>{movie.tenPhim}</h3>
              <p>120 phút</p>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box className={styles.movieScheduleDate}>
            <FormControl fullWidth className="movieScheduleDateSelectForm">
              <Select
                id="movieScheduleSelect"
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                value={movie.lstLichChieuTheoNgay.selectedDate}
                onChange={(event) =>
                  handleChangeSelectMovieScheduleDate(event, index)
                }
              >
                {movie.lstLichChieuTheoNgay.lst.map((lst, index) => (
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
              {movie.lstLichChieuTheoNgay.lst[
                movie.lstLichChieuTheoNgay.selectedDate
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
        </AccordionDetails>
      </Accordion>
    ));
  };

  const handleChangeExpendMovieSchedule = (panel) => (event, isExpanded) => {
    setExpandedMovieSchedules(isExpanded ? panel : false);
  };

  const handleChangeSelectMovieScheduleDate = (event, index) => {
    setMovieScheduleData((preState) => {
      preState[index].lstLichChieuTheoNgay.selectedDate = event.target.value;

      return [...preState];
    });
  };

  const handleChange = (panel, index) => (event, isExpanded) => {
    setMovieCinemaValue(index);

    setExpanded(isExpanded ? panel : false);
  };

  const remapMovieScheduleDate = (data, index) => {
    const cloneCinemasData = [...data];
    const moviesListFilterByCinema = [...cloneCinemasData[index].danhSachPhim];

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

    return reMapMovieScheduleByDateTime;
  };

  return (
    <div className={styles.cinemasAccordion} style={{ flex: 1 }}>
      {renderCinemasAccordion()}
    </div>
  );
}

export default memo(CinemasAccordion);

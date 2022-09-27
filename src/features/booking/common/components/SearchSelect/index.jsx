import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import lodashIsEmpty from "lodash.isempty";

import "./globalStyle.scss";
import style from "./style.module.scss";
import instance from "app/instance";
import dateTime from "common/utils/dateJs";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

function SearchSelect() {
  // Is Open state
  const [open, setOpen] = React.useState(false);
  // time select
  const [showTimes, setShowTimes] = useState("");
  // day Select
  const [showDays, setShowDays] = useState("");
  const [showDaysData, setShowDaysData] = useState([]);
  const [dateList, setDateList] = useState([]);
  // theater Select
  const [theater, setTheater] = useState("");
  const [theatersData, setTheatersData] = useState([]);
  // Input
  const [movieSchedule, setMovieSchedule] = useState({});
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const [openTheater, setOpenTheater] = useState(false);
  const [openDates, setOpenDates] = useState(false);
  const [openTimes, setOpenTimes] = useState(false);

  // useSelector
  const topFilms = useSelector((state) => state.booking.moviesList);
  // useNavigate
  const navigate = useNavigate();

  // useEffect
  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (() => {
      if (active && topFilms) {
        setOptions([...topFilms]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, topFilms]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  // Handle step by step for search
  useEffect(() => {
    if (!movieSchedule) return;

    const res = movieSchedule.heThongRapChieu?.reduce((currVal, nextVal) => {
      const result = nextVal.cumRapChieu?.map((item) => ({
        ...item,
      }));
      return [...currVal, ...result];
    }, []);

    setTheatersData(res);
    setTheater("");
  }, [movieSchedule]);

  useEffect(() => {
    setShowDays("");

    if (lodashIsEmpty(theater)) return;

    const res = theatersData.find((item) => item.maCumRap === theater);

    const cloneRes = [...res.lichChieuPhim];

    const reDate = cloneRes.map((item) => item.ngayChieuGioChieu.slice(0, 10));

    setDateList(new Set([...reDate]));

    setShowDaysData(res.lichChieuPhim);
  }, [theater]);

  useEffect(() => {
    setShowTimes("");
  }, [showDays]);

  // functions
  const fectchGetMovieSchedule = async (movieId) => {
    setTheatersData([{ tenCumRap: "Đang tải, vui lòng chờ...", maCumRap: "" }]);
    setOpenTheater(true);
    try {
      const res = await instance.request({
        url: "/api/QuanLyRap/LayThongTinLichChieuPhim",
        method: "GET",
        params: {
          MaPhim: movieId,
        },
      });
      return res.data.content;
    } catch (error) {
      setTheatersData([]);
      throw new Error(error);
    }
  };

  const renderTimes = () => {
    const timesFilter = showDaysData.filter((time) =>
      time.ngayChieuGioChieu.match(showDays)
    );

    return timesFilter.map((time) => (
      <MenuItem key={time.maLichChieu} value={time.maLichChieu}>
        {dateTime(time.ngayChieuGioChieu).getDateTime()}
      </MenuItem>
    ));
  };

  // HandleEvents
  const handleChangeShowTime = (event) => {
    setShowTimes(event.target.value);
    setOpenTimes(false);
  };

  const handleChangeTheater = (event) => {
    setTheater(event.target.value);
    setOpenTheater(false);
    setOpenDates(true);
  };

  const handleOnChangeDays = (event) => {
    setShowDays(event.target.value);
    setOpenDates(false);
    setOpenTimes(true);
  };

  const handleOnChangeSearchInput = async (newInputValue) => {
    const res = await fectchGetMovieSchedule(newInputValue.maPhim);
    setMovieSchedule(res);
  };

  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        px: 3,
        backgroundColor: "var(--bg-color)",
        borderRadius: 2,
        boxShadow: "0 0 10px var(--box-shadow)",
        maxWidth: 940,
        margin: "0 auto",
        position: "absolute",
        left: "50%",
        bottom: 0,
        transform: "translate(-50%,50%)",
        zIndex: 1,
      }}
      className={style.searchList}
    >
      <Grid container spacing={2}>
        <Grid className={style.formWrap} xs={4}>
          <FormControl variant="standard" className={style.formControl}>
            <Autocomplete
              id="asynchronous-demo"
              sx={{ mt: 1 }}
              onChange={(event, newInputValue) =>
                handleOnChangeSearchInput(newInputValue)
              }
              open={open}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              isOptionEqualToValue={(option, value) =>
                option.maPhim === value.maPhim
              }
              getOptionLabel={(option) => option.tenPhim}
              options={options}
              loading={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tìm phim..."
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
              renderTags={() => null}
              noOptionsText="No labels"
              renderOption={(props, option) => (
                <li {...props} key={option.maPhim}>
                  <HtmlTooltip
                    className={style.searchToolTipWrap}
                    title={
                      <div
                        className={style.searchToolTip}
                        style={{ backgroundImage: `url('${option.hinhAnh}')` }}
                      >
                        <Button
                          className={style.viewDetailBtn}
                          variant="contained"
                          title="Chi tiết"
                          size="large"
                          onClick={() => {
                            navigate(`/details/${option.maPhim}`);
                          }}
                        >
                          Chi tiết
                        </Button>
                      </div>
                    }
                    placement="right"
                  >
                    <span>{option.tenPhim}</span>
                  </HtmlTooltip>
                </li>
              )}
            />
          </FormControl>
        </Grid>
        <Grid className={style.formWrap} xs={2}>
          <FormControl variant="standard" className={style.formControl}>
            <InputLabel id="select-theater">Chọn rạp...</InputLabel>
            <Select
              labelId="select-theater"
              id="demo-simple-select"
              value={theater}
              label="Chọn rạp..."
              onChange={handleChangeTheater}
              open={openTheater}
              onOpen={() => {
                setOpenTheater(true);
              }}
              onClose={() => {
                setOpenTheater(false);
              }}
            >
              {lodashIsEmpty(theatersData) ? (
                <MenuItem value="">Không có rạp...</MenuItem>
              ) : (
                theatersData.map((theater) => (
                  <MenuItem key={theater.maCumRap} value={theater.maCumRap}>
                    {theater.tenCumRap}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid className={style.formWrap} xs={2}>
          <FormControl variant="standard" className={style.formControl}>
            <InputLabel id="select-days">Chọn ngày...</InputLabel>
            <Select
              labelId="select-days"
              id="demo-simple-select"
              value={showDays}
              label="Chọn ngày..."
              onChange={handleOnChangeDays}
              open={openDates}
              onOpen={() => {
                setOpenDates(true);
              }}
              onClose={() => {
                setOpenDates(false);
              }}
            >
              {lodashIsEmpty(theater) ? (
                <MenuItem value="">Vui lòng chọn phim, rạp</MenuItem>
              ) : (
                Array.from(dateList).map((day, index) => (
                  <MenuItem
                    key={index}
                    value={day}
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <p style={{ fontSize: "1.2rem", marginBlock: ".2rem" }}>
                      {dateTime(day).getDayOfWeek()}
                    </p>
                    <p style={{ fontSize: "1.2rem", marginBlock: ".2rem" }}>
                      {dateTime(day).getDateMonth()}
                    </p>
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid className={style.formWrap} xs={2}>
          <FormControl variant="standard" className={style.formControl}>
            <InputLabel id="select-times">Chọn giờ...</InputLabel>
            <Select
              labelId="select-times"
              id="demo-simple-select"
              value={showTimes}
              label="Chọn giờ..."
              onChange={handleChangeShowTime}
              open={openTimes}
              onOpen={() => {
                setOpenTimes(true);
              }}
              onClose={() => {
                setOpenTimes(false);
              }}
            >
              {lodashIsEmpty(showDays) ? (
                <MenuItem value="">
                  Vui lòng chọn phim, rạp, ngày chiếu
                </MenuItem>
              ) : (
                renderTimes()
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid className={style.formWrap} xs={2}>
          <FormControl
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <button
              variant="contained"
              className={clsx(style.submitBtn, [
                { [style.active]: !lodashIsEmpty(showTimes) },
              ])}
              disabled={lodashIsEmpty(showTimes)}
              onClick={() => navigate(`/booking/${showTimes}`)}
            >
              Đặt vé
            </button>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SearchSelect;

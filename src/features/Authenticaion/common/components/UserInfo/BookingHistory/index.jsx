import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { memo } from "react";
import Loading from "common/components/Loading";
import dateTime from "common/utils/dateJs";
import lodashIsEmpty from "lodash.isempty";

import "./globalStyle.scss";

function createData(
  STT,
  tenPhim,
  thoiLuongPhim,
  ngayDat,
  tenRap,
  maVe,
  tenGhe,
  giaVe,
  totalPrice
) {
  return {
    STT,
    tenPhim,
    thoiLuongPhim,
    ngayDat,
    tenRap,
    maVe,
    tenGhe,
    giaVe,
    totalPrice,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "STT",
    numeric: true,
    disablePadding: false,
    label: "STT",
  },
  {
    id: "tenPhim",
    numeric: false,
    disablePadding: false,
    label: "Tên Phim",
  },
  {
    id: "thoiLuongPhim",
    numeric: true,
    disablePadding: false,
    label: "Thời Lượng Phim",
  },
  {
    id: "ngayDat",
    numeric: false,
    disablePadding: false,
    label: "Ngày Đặt",
  },
  {
    id: "tenRap",
    numeric: false,
    disablePadding: false,
    label: "Tên Rạp",
  },
  {
    id: "maVe",
    numeric: true,
    disablePadding: false,
    label: "Mã Vé",
  },
  {
    id: "tenGhe",
    numeric: false,
    disablePadding: false,
    label: "Tên Ghế",
  },
  {
    id: "giaVe",
    numeric: true,
    disablePadding: false,
    label: "Giá Vé (Vnđ)",
  },
  {
    id: "totalPrice",
    numeric: true,
    disablePadding: false,
    label: "Tổng Tiền (Vnđ)",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, className } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={className}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function BookingHistory({ userInfo }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);

  //   Basic Variable

  const rows = (() => {
    if (!userInfo) return [];

    const userBookingHistory = userInfo.thongTinDatVe;

    return userBookingHistory.map((history, index) => {
      const seatsList = history.danhSachGhe;
      const tenRap = `${seatsList[0].tenHeThongRap}, ${seatsList[0].tenRap}`;
      const seatsName = seatsList.map((seat) => seat.tenGhe).join(", ");
      const { tenPhim, thoiLuongPhim, ngayDat, maVe, giaVe } = history;
      return createData(
        index + 1,
        tenPhim,
        thoiLuongPhim,
        `${dateTime(ngayDat).getDateMonth()}, ${dateTime(
          ngayDat
        ).getDateTime()}`,
        tenRap,
        maVe,
        seatsName,
        giaVe,
        giaVe * seatsList.length
      );
    });
  })();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // render function

  const renderRows = () => {
    if (!userInfo) return <Loading />;
    if (lodashIsEmpty(rows))
      return (
        <TableRow className="tableBodyRow" hover>
          <TableCell colSpan={headCells.length}>
            *Bạn không có lịch sử đặt vé!
          </TableCell>
        </TableRow>
      );

    return stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
      const isItemSelected = isSelected(row.STT);
      const labelId = `enhanced-table-checkbox-${index}`;
      return (
        <TableRow
          className="tableBodyRow"
          hover
          onClick={(event) => handleClick(event, row.STT)}
          tabIndex={-1}
          key={index}
        >
          <TableCell component="th" id={labelId} scope="row" padding="none">
            {row.STT}
          </TableCell>
          <TableCell align="right">{row.tenPhim}</TableCell>
          <TableCell align="right">{row.thoiLuongPhim}</TableCell>
          <TableCell align="right">{row.ngayDat}</TableCell>
          <TableCell align="right">{row.tenRap}</TableCell>
          <TableCell align="right">{row.maVe}</TableCell>
          <TableCell align="right">{row.tenGhe}</TableCell>
          <TableCell align="right">{row.giaVe}</TableCell>
          <TableCell align="right">{row.totalPrice}</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Box sx={{ width: "100%" }} className="userBookingHistoryWrap">
      <Paper sx={{ width: "100%" }} className="userBookingHistory">
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer className="table">
          <Table
            className="tableMain"
            stickyHeader
            sx={{ minWidth: 750 }}
            aria-label="sticky table"
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              className="tableHeader"
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody className="tableBody">
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {renderRows()}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default memo(BookingHistory);

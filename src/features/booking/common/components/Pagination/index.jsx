import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

import "./globalStyle.scss";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { bookingActionsType } from "features/booking/action";

function PagePagination({ pagination }) {
  // Location
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};
  // useDispatch
  const dispatch = useDispatch();

  const handleOnclickPaginationItem = (event, page) => {
    navigate("/", { state: { ...state, page: page } });
    dispatch(bookingActionsType.setCurrentPage(page));
  };

  return (
    <Pagination
      page={pagination.currentPage}
      count={pagination.totalPages}
      onChange={handleOnclickPaginationItem}
      renderItem={(item) => <PaginationItem {...item} />}
    />
  );
}

export default memo(PagePagination);

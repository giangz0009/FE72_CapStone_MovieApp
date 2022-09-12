import * as React from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

import "./globalStyle.scss";

export default function PagePagination({ pagination }) {
  return (
    <Pagination
      page={pagination.currentPage}
      count={pagination.totalPages}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`/${item.page === 1 ? "" : `?page=${item.page}`}`}
          {...item}
        />
      )}
    />
  );
}

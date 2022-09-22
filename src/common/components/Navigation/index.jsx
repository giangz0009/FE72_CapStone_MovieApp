import React from "react";

import { Box } from "@mui/material";

import { Link } from "react-scroll";

import "app/GlobalCssSlider.scss";
import styles from "./style.module.scss";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./globalStyle.scss";

function Navigation({ pages }) {
  const navigate = useNavigate();
  const selectorIsActive = useSelector((state) => state.booking.isActive);
  const selectorCurrentPage = useSelector((state) => state.booking.currentPage);

  const handleOnclick = (e) => {
    navigate("/", {
      state: { isActive: selectorIsActive, page: selectorCurrentPage },
    });
  };

  return (
    <Box className={styles.navBar}>
      {pages.map((page, index) => (
        <Link
          // activeClass="navLinkActive"
          key={index}
          className={clsx(styles.navLink)}
          to={page.idHomeSection}
          spy={true}
          smooth={true}
          offset={-30}
          duration={500}
          onClick={handleOnclick}
          isDynamic={true}
        >
          {page.label}
        </Link>
      ))}
    </Box>
  );
}

export default Navigation;

import React from "react";

import { Box } from "@mui/material";

import { Link } from "react-scroll";

import "app/GlobalCssSlider.scss";
import styles from "./style.module.scss";
import clsx from "clsx";

function Navigation({ pages }) {
  return (
    <Box className={styles.navBar}>
      {pages.map((page, index) => (
        <Link
          activeClass={styles.navLinkActive}
          key={index}
          className={clsx(styles.navLink)}
          to={page.idHomeSection}
          spy={true}
          smooth={true}
          offset={-30}
          duration={500}
        >
          {page.label}
        </Link>
      ))}
    </Box>
  );
}

export default Navigation;

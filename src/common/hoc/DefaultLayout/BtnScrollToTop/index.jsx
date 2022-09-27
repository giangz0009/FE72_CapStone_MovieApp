import { Button } from "@mui/material";
import clsx from "clsx";
import React, { useEffect } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { animateScroll as scroll } from "react-scroll";

import "./globalStyle.scss";
import { useState } from "react";

function BtnScrollToTop() {
  const [isActiveScrollBtn, setIsActiveScrollBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleOnWindowScroll);
  });

  const handleOnWindowScroll = () => {
    const scrollY = window.pageYOffset;
    if (scrollY >= 600) setIsActiveScrollBtn(true);
    else setIsActiveScrollBtn(false);
  };

  const handleOnclickScrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <Button
      className={clsx("btnScrollToTop", { active: isActiveScrollBtn })}
      onClick={handleOnclickScrollToTop}
    >
      <KeyboardArrowUpIcon fontSize="large" />
    </Button>
  );
}

export default BtnScrollToTop;

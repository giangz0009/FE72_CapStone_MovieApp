import Footer from "common/components/Footer";
import Header from "common/components/Header";
import { fetchGetProfileAction } from "features/Authenticaion/action";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { animateScroll as scroll } from "react-scroll";
import BtnScrollToTop from "./BtnScrollToTop";

function DefaultLayout({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetProfileAction);
    scroll.scrollToTop();
  });

  return (
    <>
      <Header />
      {children}
      <BtnScrollToTop />
      <Footer />
    </>
  );
}

export default DefaultLayout;
